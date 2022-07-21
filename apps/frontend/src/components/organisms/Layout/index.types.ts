export type LayoutProps = {
  children: JSX.Element;
  title?: string | undefined;
};

export type LayoutType = (props: LayoutProps) => JSX.Element;
