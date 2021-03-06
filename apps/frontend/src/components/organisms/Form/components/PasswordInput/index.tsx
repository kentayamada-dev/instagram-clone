import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  useColorModeValue
} from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import React from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { constants } from "../../../../../constants";
import { useLocale } from "../../../../../libs/next_router";
import type { PasswordInputType } from "./index.types";

const {
  COLORS: { BUNKER, SNOW }
} = constants;

export const PasswordInput: PasswordInputType = ({ errors, register }) => {
  const { t } = useTranslation("form");
  const passwordBlankErrorMessage = useLocale("Please enter password", "パスワードを入力してください");
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
  const getPasswordVisibleIcon = (): JSX.Element => (isPasswordVisible ? <AiFillEye /> : <AiFillEyeInvisible />);
  const handleShowPassword = (): void => setIsPasswordVisible(!isPasswordVisible);
  const inputBgColor = useColorModeValue(SNOW, BUNKER);
  const errorMessage = errors.password?.message;

  return (
    <FormControl isInvalid={Boolean(errorMessage)}>
      <FormLabel htmlFor="password">{t("password")}</FormLabel>
      <InputGroup>
        <Input
          bgColor={inputBgColor}
          id="password"
          placeholder={t("passwordPlaceholder")}
          type={isPasswordVisible ? "text" : "password"}
          {...register("password", {
            pattern: {
              message: t("passwordValidationMessage"),
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*"'()+,-./:;<=>?[\]^_`{|}~])(?=.{10,})/u
            },
            required: passwordBlankErrorMessage
          })}
        />
        <InputRightElement>
          <Button aria-label="Toggle Password Visible Button" onClick={handleShowPassword} p="0px" size="sm">
            {getPasswordVisibleIcon()}
          </Button>
        </InputRightElement>
      </InputGroup>
      <FormErrorMessage>{errorMessage}</FormErrorMessage>
    </FormControl>
  );
};
