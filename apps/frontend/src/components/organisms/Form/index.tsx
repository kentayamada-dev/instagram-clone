import {
  Button,
  Center,
  FormControl,
  Stack,
  VStack,
  Text,
  useColorModeValue,
  FormErrorMessage
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import { useTranslation } from "next-i18next";
import { constants } from "../../../constants";
import { useMyForm } from "../../../hooks/useForm";
import { ImageColorMode } from "../../atoms/ImageColorMode";
import { TextLink } from "../../atoms/TextLink";
import { EmailInput } from "./components/EmailInput";
import { ImageSelect } from "./components/ImageSelect";
import { NameInput } from "./components/NameInput";
import { PasswordInput } from "./components/PasswordInput";
import { UserIdInput } from "./components/UserIdInput";
import type { FormType } from "./index.types";

const StyledForm = styled.form`
  width: 100%;
`;

const {
  COLORS: { WHITE, EBONY, BLACK_PEARL, DODGER_BLUE }
} = constants;

export const Form: FormType = ({ isSignup }) => {
  const {
    clearErrors,
    register,
    setError,
    setValue,
    errorMessage,
    submitHandler,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useMyForm({ isSignup });
  const { t } = useTranslation("form");
  const getValueByAuthMode = <T, U>(valueT: T, valueU: U): T | U => (isSignup ? valueT : valueU);
  const bgColor = useColorModeValue(WHITE, EBONY);
  const borderColor = useColorModeValue("", BLACK_PEARL);
  const darkImg = {
    alt: "Instagram Text Dark",
    src: "/static/instagram/text_dark.svg"
  };

  const lightImg = {
    alt: "Instagram Text Light",
    src: "/static/instagram/text_light.svg"
  };

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
        <ImageColorMode darkImg={darkImg} height={51} lightImg={lightImg} width={175} />
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <StyledForm onSubmit={handleSubmit(submitHandler)}>
          <FormControl isInvalid={Boolean(errorMessage)}>
            <VStack spacing={5} w="100%">
              {isSignup ? (
                <>
                  <ImageSelect
                    clearErrors={clearErrors}
                    errors={errors}
                    register={register}
                    setError={setError}
                    setValue={setValue}
                  />
                  <NameInput errors={errors} register={register} />
                  <UserIdInput errors={errors} register={register} />
                </>
              ) : null}
              <EmailInput errors={errors} register={register} />
              <PasswordInput errors={errors} register={register} />
              <Button isLoading={isSubmitting} type="submit" variant="primary" w="100%">
                {getValueByAuthMode(t("signUp"), t("login"))}
              </Button>
            </VStack>
            <FormErrorMessage justifyContent="center">{errorMessage}</FormErrorMessage>
          </FormControl>
        </StyledForm>
      </Stack>
      <Center bgColor={bgColor} borderColor={borderColor} borderWidth="1px" gap={2} h="60px" w="100%">
        <Text fontSize="sm">{getValueByAuthMode(t("haveAccount"), t("noAccount"))}</Text>
        <TextLink
          fontWeight="semibold"
          href={getValueByAuthMode("/", "/signup")}
          text={getValueByAuthMode(t("login"), t("signUp"))}
          textColor={DODGER_BLUE}
        />
      </Center>
    </VStack>
  );
};
