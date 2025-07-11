import React, { useEffect, useState } from "react";
import type { MesaElectoral } from "../models/MesaElectoral";
import type { CreateMesaElectoral } from "../models/Dtos/MesaElectoralDto";

interface MesaElectoralFormProps {
  initialData?: MesaElectoral;
  onSubmit: (data: CreateMesaElectoral) => void;
}

const MesaElectoralForm: React.FC<MesaElectoralFormProps> = ({ initialData, onSubmit }) => {
  const [numero, setNumero] = useState<number>(0);
  const [recintoId, setRecintoId] = useState<number>(0);

  useEffect(() => {
    if (initialData) {
      setNumero(initialData.numero);
      setRecintoId(initialData.recintoId);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!numero || !recintoId) {
      alert("Todos los campos son obligatorios");
      return;
    }

    onSubmit({ numero, recintoId });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded shadow">
      <input
        type="number"
        placeholder="Número de mesa"
        value={numero}
        onChange={(e) => setNumero(parseInt(e.target.value))}
        className="w-full px-4 py-2 border rounded"
        required
      />
      <input
        type="number"
        placeholder="ID del recinto"
        value={recintoId}
        onChange={(e) => setRecintoId(parseInt(e.target.value))}
        className="w-full px-4 py-2 border rounded"
        required
      />
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        {initialData ? "Actualizar Mesa" : "Registrar Mesa"}
      </button>
    </form>
  );
};

export default MesaElectoralForm;
