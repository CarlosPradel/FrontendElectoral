import React, { useEffect, useState } from "react";
import CargoForm from "../components/CargoForm";
import CargoTable from "../components/CargoTable";
import type { Cargo } from "../models/Cargo";
import type { CreateCargo } from "../models/Dtos/CargoDto";
import {
  getCargos,
  createCargo,
  updateCargo,
  deleteCargo,
} from "../services/cargoService";

const DashboardCargos: React.FC = () => {
  const [cargos, setCargos] = useState<Cargo[]>([]);
  const [selectedCargo, setSelectedCargo] = useState<Cargo | null>(null);

  const fetchCargos = async () => {
    try {
      const data = await getCargos();
      setCargos(data); // ✅ aseguramos que sea un array
    } catch (error) {
      console.error("Error al obtener los cargos:", error);
    }
  };

  useEffect(() => {
    fetchCargos();
  }, []);

  const handleSubmit = async (data: CreateCargo) => {
    try {
      if (selectedCargo) {
        await updateCargo(selectedCargo.id!, data);
        setSelectedCargo(null);
      } else {
        await createCargo(data);
      }
      await fetchCargos();
    } catch (error) {
      console.error("Error al guardar el cargo:", error);
    }
  };

  const handleEdit = (cargo: Cargo) => {
    setSelectedCargo(cargo);
  };

  const handleDelete = async (id: number) => {
    if (confirm("¿Estás seguro de eliminar este cargo?")) {
      try {
        await deleteCargo(id);
        await fetchCargos();
      } catch (error) {
        console.error("Error al eliminar el cargo:", error);
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Gestión de Cargos</h1>
      <CargoForm initialData={selectedCargo ?? undefined} onSubmit={handleSubmit} />
      <CargoTable cargos={cargos} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default DashboardCargos;
