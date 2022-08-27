import { Flex, Heading, Box, Text } from "@chakra-ui/react";
import Lottie from "lottie-react";
import { useTranslation } from "next-i18next";
import { constants } from "../../../constants";
import { TextLink } from "../../atoms/TextLink";
import Custom404Animation from "./custom404Animation.json";
import type { Custom404TemplateType } from "./index.types";

const {
  COLORS: { DODGER_BLUE }
} = constants;

export const Custom404Template: Custom404TemplateType = () => {
  const { t } = useTranslation("notFound");

  return (
    <Flex
      alignItems="center"
      flexDir="column"
      m={{
        base: 5,
        sm: 10
      }}
    >
      <Heading as="h2" size="lg">
        {t("pageNotFound")}
      </Heading>
      <Flex
        direction={{
          base: "column",
          md: "row"
        }}
        fontSize="md"
        gap={{
          base: 0,
          md: 1
        }}
        mt="10"
      >
        <Text>{t("pageNotFoundDescription")}</Text>
        <TextLink href="/" text={t("goBack")} textColor={DODGER_BLUE} />
      </Flex>
      <Box mt="10" w="80">
        <Lottie animationData={Custom404Animation} loop />
      </Box>
    </Flex>
  );
};
