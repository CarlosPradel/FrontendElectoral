import React, { useEffect, useState } from "react";
import { getElecciones, crearEleccion, actualizarEleccion, eliminarEleccion  } from "../services/eleccionService";
import type { Eleccion } from "../models/Eleccion";
import type { CreateEleccion } from "../models/Dtos/EleccionDto";
import EleccionForm from "../components/EleccionForm";
import EleccionTable from "../components/EleccionTable";

const DashboardElecciones: React.FC = () => {
  const [elecciones, setElecciones] = useState<Eleccion[]>([]);
  const [editing, setEditing] = useState<Eleccion | null>(null);

  const cargarElecciones = async () => {
    try {
      const res = await getElecciones();
      setElecciones(res.data);
    } catch (error) {
      console.error("Error al cargar elecciones:", error);
    }
  };

  useEffect(() => {
    cargarElecciones();
  }, []);

  const handleCreateOrUpdate = async (data: CreateEleccion) => {
    try {
      if (editing) {
        await actualizarEleccion(editing.id, data);
      } else {
        await crearEleccion(data);
      }
      setEditing(null);
      await cargarElecciones();
    } catch (error) {
      console.error("Error al guardar la elección:", error);
    }
  };

  const handleEdit = (eleccion: Eleccion) => {
    setEditing(eleccion);
  };

  const handleDelete = async (id: number) => {
    if (confirm("¿Estás seguro de eliminar esta elección?")) {
      try {
        await eliminarEleccion(id);
        await cargarElecciones();
      } catch (error) {
        console.error("Error al eliminar la elección:", error);
      }
    }
  };

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold text-gray-700">Gestión de Elecciones</h1>
      <EleccionForm initialData={editing ?? undefined} onSubmit={handleCreateOrUpdate} />
      <EleccionTable elecciones={elecciones} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default DashboardElecciones;
