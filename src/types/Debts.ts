export interface IDebts {
  _id: number;
  idUsuario: number;
  valor: number;
  motivo: string;
  criado: string;
}

export type OmitDebtId = Omit<IDebts, "id">;

export type DebtSubmit = Omit<IDebts, "id" | "criado">;
