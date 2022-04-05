import {
  Table,
  TableCaption,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr
} from "@chakra-ui/react";
import type { GetServerSideProps, NextPage } from "next";

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

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=151");
  const data = (await res.json()) as ResType;

  return {
    props: { data }
  };
};

const About: NextPage<Props> = ({ data }) => (
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
);

export default About;
