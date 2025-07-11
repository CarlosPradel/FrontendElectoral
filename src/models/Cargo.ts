import type { CargoSeccion } from "./CargoSeccion";

export interface Cargo {
  id?: number;
  nombre: string;
  secciones?: CargoSeccion[];
}
