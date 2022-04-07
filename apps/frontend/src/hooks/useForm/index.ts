import React from "react";
import { useForm } from "react-hook-form";
import { sdk } from "../../libs/graphql_request";
import { useLocale } from "../../libs/next_router";
import { getImageUrl } from "../../utils/getImageUrl";
import { getToken } from "../../utils/getToken";
import { isApiError } from "../../utils/handleApiError";
import type { MyFormType, UseMyFormType } from "./types";
import type { SubmitHandler } from "react-hook-form";

export const useMyForm: UseMyFormType = ({ isSignup }) => {
  const [errorMessage, setErrorMessage] = React.useState("");
  const emailAlreadyExistsErrorMessage = useLocale(
    "The email address you entered is already in use",
    "入力されたメールアドレスは既に使用されています"
  );
  const emailErrorMessage = useLocale(
    "Invalid Email or Password",
    "メールアドレスまたはパスワードが違います"
  );
  const unexpectedErrorMessage = useLocale(
    "An unexpected error has occurred. Please wait a few minutes and try again",
    "予期せぬエラーが発生しました。お時間をおいて再度お試しください"
  );
  const imageBlankErrorMessage = useLocale(
    "Please select image",
    "画像を選択してください"
  );
  const { setError, ...rest } = useForm<MyFormType>({ mode: "onSubmit" });

  const submitHandler: SubmitHandler<MyFormType> = async (data) => {
    setErrorMessage("");
    const { file, ...signUpProps } = data;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { name, ...loginProps } = signUpProps;
    let jwtToken = "";
    try {
      if (isSignup) {
        if (file instanceof Blob) {
          const imageUrl = await getImageUrl({ file });
          jwtToken = await sdk
            .signup({ signupData: { imageUrl, ...signUpProps } })
            .then((response) => response.signup.accessToken);
        } else {
          throw new Error("image is not selected");
        }
      } else {
        jwtToken = await sdk
          .login({ loginData: loginProps })
          .then((response) => response.login.accessToken);
      }
      await getToken(jwtToken);
    } catch (error) {
      if (isApiError(error)) {
        const { status } = error.response.errors[0].extensions.exception;
        if (status === 401) {
          setErrorMessage(emailErrorMessage);
        } else if (status === 409) {
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
    }
  };

  return {
    ...rest,
    errorMessage,
    setError,
    submitHandler
  };
};
