import React from "react";
import type { Seccion } from "../models/Seccion";
import { FaEdit, FaTrash } from "react-icons/fa";

interface SeccionTableProps {
  secciones: Seccion[];
  onEdit: (seccion: Seccion) => void;
  onDelete: (id: number) => void;
}

const SeccionTable: React.FC<SeccionTableProps> = ({ secciones, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto bg-white rounded shadow mt-4">
      <table className="min-w-full text-sm border">
        <thead className="bg-blue-100">
          <tr>
            <th className="px-4 py-2 text-left">Nombre</th>
            <th className="px-4 py-2 text-left">Coordenadas</th>
            <th className="px-4 py-2 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {secciones.map((seccion) => (
            <tr key={seccion.id} className="border-t">
              <td className="px-4 py-2">{seccion.nombre}</td>
              <td className="px-4 py-2 text-xs text-gray-600 truncate max-w-xs">
                {seccion.coordenadas.slice(0, 60)}...
              </td>
              <td className="px-4 py-2 space-x-2">
                <button
                  onClick={() => onEdit(seccion)}
                  className="text-blue-600 hover:underline inline-flex items-center gap-1"
                >
                  <FaEdit /> Editar
                </button>
                <button
                  onClick={() => onDelete(seccion.id!)}
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

export default SeccionTable;
