import React, { useEffect, useState } from "react";
import type { Eleccion } from "../models/Eleccion";
import type { CreateEleccion } from "../models/Dtos/EleccionDto";

interface EleccionFormProps {
  initialData?: Eleccion;
  onSubmit: (data: CreateEleccion) => void;
}

const EleccionForm: React.FC<EleccionFormProps> = ({ initialData, onSubmit }) => {
  const [tipo, setTipo] = useState("");
  const [fecha, setFecha] = useState("");

  useEffect(() => {
    if (initialData) {
      setTipo(initialData.tipo);
      setFecha(initialData.fecha.slice(0, 10)); 
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!tipo.trim() || !fecha.trim()) {
      alert("Por favor completa todos los campos.");
      return;
    }

    onSubmit({ tipo, fecha });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded shadow">
      <input
        type="text"
        placeholder="Tipo de elección (Ej: Presidencial)"
        value={tipo}
        onChange={(e) => setTipo(e.target.value)}
        className="w-full px-4 py-2 border rounded"
        required
      />

      <input
        type="date"
        value={fecha}
        onChange={(e) => setFecha(e.target.value)}
        className="w-full px-4 py-2 border rounded"
        required
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        {initialData ? "Actualizar Elección" : "Registrar Elección"}
      </button>
    </form>
  );
};

export default EleccionForm;
