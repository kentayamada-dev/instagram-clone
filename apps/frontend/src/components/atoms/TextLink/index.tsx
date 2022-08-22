import { Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import type { TextLinkType } from "./index.types";

export const TextLink: TextLinkType = ({ width = "inherit", isVisibleUnderline = false, href, text, ...linkProps }) => (
  <NextLink href={href} passHref>
    <Link w={width} {...linkProps} _hover={{ textDecoration: isVisibleUnderline ? "underline" : "none" }}>
      <Text noOfLines={1} w={width}>
        {text}
      </Text>
    </Link>
  </NextLink>
);
