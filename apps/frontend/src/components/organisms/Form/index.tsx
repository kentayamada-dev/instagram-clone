import {
  Button,
  Center,
  FormControl,
  Stack,
  VStack,
  Text,
  Link,
  useColorModeValue,
  FormErrorMessage
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import axios from "axios";
import NextLink from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { constants } from "../../../constants";
import { useLocale } from "../../../libs/next_router";
import { useTypeSafeTranslation } from "../../../libs/next_translate";
import { getImageUrl } from "../../../utils/getImageUrl";
import { ImageColorMode } from "../../atoms/ImageColorMode";
import { EmailInput } from "./components/EmailInput";
import { ImageSelect } from "./components/ImageSelect";
import { NameInput } from "./components/NameInput";
import { PasswordInput } from "./components/PasswordInput";
import type { FormType, FormDtoType } from "./index.types";
import type { SubmitHandler } from "react-hook-form";

const StyledForm = styled.form`
  width: 100%;
`;

const {
  COLORS: { WHITE, EBONY, BLACK_PEARL }
} = constants;

export const Form: FormType = ({ loginHandler, signUpHandler, isSignup }) => {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    setValue,
    formState: { isSubmitting, errors }
  } = useForm<FormDtoType>({ mode: "onSubmit" });
  const [errorMessage, setErrorMessage] = React.useState("");
  const { t } = useTypeSafeTranslation("form");
  const getValueByAuthMode = <T, U>(valueT: T, valueU: U): T | U =>
    isSignup ? valueT : valueU;
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
  const onSubmit: SubmitHandler<FormDtoType> = async (data) => {
    const { file, ...signUpProps } = data;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { name, ...loginProps } = signUpProps;

    try {
      if (isSignup) {
        if (file instanceof Blob) {
          const imageUrl = await getImageUrl({ file });
          await signUpHandler({
            ...signUpProps,
            imageUrl
          });
        } else {
          setError("file", {
            message: imageBlankErrorMessage,
            type: "custom"
          });
        }
      } else {
        await loginHandler({ ...loginProps });
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          setErrorMessage(emailErrorMessage);
        } else {
          setErrorMessage(emailAlreadyExistsErrorMessage);
        }
      } else {
        setErrorMessage(unexpectedErrorMessage);
      }
    }
  };
  const bgColor = useColorModeValue(WHITE, EBONY);
  const borderColor = useColorModeValue("", BLACK_PEARL);
  const darkImg = React.useMemo(
    () => ({
      alt: "Instagram Text Dark",
      src: "/static/instagram/text_dark.svg"
    }),
    []
  );

  const lightImg = React.useMemo(
    () => ({
      alt: "Instagram Text Light",
      src: "/static/instagram/text_light.svg"
    }),
    []
  );

  return (
    <VStack minH="500px" spacing={4}>
      <Stack
        align="center"
        bgColor={{
          base: "transparent",
          sm: bgColor
        }}
        borderColor={borderColor}
        borderWidth={{
          base: "0px",
          sm: "1px"
        }}
        p="30px"
        spacing={10}
        width="350px"
      >
        <ImageColorMode
          darkImg={darkImg}
          height={51}
          lightImg={lightImg}
          width={175}
        />
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={Boolean(errorMessage)}>
            <VStack spacing={5} w="100%">
              {isSignup && (
                <>
                  <ImageSelect
                    clearErrors={clearErrors}
                    errors={errors}
                    register={register}
                    setError={setError}
                    setValue={setValue}
                  />
                  <NameInput errors={errors} register={register} />
                </>
              )}
              <EmailInput errors={errors} register={register} />
              <PasswordInput errors={errors} register={register} />
              <Button
                isLoading={isSubmitting}
                type="submit"
                variant="primary"
                w="100%"
              >
                {getValueByAuthMode(t("signUp"), t("login"))}
              </Button>
            </VStack>
            <FormErrorMessage justifyContent="center">
              {errorMessage}
            </FormErrorMessage>
          </FormControl>
        </StyledForm>
      </Stack>
      <Center
        bgColor={bgColor}
        borderColor={borderColor}
        borderWidth="1px"
        gap={2}
        h="60px"
        w="100%"
      >
        <Text fontSize="sm">
          {getValueByAuthMode(t("haveAccount"), t("noAccount"))}
        </Text>
        <NextLink href={getValueByAuthMode("/", "/signup")} passHref>
          <Link>{getValueByAuthMode(t("login"), t("signUp"))}</Link>
        </NextLink>
      </Center>
    </VStack>
  );
};
