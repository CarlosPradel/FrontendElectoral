import React, { useEffect, useState } from "react";
import type { Jurado } from "../../models/Jurado";
import type { CreateJurado } from "../../models/Dtos/JuradoDto";

interface JuradoFormProps {
  initialData?: Jurado;
  onSubmit: (data: CreateJurado) => void;
}

const JuradoForm: React.FC<JuradoFormProps> = ({ initialData, onSubmit }) => {
  const [nombreCompleto, setNombreCompleto] = useState("");
  const [mesaElectoralId, setMesaElectoralId] = useState<number>(0);

  useEffect(() => {
    if (initialData) {
      setNombreCompleto(initialData.nombreCompleto);
      setMesaElectoralId(initialData.mesaElectoralId);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!nombreCompleto.trim() || mesaElectoralId <= 0) {
      alert("Completa correctamente los campos.");
      return;
    }

    onSubmit({ nombreCompleto, mesaElectoralId });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-4 rounded shadow"
    >
      <input
        type="text"
        placeholder="Nombre completo del jurado"
        value={nombreCompleto}
        onChange={(e) => setNombreCompleto(e.target.value)}
        className="w-full px-4 py-2 border rounded"
        required
      />

      <input
        type="number"
        placeholder="ID de mesa electoral"
        value={mesaElectoralId}
        onChange={(e) => setMesaElectoralId(Number(e.target.value))}
        className="w-full px-4 py-2 border rounded"
        required
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        {initialData ? "Actualizar Jurado" : "Registrar Jurado"}
      </button>
    </form>
  );
};

export default JuradoForm;
