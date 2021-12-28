export interface IDebts {
  id: number;
  idUsuario: string | number;
  valor: number;
  motivo: string;
  criado: string;
}

export type OmitDebtId = Omit<IDebts, "id">;

export type DebtSubmit = Omit<IDebts, "id" | "criado">;
