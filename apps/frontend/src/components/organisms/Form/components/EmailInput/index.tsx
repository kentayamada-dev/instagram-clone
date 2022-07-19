import { FormControl, FormErrorMessage, FormLabel, Input, useColorModeValue } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import { constants } from "../../../../../constants";
import { useLocale } from "../../../../../libs/next_router";
import type { EmailInputType } from "./index.types";

const {
  COLORS: { BUNKER, SNOW }
} = constants;

export const EmailInput: EmailInputType = ({ errors, register }) => {
  const { t } = useTranslation("form");
  const inputBgColor = useColorModeValue(SNOW, BUNKER);
  const errorMessage = errors.email?.message;
  const emailBlankErrorMessage = useLocale("Please enter email address", "メールアドレスを入力してください");

  return (
    <FormControl isInvalid={Boolean(errorMessage)}>
      <FormLabel htmlFor="email">{t("email")}</FormLabel>
      <Input
        bgColor={inputBgColor}
        id="email"
        placeholder={t("emailPlaceholder")}
        type="email"
        {...register("email", {
          pattern: {
            message: t("emailValidationMessage"),
            value: /\S+@\S+\.\S+/u
          },
          required: emailBlankErrorMessage
        })}
      />
      <FormErrorMessage>{errorMessage}</FormErrorMessage>
    </FormControl>
  );
};
