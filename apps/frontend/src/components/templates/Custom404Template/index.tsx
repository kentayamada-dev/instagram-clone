import { Flex, Heading, Box, Text } from "@chakra-ui/react";
import Lottie from "lottie-react";
import { useTranslation } from "next-i18next";
import { constants } from "../../../constants";
import { TextLink } from "../../atoms/TextLink";
import Custom404Animation from "./Custom404Animation.json";
import type { Custom404TemplateType } from "./index.types";

const {
  COLORS: { DODGER_BLUE }
} = constants;

export const Custom404Template: Custom404TemplateType = () => {
  const { t } = useTranslation("notFound");

  return (
    <Flex alignItems="center" flexDir="column" m="10">
      <Heading as="h2" size="lg">
        {t("pageNotFound")}
      </Heading>
      <Text fontSize="md" mt="10">
        {t("pageNotFoundDescription")}
        <TextLink fontSize="md" href="/" text={t("goBack")} textColor={DODGER_BLUE} />
      </Text>
      <Box mt="10" w="80">
        <Lottie animationData={Custom404Animation} loop />
      </Box>
    </Flex>
  );
};
