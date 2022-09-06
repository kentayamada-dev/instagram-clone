import { FormControl, FormErrorMessage, FormLabel, Input, useColorModeValue } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import { constants } from "../../../../../constants";
import { useLocale } from "../../../../../lib/next_router";
import type { EmailInputType } from "./index.types";

const {
  COLORS: { BUNKER, SNOW }
} = constants;

export const EmailInput: EmailInputType = ({ errors, register }) => {
  const { t } = useTranslation("form");
  const inputBgColor = useColorModeValue(SNOW, BUNKER);
  const errorMessage = errors.email?.message;
  const emailBlankErrorMessage = useLocale("Please enter email address.", "メールアドレスを入力してください。");
  const emailValidationMessage = useLocale(
    "Entered value does not match email format.",
    "メールアドレスのフォーマットを確認してください。"
  );

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
            message: emailValidationMessage,
            value: /\S+@\S+\.\S+/u
          },
          required: emailBlankErrorMessage
        })}
      />
      <FormErrorMessage>{errorMessage}</FormErrorMessage>
    </FormControl>
  );
};
