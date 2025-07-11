export interface Eleccion {
  id: number;
  tipo: string;
  fecha: string; // o Date si se parsea como objeto
}

export interface CreateEleccion {
  tipo: string;
  fecha: string; // igual que arriba
}
