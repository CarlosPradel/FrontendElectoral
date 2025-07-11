import React, { useEffect, useState } from "react";
import type { Recinto } from "../../models/Recinto";
import type { CreateRecinto } from "../../models/Dtos/RecintoDto";

interface RecintoFormProps {
  initialData?: Recinto;
  onSubmit: (data: CreateRecinto) => void;
}

const RecintoForm: React.FC<RecintoFormProps> = ({ initialData, onSubmit }) => {
  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");
  const [coordenadas, setCoordenadas] = useState("");

  useEffect(() => {
    if (initialData) {
      setNombre(initialData.nombre);
      setDireccion(initialData.direccion);
      setCoordenadas(initialData.coordenadas);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!nombre.trim() || !direccion.trim() || !coordenadas.trim()) {
      alert("Por favor completa todos los campos.");
      return;
    }

    onSubmit({ nombre, direccion, coordenadas });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-4 rounded shadow"
    >
      <input
        type="text"
        placeholder="Nombre del recinto"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        className="w-full px-4 py-2 border rounded"
        required
      />

      <input
        type="text"
        placeholder="Dirección"
        value={direccion}
        onChange={(e) => setDireccion(e.target.value)}
        className="w-full px-4 py-2 border rounded"
        required
      />

      <input
        type="text"
        placeholder="Coordenadas"
        value={coordenadas}
        onChange={(e) => setCoordenadas(e.target.value)}
        className="w-full px-4 py-2 border rounded"
        required
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        {initialData ? "Actualizar Recinto" : "Registrar Recinto"}
      </button>
    </form>
  );
};

export default RecintoForm;
