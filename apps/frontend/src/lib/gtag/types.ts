export type GaPageviewType = (pagePath: string) => void;

type GaEventProps = {
  action: string;
  category: string;
  label?: string;
  value?: number;
};

export type GaEventType = (props: GaEventProps) => void;
