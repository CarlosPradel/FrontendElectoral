export interface Candidatura {
  id: number;
  nombreCandidato: string;
  nombreCargo: string;
  nombrePartido: string;
}

export interface CreateCandidatura {
  nombreCandidato: string;
  cargoId: number;
  partidoId: number;
}
