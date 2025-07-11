import React from "react";
import type { Recinto } from "../../models/Recinto";
import { FaEdit, FaTrash } from "react-icons/fa";

interface RecintoTableProps {
  recintos: Recinto[];
  onEdit: (recinto: Recinto) => void;
  onDelete: (id: number) => void;
}

const RecintoTable: React.FC<RecintoTableProps> = ({ recintos, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto bg-white rounded shadow mt-4">
      <table className="min-w-full text-sm border">
        <thead className="bg-blue-100">
          <tr>
            <th className="px-4 py-2 text-left">Nombre</th>
            <th className="px-4 py-2 text-left">Dirección</th>
            <th className="px-4 py-2 text-left">Coordenadas</th>
            <th className="px-4 py-2 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {recintos.map((recinto) => (
            <tr key={recinto.id} className="border-t">
              <td className="px-4 py-2">{recinto.nombre}</td>
              <td className="px-4 py-2">{recinto.direccion}</td>
              <td className="px-4 py-2">{recinto.coordenadas}</td>
              <td className="px-4 py-2 space-x-2">
                <button
                  onClick={() => onEdit(recinto)}
                  className="text-blue-600 hover:underline inline-flex items-center gap-1"
                >
                  <FaEdit /> Editar
                </button>
                <button
                  onClick={() => onDelete(recinto.id!)}
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

export default RecintoTable;
