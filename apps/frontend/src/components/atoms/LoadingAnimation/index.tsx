import { Center } from "@chakra-ui/react";
import Lottie from "lottie-react";
import InstagramLoadingAnimation from "./instagramLoadingAnimation.json";
import type { LoadingAnimationType } from "./index.types";

export const LoadingAnimation: LoadingAnimationType = ({ size = 200 }) => (
  <Center>
    <Lottie
      animationData={InstagramLoadingAnimation}
      loop
      // eslint-disable-next-line react/forbid-component-props
      style={{
        height: `${size}px`,
        width: `${size}px`
      }}
    />
  </Center>
);
