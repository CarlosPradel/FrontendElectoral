export interface Jurado {
  id: number;
  nombreCompleto: string;
  mesaElectoralId: number;
}

export interface CreateJurado {
  nombreCompleto: string;
  mesaElectoralId: number;
}
