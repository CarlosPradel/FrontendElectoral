import React from "react";
import type { Partido } from "../models/Partido";
import { FaEdit, FaTrash } from "react-icons/fa";

interface PartidoTableProps {
  partidos: Partido[];
  onEdit: (partido: Partido) => void;
  onDelete: (id: number) => void;
}

const PartidoTable: React.FC<PartidoTableProps> = ({ partidos, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto bg-white rounded shadow mt-4">
      <table className="min-w-full text-sm border">
        <thead className="bg-blue-100">
          <tr>
            <th className="px-4 py-2 text-left">Nombre</th>
            <th className="px-4 py-2 text-left">Sigla</th>
            <th className="px-4 py-2 text-left">Color</th>
            <th className="px-4 py-2 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {partidos.map((partido) => (
            <tr key={partido.id} className="border-t">
              <td className="px-4 py-2">{partido.nombre}</td>
              <td className="px-4 py-2">{partido.sigla}</td>
              <td className="px-4 py-2">
                <div className="w-6 h-6 rounded-full border" style={{ backgroundColor: partido.color }} />
              </td>
              <td className="px-4 py-2 space-x-2">
                <button
                  onClick={() => onEdit(partido)}
                  className="text-blue-600 hover:underline inline-flex items-center gap-1"
                >
                  <FaEdit /> Editar
                </button>
                <button
                  onClick={() => onDelete(partido.id!)}
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

export default PartidoTable;
