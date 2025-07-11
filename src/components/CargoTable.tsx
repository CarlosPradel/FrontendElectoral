import React from "react";
import type { Cargo } from "../models/Cargo";
import { FaEdit, FaTrash } from "react-icons/fa";

interface CargoTableProps {
  cargos: Cargo[] | undefined | null;
  onEdit: (cargo: Cargo) => void;
  onDelete: (id: number) => void;
}

const CargoTable: React.FC<CargoTableProps> = ({ cargos, onEdit, onDelete }) => {
  if (!Array.isArray(cargos)) {
    return (
      <div className="text-center text-gray-500 py-4">
        No hay cargos disponibles o los datos no se cargaron correctamente.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-white rounded shadow mt-4">
      <table className="min-w-full text-sm border">
        <thead className="bg-blue-100">
          <tr>
            <th className="px-4 py-2 text-left">Nombre</th>
            <th className="px-4 py-2 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {cargos.map((cargo) => (
            <tr key={cargo.id} className="border-t">
              <td className="px-4 py-2">{cargo.nombre}</td>
              <td className="px-4 py-2 space-x-2">
                <button
                  onClick={() => onEdit(cargo)}
                  className="text-blue-600 hover:underline inline-flex items-center gap-1"
                >
                  <FaEdit /> Editar
                </button>
                <button
                  onClick={() => onDelete(cargo.id!)}
                  className="text-red-600 hover:underline inline-flex items-center gap-1"
                >
                  <FaTrash /> Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CargoTable;
