import {
  Button,
  Center,
  FormControl,
  Input,
  InputGroup,
  Stack,
  VStack,
  Text,
  Link,
  useColorModeValue
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import NextLink from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { COLORS } from "../../../constants";
import { useTypeSafeTranslation } from "../../../libs/next_translate";
import { ImageColorMode } from "../../atoms/ImageColorMode";
import type { SubmitHandler } from "react-hook-form";

type Inputs = {
  email: string;
  password: string;
};

const Form = styled.form`
  width: 100%;
`;

const { BLACK_PEARL, WHITE, EBONY } = COLORS;

export const LoginForm = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm<Inputs>();
  const { t } = useTypeSafeTranslation("login");
  // eslint-disable-next-line no-console
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
  const bgColor = useColorModeValue(WHITE, EBONY);
  const borderColor = useColorModeValue("", BLACK_PEARL);
  const darkImg = React.useMemo(
    () => ({
      alt: "Instagram Text Dark",
      src: "/static/instagram/text_dark.svg"
    }),
    []
  );

  const lightImg = React.useMemo(
    () => ({
      alt: "Instagram Text Light",
      src: "/static/instagram/text_light.svg"
    }),
    []
  );

  return (
    <VStack minH="500px" spacing={4}>
      <Stack
        align="center"
        bgColor={bgColor}
        borderColor={borderColor}
        borderWidth="1px"
        p="30px"
        spacing={10}
        width="350px"
      >
        <ImageColorMode
          darkImg={darkImg}
          height={51}
          lightImg={lightImg}
          width={175}
        />
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormControl>
            <InputGroup>
              <Stack spacing={3} w="100%">
                <Input
                  id="email"
                  placeholder={t("email")}
                  type="email"
                  {...register("email")}
                />
                <Input
                  id="password"
                  placeholder={t("password")}
                  type="password"
                  {...register("password")}
                />
                <Button
                  isLoading={isSubmitting}
                  type="submit"
                  variant="primary"
                >
                  {t("login")}
                </Button>
              </Stack>
            </InputGroup>
          </FormControl>
        </Form>
      </Stack>
      <Center
        bgColor={bgColor}
        borderColor={borderColor}
        borderWidth="1px"
        gap={2}
        h="60px"
        w="100%"
      >
        <Text fontSize="sm">{t("noAccount")}</Text>
        <NextLink href="/signup" passHref>
          <Link>{t("signUp")}</Link>
        </NextLink>
      </Center>
    </VStack>
  );
};
