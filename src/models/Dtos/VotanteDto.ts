export interface Votante {
  id: number;
  nombreCompleto: string;
  apellidoPaterno: string;
  mesaElectoralId: number;
}

export interface CreateVotante {
  nombreCompleto: string;
  apellidoPaterno: string;
  recintoId: number; // usado para lógica de distribución automática en el backend
}
