import { Box, Center } from "@chakra-ui/react";
import { ImageSlide } from "../../atoms/ImageSlide";
import { Form } from "../../organisms/Form";
import type { AuthTemplateType } from "./index.types";

export const AuthTemplate: AuthTemplateType = ({ isSignup }) => (
  <Center>
    {!isSignup && (
      <Box
        display={{
          base: "none",
          md: "block"
        }}
      >
        <ImageSlide />
      </Box>
    )}
    <Form isSignup={isSignup} />
  </Center>
);
