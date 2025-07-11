export interface Papeleta {
  id?: number;
  seccionId: number;
  eleccionId: number;
  candidaturaIds: number[]; // si manejas IDs, o puedes cambiar por `candidatos?: Candidatura[]`
}
