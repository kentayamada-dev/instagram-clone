import { FormControl, FormErrorMessage, FormLabel, Input, useColorModeValue } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import { constants } from "../../../../../constants";
import { useLocale } from "../../../../../libs/next_router";
import type { UserIdInputType } from "./index.types";

const {
  COLORS: { BUNKER, SNOW }
} = constants;

export const UserIdInput: UserIdInputType = ({ errors, register }) => {
  const { t } = useTranslation("form");
  const nameBlankErrorMessage = useLocale("Please enter username.", "ユーザーネームを入力してください。");
  const userNameValidationMessage = useLocale(
    "Username must be less than 30 characters long, can only use letters, numbers, underscores and periods.",
    "ユーザーネームは30文字以下で、半角英数字、アンダースコア(_)、ピリオド(.)のみを使用してください。"
  );
  const inputBgColor = useColorModeValue(SNOW, BUNKER);
  const errorMessage = errors.id?.message;

  return (
    <FormControl isInvalid={Boolean(errorMessage)}>
      <FormLabel htmlFor="id">{t("username")}</FormLabel>
      <Input
        bgColor={inputBgColor}
        id="id"
        placeholder={t("usernamePlaceholder")}
        {...register("id", {
          pattern: {
            message: userNameValidationMessage,
            value: /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/u
          },
          required: nameBlankErrorMessage
        })}
        type="text"
      />
      <FormErrorMessage>{errorMessage}</FormErrorMessage>
    </FormControl>
  );
};
