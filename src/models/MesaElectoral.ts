import type { Jurado } from "./Jurado";
import type { Votante } from "./Votante";

export interface MesaElectoral {
  id?: number;
  numero: number;
  recintoId: number;
  jurados?: Jurado[];
  votantes?: Votante[];
}
