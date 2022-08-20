import type { ColorProps, TypographyProps } from "@chakra-ui/react";

type TextLinkPropsType = ColorProps &
  TypographyProps & {
    href: string;
    isVisibleUnderline?: boolean;
    text: string;
  };

export type TextLinkType = (props: TextLinkPropsType) => JSX.Element;
