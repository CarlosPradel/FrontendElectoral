import React, { useEffect, useState } from "react";
import MesaElectoralForm from "../components/MesaElectoralForm";
import MesaElectoralTable from "../components/MesaElectoralTable";
import {
  getMesasElectorales,
  getMesaElectoral,
  crearMesaElectoral,
  actualizarMesaElectoral,
  eliminarMesaElectoral,
} from "../services/mesaElectoralService";
import type { MesaElectoral } from "../models/MesaElectoral";
import type { CreateMesaElectoral } from "../models/Dtos/MesaElectoralDto";

const DashboardMesaElectoral: React.FC = () => {
  const [mesas, setMesas] = useState<MesaElectoral[]>([]);
  const [editing, setEditing] = useState<MesaElectoral | null>(null);

  const cargarMesas = async () => {
    try {
      const res = await getMesasElectorales();
      setMesas(res.data);
    } catch (error) {
      console.error("Error al cargar mesas:", error);
    }
  };

  useEffect(() => {
    cargarMesas();
  }, []);

  const handleCreateOrUpdate = async (data: CreateMesaElectoral) => {
    try {
      if (editing) {
        await actualizarMesaElectoral(editing.id!, data);
        setEditing(null);
      } else {
        await crearMesaElectoral(data);
      }
      cargarMesas();
    } catch (error) {
      console.error("Error al guardar la mesa:", error);
    }
  };

  const handleEdit = async (mesa: MesaElectoral) => {
    try {
      const res = await getMesaElectoral(mesa.id!);
      setEditing(res.data);
    } catch (error) {
      console.error("Error al obtener la mesa:", error);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("¿Estás seguro de eliminar esta mesa electoral?")) {
      try {
        await eliminarMesaElectoral(id);
        cargarMesas();
      } catch (error) {
        console.error("Error al eliminar mesa:", error);
      }
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Administración de Mesas Electorales</h1>
      <MesaElectoralForm initialData={editing!} onSubmit={handleCreateOrUpdate} />
      <MesaElectoralTable mesas={mesas} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default DashboardMesaElectoral;
