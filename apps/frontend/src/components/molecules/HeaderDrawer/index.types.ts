export type HeaderDrawerProps = {
  isOpen: boolean;
  handleClose: () => void;
};

export type HeaderDrawerType = (props: HeaderDrawerProps) => JSX.Element;
