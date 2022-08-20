type LayoutTemplatePropsType = {
  children: JSX.Element;
  title?: string | undefined;
};

export type LayoutTemplateType = (props: LayoutTemplatePropsType) => JSX.Element;
