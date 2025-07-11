import React, { useEffect, useState } from "react";
import type { CreateCandidatura } from "../../models/Dtos/CantidaturaDto";
import { getCargos } from "../../services/cargoService";
import { getPartidos } from "../../services/partidoService";
import type { Cargo } from "../../models/Cargo";
import type { Partido } from "../../models/Partido";

// 👇 Agregamos tipo auxiliar compatible con el backend + IDs
type CandidaturaFormData = CreateCandidatura & { id?: number };

interface CandidaturaFormProps {
  initialData?: CandidaturaFormData;
  onSubmit: (data: CreateCandidatura) => void;
}

const CandidaturaForm: React.FC<CandidaturaFormProps> = ({ initialData, onSubmit }) => {
  const [nombreCandidato, setNombreCandidato] = useState("");
  const [cargoId, setCargoId] = useState<number>(0);
  const [partidoId, setPartidoId] = useState<number>(0);
  const [cargos, setCargos] = useState<Cargo[]>([]);
  const [partidos, setPartidos] = useState<Partido[]>([]);

  useEffect(() => {
    getCargos().then(setCargos);
    getPartidos().then((res) => setPartidos(res.data));
  }, []);

  useEffect(() => {
    if (initialData) {
      setNombreCandidato(initialData.nombreCandidato);
      setCargoId(initialData.cargoId);
      setPartidoId(initialData.partidoId);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombreCandidato || !cargoId || !partidoId) {
      alert("Completa todos los campos.");
      return;
    }

    onSubmit({ nombreCandidato, cargoId, partidoId });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow space-y-4">
      <input
        type="text"
        placeholder="Nombre del candidato"
        value={nombreCandidato}
        onChange={(e) => setNombreCandidato(e.target.value)}
        className="w-full px-4 py-2 border rounded"
        required
      />

      <select
        value={cargoId}
        onChange={(e) => setCargoId(Number(e.target.value))}
        className="w-full px-4 py-2 border rounded"
        required
      >
        <option value="">Selecciona un cargo</option>
        {cargos.map((cargo) => (
          <option key={cargo.id} value={cargo.id}>
            {cargo.nombre}
          </option>
        ))}
      </select>

      <select
        value={partidoId}
        onChange={(e) => setPartidoId(Number(e.target.value))}
        className="w-full px-4 py-2 border rounded"
        required
      >
        <option value="">Selecciona un partido</option>
        {partidos.map((partido) => (
          <option key={partido.id} value={partido.id}>
            {partido.nombre}
          </option>
        ))}
      </select>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        {initialData ? "Actualizar Candidatura" : "Registrar Candidatura"}
      </button>
    </form>
  );
};

export default CandidaturaForm;
