import { Heading, Grid, GridItem, Link, Skeleton, useColorModeValue, VStack, Center } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import NextImage from "next/image";
import NextLink from "next/link";
import { FiCamera } from "react-icons/fi";
import { constants } from "../../../constants";
import type { PostsListType } from "./index.types";

const {
  COLORS: { BLACK_PEARL, SNOW }
} = constants;

export const PostsList: PostsListType = ({ posts, userId = "" }) => {
  const shadowColor = useColorModeValue(BLACK_PEARL, SNOW);
  const { t } = useTranslation("common");

  return (
    <Grid gap={3} p={{ base: "0", md: "0 0.75rem 0.75rem 0.75rem" }} templateColumns="repeat(3, 1fr)">
      {posts ? (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <>
          {posts.length > 0 ? (
            posts.map((post) => (
              <GridItem
                _hover={{
                  boxShadow: `0 3px 10px ${shadowColor}`,
                  transform: "translate(0, -2px)"
                }}
                key={post.id}
                paddingTop="100%"
                pos="relative"
                sx={{
                  transition: "box-shadow 0.5s, transform 0.5s"
                }}
              >
                <NextLink href={`/${userId}/${post.id}`} passHref>
                  <Link>
                    <NextImage alt="Post Image" layout="fill" objectFit="cover" quality={100} src={post.imageUrl} />
                  </Link>
                </NextLink>
              </GridItem>
            ))
          ) : (
            <GridItem colSpan={3} pos="relative">
              <Center minH="300px">
                <VStack>
                  <FiCamera size="30px" />
                  <Heading as="h1" fontWeight="normal" size="lg">
                    {t("noPostsYet")}
                  </Heading>
                </VStack>
              </Center>
            </GridItem>
          )}
        </>
      ) : (
        <>
          {[...Array(9)].map((_, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <GridItem key={index} pos="relative">
              <Skeleton paddingTop="100%" />
            </GridItem>
          ))}
        </>
      )}
    </Grid>
  );
};
