import { Heading, Grid, GridItem, Link, Skeleton, useColorModeValue, VStack, Center } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import NextImage from "next/image";
import NextLink from "next/link";
import { FiCamera } from "react-icons/fi";
import { constants } from "../../../constants";
import { useWindowDimensions } from "../../../hooks/useWindowDimensions";
import type { PostsListType } from "./index.types";

const {
  COLORS: { BLACK_PEARL, SNOW }
} = constants;

export const PostsList: PostsListType = ({ posts, userId = "" }) => {
  const { width } = useWindowDimensions();
  const shadowColor = useColorModeValue(BLACK_PEARL, SNOW);
  const { t } = useTranslation("common");

  if (posts?.length === 0) {
    return (
      <Center h="200px">
        <VStack>
          <FiCamera size="30px" />
          <Heading as="h1" fontWeight="normal" size="lg">
            {t("noPostsYet")}
          </Heading>
        </VStack>
      </Center>
    );
  }

  return (
    <Grid
      gap={{
        base: 2,
        lg: 6
      }}
      p={{
        base: 0,
        sm: 6
      }}
      templateColumns="repeat(3, 1fr)"
      w="100%"
    >
      {posts ? (
        posts.map((post) => (
          <GridItem
            _hover={{
              boxShadow: `0 3px 10px ${shadowColor}`,
              transform: "translate(0, -2px)"
            }}
            h={{
              base: width === null ? "10px" : `${width / 3}px`,
              lg: "280px"
            }}
            key={post.node.id}
            pos="relative"
            sx={{
              transition: "box-shadow 0.5s, transform 0.5s"
            }}
            w="inherit"
          >
            <NextLink href={`/${userId}/${post.node.id}`} passHref>
              <Link>
                <NextImage alt="Post Image" layout="fill" objectFit="cover" quality={100} src={post.node.imageUrl} />
              </Link>
            </NextLink>
          </GridItem>
        ))
      ) : (
        <>
          {[...Array(9)].map((_, index) => (
            <GridItem
              h={{
                base: width === null ? "10px" : `${width / 3}px`,
                lg: "280px"
              }}
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              pos="relative"
              sx={{
                transition: "box-shadow 0.5s, transform 0.5s"
              }}
              w="inherit"
            >
              <Skeleton h="inherit" />
            </GridItem>
          ))}
        </>
      )}
    </Grid>
  );
};
