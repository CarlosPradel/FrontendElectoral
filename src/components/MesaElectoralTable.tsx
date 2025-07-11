import React from "react";
import type { MesaElectoral } from "../models/MesaElectoral";
import { FaEdit, FaTrash } from "react-icons/fa";

interface MesaElectoralTableProps {
  mesas: MesaElectoral[];
  onEdit: (mesa: MesaElectoral) => void;
  onDelete: (id: number) => void;
}

const MesaElectoralTable: React.FC<MesaElectoralTableProps> = ({ mesas, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto bg-white rounded shadow mt-4">
      <table className="min-w-full text-sm border">
        <thead className="bg-blue-100">
          <tr>
            <th className="px-4 py-2 text-left">Número</th>
            <th className="px-4 py-2 text-left">Recinto ID</th>
            <th className="px-4 py-2 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {mesas.map((mesa) => (
            <tr key={mesa.id} className="border-t">
              <td className="px-4 py-2">{mesa.numero}</td>
              <td className="px-4 py-2">{mesa.recintoId}</td>
              <td className="px-4 py-2 space-x-2">
                <button
                  onClick={() => onEdit(mesa)}
                  className="text-blue-600 hover:underline inline-flex items-center gap-1"
                >
                  <FaEdit /> Editar
                </button>
                <button
                  onClick={() => onDelete(mesa.id!)}
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

export default MesaElectoralTable;
