import React from "react";
import type { Eleccion } from "../models/Eleccion";
import { FaEdit, FaTrash } from "react-icons/fa";

interface EleccionTableProps {
  elecciones: Eleccion[];
  onEdit: (eleccion: Eleccion) => void;
  onDelete: (id: number) => void;
}

const EleccionTable: React.FC<EleccionTableProps> = ({ elecciones, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto bg-white rounded shadow mt-4">
      <table className="min-w-full text-sm border">
        <thead className="bg-blue-100">
          <tr>
            <th className="px-4 py-2 text-left">Tipo</th>
            <th className="px-4 py-2 text-left">Fecha</th>
            <th className="px-4 py-2 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {elecciones.map((eleccion) => (
            <tr key={eleccion.id} className="border-t">
              <td className="px-4 py-2">{eleccion.tipo}</td>
              <td className="px-4 py-2">{new Date(eleccion.fecha).toLocaleDateString()}</td>
              <td className="px-4 py-2 space-x-2">
                <button
                  onClick={() => onEdit(eleccion)}
                  className="text-blue-600 hover:underline inline-flex items-center gap-1"
                >
                  <FaEdit /> Editar
                </button>
                <button
                  onClick={() => onDelete(eleccion.id)}
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

export default EleccionTable;
