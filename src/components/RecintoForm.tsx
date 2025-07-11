import React, { useState, useEffect } from "react";

interface RecintoFormProps {
  initialData?: { id: number; nombre: string; direccion: string };
  onSubmit: (formData: FormData) => void;
}

const RecintoForm: React.FC<RecintoFormProps> = ({ initialData, onSubmit }) => {
  const [nombre, setNombre] = useState(initialData?.nombre || "");
  const [direccion, setDireccion] = useState(initialData?.direccion || "");

  useEffect(() => {
    if (initialData) {
      setNombre(initialData.nombre);
      setDireccion(initialData.direccion);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("direccion", direccion);
    onSubmit(formData);
    setNombre("");
    setDireccion("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Nombre del Recinto
        </label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Dirección
        </label>
        <textarea
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
      >
        {initialData ? "Actualizar" : "Registrar"}
      </button>
    </form>
  );
};

export default RecintoForm;
