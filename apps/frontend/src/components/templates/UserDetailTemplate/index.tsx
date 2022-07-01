import {
  VStack,
  HStack,
  Center,
  Text,
  Divider,
  Grid,
  GridItem,
  Link,
  useColorModeValue,
  useBreakpointValue
} from "@chakra-ui/react";
import Image from "next/image";
import NextLink from "next/link";
import { constants } from "../../../constants";
import { useWindowDimensions } from "../../../hooks/useWindowDimensions";
import { StyledAvatar } from "../../atoms/StyledAvatar";
import type { UserDetailTemplateType } from "./index.types";

const {
  COLORS: { BLACK_PEARL, SNOW }
} = constants;

export const UserDetailTemplate: UserDetailTemplateType = ({ data }) => {
  const shadowColor = useColorModeValue(BLACK_PEARL, SNOW);
  const avatarSize = useBreakpointValue({ base: 90, md: 150 });
  const marginTop = useBreakpointValue({ base: 10, md: 50 });
  const { width } = useWindowDimensions();

  return (
    <VStack
      mb="30px"
      ml="auto"
      mr="auto"
      mt={marginTop ?? 20}
      spacing={10}
      w={{
        base: "100%",
        lg: "900px"
      }}
    >
      <HStack align="flex-start" w="100%">
        <Center w="30%">
          <StyledAvatar alt="Avatar Image" size={avatarSize ?? 90} src={data.imageUrl} />
        </Center>
        <Text fontSize="3xl" w="70%">
          {data.name}
        </Text>
      </HStack>
      <Divider />
      <Grid
        gap={{
          base: 2,
          lg: 6
        }}
        templateColumns="repeat(3, 1fr)"
        w="100%"
      >
        {data.posts.map((post) => (
          <GridItem
            _hover={{
              boxShadow: `0 6px 14px ${shadowColor}`,
              transform: "translate(0, -2px)"
            }}
            h={{
              base: width === null ? "10px" : `${width / 3}px`,
              lg: "280px"
            }}
            key={post.id}
            pos="relative"
            sx={{
              transition: "box-shadow 0.5s, transform 0.5s"
            }}
            w="inherit"
          >
            <NextLink href={`/${data.id}/${post.id}`} passHref>
              <Link>
                <Image alt="Post Image" layout="fill" objectFit="cover" priority quality={100} src={post.imageUrl} />
              </Link>
            </NextLink>
          </GridItem>
        ))}
      </Grid>
    </VStack>
  );
};
