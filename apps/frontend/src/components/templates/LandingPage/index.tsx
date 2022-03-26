import { Center } from "@chakra-ui/react";
import { ImageSlide } from "../../atoms/ImageSlide";
import { LoginForm } from "../../organisms/LoginForm";

export const LandingPage = (): JSX.Element => (
  <Center minH="84vh">
    <ImageSlide />
    <LoginForm />
  </Center>
);
