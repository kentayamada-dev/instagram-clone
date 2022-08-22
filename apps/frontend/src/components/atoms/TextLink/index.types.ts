import type { ColorProps, LayoutProps, TypographyProps } from "@chakra-ui/react";

type TextLinkPropsType = ColorProps &
  Partial<
    Pick<LayoutProps, "width"> & {
      isVisibleUnderline: boolean;
    }
  > &
  TypographyProps & {
    href: string;
    text: string;
  };

export type TextLinkType = (props: TextLinkPropsType) => JSX.Element;
