import React, { useEffect, useState } from "react";
import type { Recinto } from "../models/Recinto";
import type { CreateRecinto } from "../models/Dtos/RecintoDto";
import {
  getRecintos,
  createRecinto,
  updateRecinto,
  deleteRecinto,
} from "../services/recintoService";
import RecintoForm from "../components/administraciónElectoral/RecintoFormElectoral";
import RecintoTable from "../components/administraciónElectoral/RecintoTableElectoral";

const DashboardRecintosElectoral: React.FC = () => {
  const [recintos, setRecintos] = useState<Recinto[]>([]);
  const [editingRecinto, setEditingRecinto] = useState<Recinto | undefined>(undefined);

  const fetchRecintos = async () => {
    try {
      const data = await getRecintos();
      setRecintos(data);
    } catch (error) {
      console.error("Error al obtener los recintos:", error);
    }
  };

  useEffect(() => {
    fetchRecintos();
  }, []);

  const handleCreateOrUpdate = async (data: CreateRecinto) => {
    try {
      if (editingRecinto) {
        await updateRecinto(editingRecinto.id, data);
        setEditingRecinto(undefined);
      } else {
        await createRecinto(data);
      }
      fetchRecintos();
    } catch (error) {
      console.error("Error al guardar el recinto:", error);
    }
  };

  const handleEdit = (recinto: Recinto) => {
    setEditingRecinto(recinto);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este recinto?")) {
      try {
        await deleteRecinto(id);
        fetchRecintos();
      } catch (error) {
        console.error("Error al eliminar el recinto:", error);
      }
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Gestión de Recintos</h1>
      <RecintoForm initialData={editingRecinto} onSubmit={handleCreateOrUpdate} />
      <RecintoTable recintos={recintos} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default DashboardRecintosElectoral;
