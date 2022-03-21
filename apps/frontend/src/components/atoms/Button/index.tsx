import React from "react";

type ButtonProps = {
  label: string;
  isPrimary: boolean;
  size: "large" | "medium";
  handleClick: () => void;
};

export const Button = ({
  isPrimary,
  handleClick,
  size,
  label
}: ButtonProps): JSX.Element => (
  <button
    onClick={handleClick}
    style={{
      color: isPrimary ? "red" : "blue",
      width: size === "large" ? "100px" : "50px"
    }}
    type="button"
  >
    {label}
  </button>
);

export const MemorizedButton = React.memo(Button);
