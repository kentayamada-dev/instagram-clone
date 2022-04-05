export type LayoutProps = {
  children: JSX.Element;
  title: string;
};

export type LayoutType = (props: LayoutProps) => JSX.Element;
