import { Link } from "@chakra-ui/react";
import NextLink from "next/link";
import type { TextLinkType } from "./index.types";

export const TextLink: TextLinkType = ({ isVisibleUnderline = false, href, text, ...linkProps }) => (
  <NextLink href={href} passHref>
    <Link {...linkProps} _hover={{ textDecoration: isVisibleUnderline ? "underline" : "none" }}>
      {text}
    </Link>
  </NextLink>
);
