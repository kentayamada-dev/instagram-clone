import type { ColorProps, TypographyProps } from "@chakra-ui/react";

type TextLinkProps = ColorProps &
  TypographyProps & {
    href: string;
    isVisibleUnderline?: boolean;
    text: string;
  };

export type TextLinkType = (props: TextLinkProps) => JSX.Element;
