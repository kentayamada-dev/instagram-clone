import { Box, Center } from "@chakra-ui/react";
import { ImageSlide } from "../../atoms/ImageSlide";
import { Form } from "../../organisms/Form";
import type { AuthTemplateType } from "./index.types";

export const AuthTemplate: AuthTemplateType = (props) => {
  const { isSignup } = props;

  return (
    <Center minH="82vh">
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
      <Form {...props} />
    </Center>
  );
};
