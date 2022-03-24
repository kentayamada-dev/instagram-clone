import { Box } from "@chakra-ui/react";
import Image from "next/image";
import styles from "./index.module.css";

export const ImageSlide = (): JSX.Element => (
  <Box pos="relative">
    <Image
      alt="Image Slide Base"
      height={581}
      objectFit="contain"
      quality={100}
      src="/static/landingPage/slide/base.png"
      width={380}
    />
    <Box pos="absolute" right="47px" top="40px">
      <Image
        alt="Image Slide 1"
        // eslint-disable-next-line react/forbid-component-props
        className={styles["s"]}
        height={465}
        objectFit="contain"
        quality={100}
        src="/static/landingPage/slide/1.png"
        width={205}
      />
    </Box>
    <Box pos="absolute" right="47px" top="40px">
      <Image
        alt="Image Slide 2"
        // eslint-disable-next-line react/forbid-component-props
        className={styles["slide_2"]}
        height={465}
        objectFit="contain"
        quality={100}
        src="/static/landingPage/slide/2.png"
        width={205}
      />
    </Box>
    <Box pos="absolute" right="47px" top="40px">
      <Image
        alt="Image Slide 3"
        // eslint-disable-next-line react/forbid-component-props
        className={styles["slide_3"]}
        height={465}
        objectFit="contain"
        quality={100}
        src="/static/landingPage/slide/3.png"
        width={205}
      />
    </Box>
    <Box pos="absolute" right="47px" top="40px">
      <Image
        alt="Image Slide 4"
        // eslint-disable-next-line react/forbid-component-props
        className={styles["slide_4"]}
        height={465}
        objectFit="contain"
        quality={100}
        src="/static/landingPage/slide/4.png"
        width={205}
      />
    </Box>
  </Box>
);
