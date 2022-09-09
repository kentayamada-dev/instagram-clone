import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { fetcher } from "../../lib/graphql_request";
import { useLocale } from "../../lib/next_router";
import { getImageUrl } from "../../utils/getImageUrl";
import { LOGIN_MUTATION, SIGNUP_MUTATION } from "./schema";
import type { LoginMutation, LoginMutationVariables, SignupMutation, SignupMutationVariables } from "../../generated";
import type { MyFormType, UseMyFormType } from "./type";
import type { SubmitHandler } from "react-hook-form";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGraphQLErrors = (error: any): error is { response: any } => {
  if (Boolean(error?.response) && "status" in error.response.errors[0].extensions.exception) {
    return true;
  }

  return false;
};

export const useMyForm: UseMyFormType = ({ isSignup }) => {
  const emailAlreadyExistsErrorMessage = useLocale(
    "Another account is using the same email.",
    "同じメールアドレスが他のアカウントで利用されています。"
  );
  const emailErrorMessage = useLocale("Invalid Email or Password.", "メールアドレスまたはパスワードが違います。");
  const userIdErrorMessage = useLocale(
    "This username isn't available. Please try another.",
    "このユーザーネームは使用できません。別のユーザーネームを選択してください。"
  );
  const unexpectedErrorMessage = useLocale(
    "An unexpected error has occurred. Please wait a few minutes and try again.",
    "予期せぬエラーが発生しました。お時間をおいて再度お試しください。"
  );
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const imageBlankErrorMessage = useLocale("Please select a photo.", "写真を選択してください。");
  const { setError, ...rest } = useForm<MyFormType>({ mode: "onSubmit" });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleError = (error: any): void => {
    if (isGraphQLErrors(error)) {
      const returnedErrorMessage: string = error.response.errors[0].message;
      if (returnedErrorMessage === "User ID Is Taken") {
        setErrorMessage(userIdErrorMessage);
      } else if (returnedErrorMessage === "Email Is Taken") {
        setErrorMessage(emailAlreadyExistsErrorMessage);
      } else if (returnedErrorMessage === "Incorrect email or password") {
        setErrorMessage(emailErrorMessage);
      } else {
        setErrorMessage(unexpectedErrorMessage);
      }
    } else {
      setError("file", {
        message: imageBlankErrorMessage,
        type: "custom"
      });
    }
  };
  const submitHandler: SubmitHandler<MyFormType> = async (data) => {
    setErrorMessage("");
    const { file, ...signUpProps } = data;
    const { name, ...loginProps } = signUpProps;
    try {
      if (isSignup) {
        if (file instanceof Blob) {
          const imageUrl = await getImageUrl({ file });
          await fetcher<SignupMutation, SignupMutationVariables>(SIGNUP_MUTATION, {
            signupInput: {
              ...signUpProps,
              imageUrl
            }
          });
          router.reload();
        } else {
          throw new Error("image is not selected");
        }
      } else {
        await fetcher<LoginMutation, LoginMutationVariables>(LOGIN_MUTATION, { loginInput: loginProps });
        router.reload();
      }
    } catch (error) {
      handleError(error);
    }
  };

  return {
    ...rest,
    errorMessage,
    setError,
    submitHandler
  };
};
