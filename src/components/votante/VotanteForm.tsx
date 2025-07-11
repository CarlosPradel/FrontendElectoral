import React, { useEffect, useState } from "react";
import type { CreateVotante } from "../../models/Dtos/VotanteDto";
import type { Votante } from "../../models/Votante";
import { getRecintos } from "../../services/recintoService";
import type { Recinto } from "../../models/Recinto";

interface VotanteFormProps {
  initialData?: Votante;
  onSubmit: (data: CreateVotante) => void;
}

const VotanteForm: React.FC<VotanteFormProps> = ({ initialData, onSubmit }) => {
  const [nombreCompleto, setNombreCompleto] = useState("");
  const [apellidoPaterno, setApellidoPaterno] = useState("");
  const [recintoId, setRecintoId] = useState<number>(0);
  const [recintos, setRecintos] = useState<Recinto[]>([]);

  useEffect(() => {
    if (initialData) {
      setNombreCompleto(initialData.nombreCompleto);
      setApellidoPaterno(initialData.apellidoPaterno);
      setRecintoId(0); // No se puede inferir desde mesaElectoralId directamente
    }
  }, [initialData]);

  useEffect(() => {
  getRecintos().then((recintos) => setRecintos(recintos));
  }, []);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombreCompleto || !apellidoPaterno || !recintoId) {
      alert("Completa todos los campos.");
      return;
    }

    onSubmit({ nombreCompleto, apellidoPaterno, recintoId });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow space-y-4">
      <input
        type="text"
        placeholder="Nombre completo"
        value={nombreCompleto}
        onChange={(e) => setNombreCompleto(e.target.value)}
        className="w-full px-4 py-2 border rounded"
        required
      />

      <input
        type="text"
        placeholder="Apellido paterno"
        value={apellidoPaterno}
        onChange={(e) => setApellidoPaterno(e.target.value)}
        className="w-full px-4 py-2 border rounded"
        required
      />

      <select
        value={recintoId}
        onChange={(e) => setRecintoId(Number(e.target.value))}
        className="w-full px-4 py-2 border rounded"
        required
      >
        <option value="">Selecciona un recinto</option>
        {recintos.map((recinto) => (
          <option key={recinto.id} value={recinto.id}>
            {recinto.nombre} - {recinto.direccion}
          </option>
        ))}
      </select>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        {initialData ? "Actualizar Votante" : "Registrar Votante"}
      </button>
    </form>
  );
};

export default VotanteForm;
