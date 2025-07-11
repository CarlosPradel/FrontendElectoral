import type { SeccionEleccion } from "./SeccionEleccion";

export interface Eleccion {
  id?: number;
  tipo: string;
  fecha: string; // ISO string (DateTime en C#)
  seccionesAfectadas?: SeccionEleccion[];
}
