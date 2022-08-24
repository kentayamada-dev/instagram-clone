import { Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import type { TextLinkType } from "./index.types";

export const TextLink: TextLinkType = ({ width = "inherit", isVisibleUnderline = false, href, text, ...linkProps }) => (
  <Text noOfLines={1} w={width}>
    <NextLink href={href} passHref>
      <Link {...linkProps} _hover={{ textDecoration: isVisibleUnderline ? "underline" : "none" }}>
        {text}
      </Link>
    </NextLink>
  </Text>
);
