import type { ColorProps, TypographyProps } from "@chakra-ui/react";

export type TextLinkProps = ColorProps &
  TypographyProps & {
    href: string;
    text: string;
    isVisibleUnderline?: boolean | undefined;
  };

export type TextLinkType = (props: TextLinkProps) => JSX.Element;
