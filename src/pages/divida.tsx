import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { VStack } from "@chakra-ui/react";

import { divida } from "./api/divida";
import { uuid } from "./api/uuid";
import CardContent from "../components/CardContent";
import Table from "../components/Table";
import Header from "../components/Header";
import TableContent from "../components/TableContent";

export interface IDebits {
  _id: any;
  idUsuario: number;
  valor: number;
  motivo: string;
  criado: any;
}

const Divida: React.FC = () => {
  const [debts, setDebits] = useState<IDebits[]>([]);

  useEffect(() => {
    divida.get(`divida/${uuid}`).then((resp) => setDebits(resp.data.result));
  }, []);
  console.log(debts);

  return (
    <VStack w="full" px="1rem">
      <Header whenThereIsUser />

      <TableContent>
        {debts.map((debit) => (
          <Table key={debit._id} debit={debit} />
        ))}
      </TableContent>
    </VStack>
  );
};

export default Divida;
