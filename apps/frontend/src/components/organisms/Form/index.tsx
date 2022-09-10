import {
  Button,
  Center,
  FormControl,
  Stack,
  VStack,
  Text,
  useColorModeValue,
  FormErrorMessage,
  Grid,
  GridItem,
  Divider
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import { useTranslation } from "next-i18next";
import { AiFillLock } from "react-icons/ai";
import { constants } from "../../../constants";
import { useMyForm } from "../../../hooks/useForm";
import { ImageColorMode } from "../../atoms/ImageColorMode";
import { TextLink } from "../../atoms/TextLink";
import { EmailInput } from "./components/EmailInput";
import { ImageSelect } from "./components/ImageSelect";
import { NameInput } from "./components/NameInput";
import { PasswordInput } from "./components/PasswordInput";
import { UserIdInput } from "./components/UserIdInput";
import type { FormType, GetValueByAuthModeType } from "./index.types";
import type { ButtonProps } from "@chakra-ui/react";

const StyledForm = styled.form`
  width: 100%;
  padding-top: 30px;
`;

const {
  COLORS: { WHITE, EBONY, BLACK_PEARL, DODGER_BLUE, SUVA_GREY }
} = constants;

export const Form: FormType = ({ isSignup }) => {
  const {
    clearErrors,
    register,
    setError,
    setValue,
    errorMessage,
    loginHandler,
    signupHandler,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useMyForm();
  const { t } = useTranslation("form");
  const getValueByAuthMode: GetValueByAuthModeType = (signupValue, loginValue) => (isSignup ? signupValue : loginValue);
  const bgColor = useColorModeValue(WHITE, EBONY);
  const borderColor = useColorModeValue("", BLACK_PEARL);
  const handleAnonymousLogin: ButtonProps["onClick"] = () => {
    loginHandler({ email: "anonymoususer@gmail.com", password: "Anonymoususer@12345" });
  };
  const darkImg = {
    alt: "Instagram Text Dark",
    src: "/static/instagram/text_dark.svg"
  };

  const lightImg = {
    alt: "Instagram Text Light",
    src: "/static/instagram/text_light.svg"
  };

  return (
    <VStack pb="20px" pt="20px">
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
        spacing="0"
        width="350px"
      >
        <ImageColorMode darkImg={darkImg} height={51} lightImg={lightImg} width={175} />
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <StyledForm onSubmit={handleSubmit(isSignup ? signupHandler : loginHandler)}>
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
            {getValueByAuthMode(
              null,
              <VStack>
                <Grid gap={0} templateColumns="repeat(5, 1fr)" templateRows="repeat(1, 1fr)" w="full">
                  <GridItem alignItems="center" colSpan={2} display="flex" justifyContent="center">
                    <Divider borderColor={SUVA_GREY} />
                  </GridItem>
                  <GridItem colSpan={1} fontSize="small" textAlign="center" textColor={SUVA_GREY}>
                    {t("or")}
                  </GridItem>
                  <GridItem alignItems="center" colSpan={2} display="flex" justifyContent="center">
                    <Divider borderColor={SUVA_GREY} />
                  </GridItem>
                </Grid>
                <Button
                  colorScheme="tertiary"
                  leftIcon={<AiFillLock size={25} />}
                  onClick={handleAnonymousLogin}
                  textDecoration="none !important"
                  variant="link"
                >
                  {t("anonymousLogin")}
                </Button>
              </VStack>
            )}
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
          width="fit-content"
        />
      </Center>
    </VStack>
  );
};
