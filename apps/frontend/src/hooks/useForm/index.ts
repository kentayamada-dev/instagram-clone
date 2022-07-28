import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import { fetcher } from "../../libs/graphql_request";
import { useLocale } from "../../libs/next_router";
import { getImageUrl } from "../../utils/getImageUrl";
import { LOGIN_MUTATION, SIGNUP_MUTATION } from "./schema";
import type { LoginMutation, LoginMutationVariables, SignupMutation, SignupMutationVariables } from "../../generated";
import type { MyFormType, UseMyFormType } from "./type";
import type { SubmitHandler } from "react-hook-form";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGraphQLErrors = (error: any): error is { response: any } => {
  if ("status" in error.response.errors[0].extensions.exception) {
    return true;
  }

  return false;
};

export const useMyForm: UseMyFormType = ({ isSignup }) => {
  const emailAlreadyExistsErrorMessage = useLocale(
    "The email address you entered is already in use",
    "入力されたメールアドレスは既に使用されています"
  );
  const emailErrorMessage = useLocale("Invalid Email or Password", "メールアドレスまたはパスワードが違います");
  const unexpectedErrorMessage = useLocale(
    "An unexpected error has occurred. Please wait a few minutes and try again",
    "予期せぬエラーが発生しました。お時間をおいて再度お試しください"
  );
  const router = useRouter();
  const [errorMessage, setErrorMessage] = React.useState("");
  const imageBlankErrorMessage = useLocale("Please select image", "画像を選択してください");
  const { setError, ...rest } = useForm<MyFormType>({ mode: "onSubmit" });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleError = (error: any): void => {
    if (isGraphQLErrors(error)) {
      const errorStatus: number | undefined = error.response.errors[0].extensions.exception.status;
      if (errorStatus === 401) {
        setErrorMessage(emailErrorMessage);
      } else if (errorStatus === 409) {
        setErrorMessage(emailAlreadyExistsErrorMessage);
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { name, ...loginProps } = signUpProps;
    try {
      if (isSignup) {
        if (file instanceof Blob) {
          const imageUrl = await getImageUrl({ file });
          await fetcher<SignupMutation, SignupMutationVariables>(SIGNUP_MUTATION, {
            signupArgs: {
              ...signUpProps,
              imageUrl
            }
          });
          router.reload();
        } else {
          throw new Error("image is not selected");
        }
      } else {
        await fetcher<LoginMutation, LoginMutationVariables>(LOGIN_MUTATION, { loginArgs: loginProps });
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
