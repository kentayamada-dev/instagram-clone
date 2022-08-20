type GaTagsPropsType = {
  gaTrackingId: string | undefined;
};

export type GaTagsType = (props: GaTagsPropsType) => JSX.Element | null;
