import { FormControl, FormErrorMessage, FormLabel, Input, useColorModeValue } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import { constants } from "../../../../../constants";
import { useLocale } from "../../../../../libs/next_router";
import type { NameInputType } from "./index.types";

const {
  COLORS: { BUNKER, SNOW }
} = constants;

export const NameInput: NameInputType = ({ errors, register }) => {
  const { t } = useTranslation("form");
  const nameBlankErrorMessage = useLocale("Please enter name", "名前を入力してください");
  const inputBgColor = useColorModeValue(SNOW, BUNKER);
  const errorMessage = errors.name?.message;

  return (
    <FormControl isInvalid={Boolean(errorMessage)}>
      <FormLabel htmlFor="name">{t("name")}</FormLabel>
      <Input
        bgColor={inputBgColor}
        id="name"
        placeholder={t("namePlaceholder")}
        {...register("name", {
          required: nameBlankErrorMessage
        })}
        type="text"
      />
      <FormErrorMessage>{errorMessage}</FormErrorMessage>
    </FormControl>
  );
};
