export type LayoutTemplateProps = {
  children: JSX.Element;
  title?: string | undefined;
};

export type LayoutTemplateType = (props: LayoutTemplateProps) => JSX.Element;
