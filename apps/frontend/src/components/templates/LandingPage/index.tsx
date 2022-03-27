import { Box, Center } from "@chakra-ui/react";
import { ImageSlide } from "../../atoms/ImageSlide";
import { LoginForm } from "../../organisms/LoginForm";

export const LandingPage = (): JSX.Element => (
  <Center minH="84vh">
    <Box
      display={{
        base: "none",
        md: "block"
      }}
    >
      <ImageSlide />
    </Box>
    <LoginForm />
  </Center>
);
