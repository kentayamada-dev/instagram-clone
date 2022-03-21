import { Button, Text } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";
import React from "react";
import { MemorizedButton } from "../components/atoms/Button";
import type { GetStaticProps, GetStaticPropsContext, NextPage } from "next";
import type { SSRConfig } from "next-i18next";

const Home: NextPage = () => {
  // eslint-disable-next-line no-console
  const handleClick = React.useCallback(() => console.log("hi"), []);
  const { t } = useTranslation("common");

  return (
    <>
      <Link href="/about">
        <a>About</a>
      </Link>
      <Link href="/info">
        <a>Info</a>
      </Link>
      <Text>{t("greeting")}</Text>
      <Button colorScheme="brand">hi</Button>
      <MemorizedButton
        handleClick={handleClick}
        isPrimary
        label="ラベル"
        size="large"
      />
    </>
  );
};

export const getStaticProps: GetStaticProps<SSRConfig> = async ({
  locale = "en"
}: GetStaticPropsContext) => {
  const translations = await serverSideTranslations(locale, ["common"]);

  return {
    props: {
      ...translations
    }
  };
};

export default Home;
