type LoadingAnimationPropsType = Partial<{
  size: number;
}>;

export type LoadingAnimationType = (props: LoadingAnimationPropsType) => JSX.Element;
