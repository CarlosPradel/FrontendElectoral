export interface Recinto {
  id: number;
  nombre: string;
  direccion: string;
  coordenadas: string;
}

export interface CreateRecinto {
  nombre: string;
  direccion: string;
  coordenadas: string;
}
