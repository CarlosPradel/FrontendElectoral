import React from "react";
import type { Jurado } from "../../models/Jurado";
import { FaEdit, FaTrash } from "react-icons/fa";

interface JuradoTableProps {
  jurados: Jurado[];
  onEdit: (jurado: Jurado) => void;
  onDelete: (id: number) => void;
}

const JuradoTable: React.FC<JuradoTableProps> = ({ jurados, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto bg-white rounded shadow mt-4">
      <table className="min-w-full text-sm border">
        <thead className="bg-blue-100">
          <tr>
            <th className="px-4 py-2 text-left">Nombre Completo</th>
            <th className="px-4 py-2 text-left">ID Mesa Electoral</th>
            <th className="px-4 py-2 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {jurados.map((jurado) => (
            <tr key={jurado.id} className="border-t">
              <td className="px-4 py-2">{jurado.nombreCompleto}</td>
              <td className="px-4 py-2">{jurado.mesaElectoralId}</td>
              <td className="px-4 py-2 space-x-2">
                <button
                  onClick={() => onEdit(jurado)}
                  className="text-blue-600 hover:underline inline-flex items-center gap-1"
                >
                  <FaEdit /> Editar
                </button>
                <button
                  onClick={() => onDelete(jurado.id!)}
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

export default JuradoTable;
