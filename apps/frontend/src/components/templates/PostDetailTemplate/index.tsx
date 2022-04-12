import {
  Box,
  HStack,
  Link,
  VStack,
  Text,
  useColorModeValue
} from "@chakra-ui/react";
import Image from "next/image";
import NextLink from "next/link";
import { constants } from "../../../constants";
import { StyledAvatar } from "../../atoms/StyledAvatar";
import type { PostDetailTemplateType } from "./index.types";

const {
  COLORS: { BLACK_PEARL, WHITE, EBONY }
} = constants;

export const PostDetailTemplate: PostDetailTemplateType = ({ data }) => {
  const bgColor = useColorModeValue(WHITE, EBONY);
  const borderColor = useColorModeValue("", BLACK_PEARL);

  return (
    <VStack
      mb="auto"
      ml="auto"
      mr="auto"
      mt={{
        base: "0px",
        sm: "auto"
      }}
      w={{
        base: "100%",
        sm: "450px"
      }}
    >
      <Box
        bgColor={{
          base: "inherit",
          sm: bgColor
        }}
        borderColor={borderColor}
        borderWidth={{
          base: "0px",
          sm: "1px"
        }}
        w="100%"
      >
        <HStack p="3" w="100%">
          <StyledAvatar alt="Avatar Image" size={35} src={data.user.imageUrl} />
          <NextLink href={`/${data.user.id}`} passHref>
            <Link>
              <Text fontWeight="bold">{data.user.name}</Text>
            </Link>
          </NextLink>
        </HStack>
        <Box
          h={{
            base: "300px",
            md: "500px"
          }}
          pos="relative"
          w="100%"
        >
          <Image
            alt="Post Image"
            layout="fill"
            objectFit="cover"
            priority
            quality={100}
            src={data.imageUrl}
          />
        </Box>
        {data.caption !== null && (
          <HStack p="3" w="100%">
            <Text fontWeight="bold">{data.user.name}</Text>
            <Text isTruncated>{data.caption}</Text>
          </HStack>
        )}
      </Box>
    </VStack>
  );
};
