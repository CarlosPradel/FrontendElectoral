export interface Partido {
  id: number;
  nombre: string;
  sigla: string;
  color: string;
}

export interface CreatePartido {
  nombre: string;
  sigla: string;
  color: string;
}
