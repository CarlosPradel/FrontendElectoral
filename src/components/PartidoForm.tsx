import React, { useEffect, useState } from "react";
import type { Partido } from "../models/Partido";
import type { CreatePartido } from "../models/Dtos/PartidoDto";

interface PartidoFormProps {
  initialData?: Partido;
  onSubmit: (data: CreatePartido) => void;
}

const PartidoForm: React.FC<PartidoFormProps> = ({ initialData, onSubmit }) => {
  const [nombre, setNombre] = useState("");
  const [sigla, setSigla] = useState("");
  const [color, setColor] = useState("");

  useEffect(() => {
    if (initialData) {
      setNombre(initialData.nombre);
      setSigla(initialData.sigla);
      setColor(initialData.color);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ nombre, sigla, color });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white rounded shadow">
      <input
        type="text"
        placeholder="Nombre del partido"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        className="w-full px-4 py-2 border rounded"
        required
      />

      <input
        type="text"
        placeholder="Sigla"
        value={sigla}
        onChange={(e) => setSigla(e.target.value)}
        className="w-full px-4 py-2 border rounded"
        required
      />

      <input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        className="w-full h-10 border rounded"
        title="Selecciona un color"
        required
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        {initialData ? "Actualizar Partido" : "Registrar Partido"}
      </button>
    </form>
  );
};

export default PartidoForm;
