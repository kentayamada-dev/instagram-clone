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
  useColorMode,
  useColorModeValue
} from "@chakra-ui/react";
import { Layout } from "../components/organisms/Layout";
import type { NextPageWithLayout } from "../types/pages";
import type { GetStaticProps } from "next";

type ResType = {
  count: number;
  next: string;
  previous: string;
  results: {
    name: string;
    url: string;
  }[];
};

type Props = {
  data: ResType;
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=151");
  const data = (await res.json()) as ResType;

  return {
    props: { data }
  };
};

const Info: NextPageWithLayout<Props> = ({ data }) => {
  const { toggleColorMode: handleColorMode } = useColorMode();
  const colorModeText = useColorModeValue("Dark", "Light");

  return (
    <>
      <Button colorScheme="brand" onClick={handleColorMode}>
        {colorModeText}
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

Info.getLayout = (page): JSX.Element => <Layout title="info">{page}</Layout>;

export default Info;
