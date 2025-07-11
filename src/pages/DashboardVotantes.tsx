import React, { useEffect, useState } from "react";
import { getVotantes, crearVotante, actualizarVotante, eliminarVotante } from "../services/votanteService";
import type { Votante } from "../models/Votante";
import type { CreateVotante } from "../models/Dtos/VotanteDto";
import VotanteForm from "../components/votante/VotanteForm";
import VotanteTable from "../components/votante/VotanteTable";

const DashboardVotantes: React.FC = () => {
  const [votantes, setVotantes] = useState<Votante[]>([]);
  const [editingVotante, setEditingVotante] = useState<Votante | undefined>(undefined);

  const cargarVotantes = async () => {
    try {
      const res = await getVotantes();
      setVotantes(res.data || res); // soporte para ambas estructuras
    } catch (error) {
      console.error("Error al cargar votantes:", error);
    }
  };

  useEffect(() => {
    cargarVotantes();
  }, []);

  const handleSubmit = async (data: CreateVotante) => {
    try {
      if (editingVotante) {
        await actualizarVotante(editingVotante.id!, data);
        setEditingVotante(undefined);
      } else {
        await crearVotante(data);
      }
      cargarVotantes();
    } catch (error) {
      console.error("Error al guardar votante:", error);
    }
  };

  const handleEdit = (votante: Votante) => {
    setEditingVotante(votante);
  };

  const handleDelete = async (id: number) => {
    if (confirm("¿Estás seguro de eliminar este votante?")) {
      try {
        await eliminarVotante(id);
        cargarVotantes();
      } catch (error) {
        console.error("Error al eliminar votante:", error);
      }
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">
        {editingVotante ? "Editar Votante" : "Registrar Votante"}
      </h2>

      <VotanteForm initialData={editingVotante} onSubmit={handleSubmit} />

      <h3 className="text-lg font-semibold mt-8 mb-2">Lista de Votantes</h3>

      <VotanteTable votantes={votantes} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default DashboardVotantes;
