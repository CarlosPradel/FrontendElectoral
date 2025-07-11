import React, { useEffect, useState } from "react";
import {
  getCandidaturas,
  createCandidatura,
  updateCandidatura,
  deleteCandidatura,
} from "../services/candidaturaService";
import type {
  CandidaturaDto,
  CreateCandidatura,
} from "../models/Dtos/CantidaturaDto";
import CandidaturaForm from "../components/candidatura/CandidaturaForm";
import CandidaturaTable from "../components/candidatura/CandidaturaTable";

const DashboardCandidaturas: React.FC = () => {
  const [candidaturas, setCandidaturas] = useState<CandidaturaDto[]>([]);
  const [editing, setEditing] = useState<CandidaturaDto | null>(null);

  const cargarDatos = async () => {
    try {
      const data = await getCandidaturas();
      setCandidaturas(data);

    } catch (error) {
      console.error("Error al cargar candidaturas:", error);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const handleCreate = async (data: CreateCandidatura) => {
    try {
      await createCandidatura(data);
      await cargarDatos();
    } catch (error) {
      console.error("Error al crear candidatura:", error);
    }
  };

  const handleUpdate = async (data: CreateCandidatura) => {
    if (!editing) return;
    try {
      await updateCandidatura(editing.id, data);
      setEditing(null);
      await cargarDatos();
    } catch (error) {
      console.error("Error al actualizar candidatura:", error);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("¿Estás seguro de eliminar esta candidatura?")) {
      try {
        await deleteCandidatura(id);
        await cargarDatos();
      } catch (error) {
        console.error("Error al eliminar candidatura:", error);
      }
    }
  };

  const handleSubmit = (data: CreateCandidatura) => {
    if (editing) {
      handleUpdate(data);
    } else {
      handleCreate(data);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          {editing ? "Editar Candidatura" : "Registrar Candidatura"}
        </h1>
        {editing && (
          <button
            onClick={() => setEditing(null)}
            className="text-sm text-red-500 underline"
          >
            Cancelar edición
          </button>
        )}
      </div>

      {/* Como el formulario requiere cargoId y partidoId, no pasamos directamente editing (que es un DTO) */}
      <CandidaturaForm onSubmit={handleSubmit} />

      <hr />

      <h2 className="text-xl font-semibold">Lista de Candidaturas</h2>
      <CandidaturaTable
        data={candidaturas}
        onEdit={(c) => setEditing(c)}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default DashboardCandidaturas;
