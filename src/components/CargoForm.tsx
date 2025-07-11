
import React, { useEffect, useState } from "react";
import type { Cargo } from "../models/Cargo";
import type { CreateCargo } from "../models/Dtos/CargoDto";

interface CargoFormProps {
  initialData?: Cargo;
  onSubmit: (data: CreateCargo) => void;
}

const CargoForm: React.FC<CargoFormProps> = ({ initialData, onSubmit }) => {
  const [nombre, setNombre] = useState("");

  useEffect(() => {
    if (initialData) {
      setNombre(initialData.nombre);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!nombre.trim()) {
      alert("Por favor ingresa el nombre del cargo.");
      return;
    }

    onSubmit({ nombre });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-4 rounded shadow"
    >
      <input
        type="text"
        placeholder="Nombre del cargo"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        className="w-full px-4 py-2 border rounded"
        required
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        {initialData ? "Actualizar Cargo" : "Registrar Cargo"}
      </button>
    </form>
  );
};

export default CargoForm;
