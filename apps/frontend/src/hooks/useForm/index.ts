import React from "react";
import { useForm } from "react-hook-form";
import { useLocale } from "../../libs/next_router";
import {
  useLoginMutation,
  useSignupMutation
} from "../../types/generated/types";
import { getImageUrl } from "../../utils/getImageUrl";
import type { MyFormType, UseMyFormType } from "./types";
import type { ApolloError } from "@apollo/client";
import type { SubmitHandler } from "react-hook-form";

export const useMyForm: UseMyFormType = ({ isSignup }) => {
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
  const [login] = useLoginMutation();
  const [signup] = useSignupMutation();
  const [errorMessage, setErrorMessage] = React.useState("");
  const imageBlankErrorMessage = useLocale(
    "Please select image",
    "画像を選択してください"
  );
  const { setError, ...rest } = useForm<MyFormType>({ mode: "onSubmit" });
  const handleError = (error: ApolloError): void => {
    const errorStatus: number | undefined =
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      error.graphQLErrors[0]?.extensions["exception"].status;
    if (errorStatus === 401) {
      setErrorMessage(emailErrorMessage);
    } else if (errorStatus === 409) {
      setErrorMessage(emailAlreadyExistsErrorMessage);
    } else {
      setErrorMessage(unexpectedErrorMessage);
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
          await signup({
            onError: handleError,
            variables: {
              signupArgs: {
                ...signUpProps,
                imageUrl
              }
            }
          });
        } else {
          throw new Error("image is not selected");
        }
      } else {
        await login({
          onError: handleError,
          variables: {
            loginArgs: loginProps
          }
        });
      }
    } catch (error) {
      setError("file", {
        message: imageBlankErrorMessage,
        type: "custom"
      });
    }
  };

  return {
    ...rest,
    errorMessage,
    setError,
    submitHandler
  };
};
