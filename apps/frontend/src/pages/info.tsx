import {
  Button,
  Table,
  TableCaption,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  useColorMode
} from "@chakra-ui/react";
import type { GetStaticProps, NextPage } from "next";

type Res = {
  count: number;
  next: string;
  previous: string;
  results: {
    name: string;
    url: string;
  }[];
};

type Props = {
  data: Res;
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=151");
  const data = (await res.json()) as Res;

  return {
    props: { data }
  };
};

const Info: NextPage<Props> = ({ data }) => {
  const { colorMode, toggleColorMode: handleColorMode } = useColorMode();

  return (
    <>
      <Button colorScheme="brand" onClick={handleColorMode}>
        {colorMode === "light" ? "Dark" : "Light"}
      </Button>
      <Table colorScheme="teal" variant="striped">
        <TableCaption>Imperial to metric conversion factors</TableCaption>
        <Thead>
          <Tr>
            <Th>To convert</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.results.map(({ name }) => (
            <Tr key={name}>
              <Td>{name}</Td>
            </Tr>
          ))}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th>To convert</Th>
          </Tr>
        </Tfoot>
      </Table>
    </>
  );
};

export default Info;
