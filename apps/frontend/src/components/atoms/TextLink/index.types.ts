import type { ColorProps, TypographyProps } from "@chakra-ui/react";

export type TextLinkProps = ColorProps &
  TypographyProps & {
    href: string;
    isVisibleUnderline?: boolean | undefined;
    text: string;
  };

export type TextLinkType = (props: TextLinkProps) => JSX.Element;
