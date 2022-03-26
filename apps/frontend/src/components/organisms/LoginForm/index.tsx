/* eslint-disable react/jsx-max-depth */
import {
  Button,
  Center,
  FormControl,
  Input,
  InputGroup,
  Stack,
  VStack,
  Text,
  Link
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import NextLink from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
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

export const LoginForm = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm<Inputs>();
  const { t } = useTypeSafeTranslation("login");
  // eslint-disable-next-line no-console
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

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
                  placeholder={t("email")}
                  type="email"
                  {...register("email")}
                />
                <Input
                  placeholder={t("password")}
                  type="password"
                  {...register("password")}
                />
                <Button
                  isLoading={isSubmitting}
                  type="submit"
                  variant="with-shadow"
                >
                  {t("login")}
                </Button>
              </Stack>
            </InputGroup>
          </FormControl>
        </Form>
      </Stack>
      <Center borderWidth="1px" h="60px" w="100%">
        <Text fontSize="sm">{t("noAccount")}</Text>
        <NextLink href="/signup" passHref>
          <Link>Home</Link>
        </NextLink>
      </Center>
    </VStack>
  );
};

/* eslint-enable react/jsx-max-depth */
