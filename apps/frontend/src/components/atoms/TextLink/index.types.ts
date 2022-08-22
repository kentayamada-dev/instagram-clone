import type { ColorProps, LayoutProps, TypographyProps } from "@chakra-ui/react";

type TextLinkProps = ColorProps &
  Partial<
    Pick<LayoutProps, "width"> & {
      isVisibleUnderline: boolean;
    }
  > &
  TypographyProps & {
    href: string;
    text: string;
  };

export type TextLinkType = (props: TextLinkProps) => JSX.Element;
