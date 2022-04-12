import React from "react";
import type { WindowDimentionsReturnType, WindowDimentionsType } from "./type";

export const useWindowDimensions: WindowDimentionsType = () => {
  const [windowDimensions, setWindowDimensions] =
    React.useState<WindowDimentionsReturnType>({
      height: null,
      width: null
    });
  React.useEffect(() => {
    const handleResize = (): void => {
      setWindowDimensions({
        height: window.innerHeight,
        width: window.innerWidth
      });
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return (): void => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
};
