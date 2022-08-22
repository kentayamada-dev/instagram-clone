type GaTagsProps = {
  gaTrackingId: string | undefined;
};

export type GaTagsType = (props: GaTagsProps) => JSX.Element | null;
