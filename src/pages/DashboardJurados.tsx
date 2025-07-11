import React, { useEffect, useState } from "react";
import {
  getJurados,
  crearJurado,
  actualizarJurado,
  eliminarJurado,
} from "../services/juradoService";
import type { Jurado } from "../models/Jurado";
import type { CreateJurado } from "../models/Dtos/JuradoDto";
import JuradoForm from "../components/jurado/JuradoForm";
import JuradoTable from "../components/jurado/JuradoTable";

const DashboardJurados: React.FC = () => {
  const [jurados, setJurados] = useState<Jurado[]>([]);
  const [editing, setEditing] = useState<Jurado | null>(null);

  const fetchJurados = async () => {
    try {
      const res = await getJurados();
      setJurados(res.data);
    } catch (error) {
      console.error("Error al cargar jurados:", error);
    }
  };

  useEffect(() => {
    fetchJurados();
  }, []);

  const handleSubmit = async (data: CreateJurado) => {
    try {
      if (editing) {
        await actualizarJurado(editing.id!, data);
        setEditing(null);
      } else {
        await crearJurado(data);
      }
      fetchJurados();
    } catch (error) {
      console.error("Error al guardar jurado:", error);
    }
  };

  const handleEdit = (jurado: Jurado) => {
    setEditing(jurado);
  };

  const handleDelete = async (id: number) => {
    if (confirm("¿Estás seguro de eliminar este jurado?")) {
      try {
        await eliminarJurado(id);
        fetchJurados();
      } catch (error) {
        console.error("Error al eliminar jurado:", error);
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-6">
      <h1 className="text-2xl font-bold mb-4">Gestión de Jurados</h1>
      <JuradoForm initialData={editing || undefined} onSubmit={handleSubmit} />
      <JuradoTable jurados={jurados} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default DashboardJurados;
