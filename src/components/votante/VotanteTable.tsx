import React from "react";
import type { Votante } from "../../models/Votante";
import { FaEdit, FaTrash } from "react-icons/fa";

interface VotanteTableProps {
  votantes: Votante[];
  onEdit: (votante: Votante) => void;
  onDelete: (id: number) => void;
}

const VotanteTable: React.FC<VotanteTableProps> = ({ votantes, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto bg-white rounded shadow mt-4">
      <table className="min-w-full text-sm border">
        <thead className="bg-blue-100">
          <tr>
            <th className="px-4 py-2 text-left">Nombre Completo</th>
            <th className="px-4 py-2 text-left">Apellido Paterno</th>
            <th className="px-4 py-2 text-left">Mesa Electoral ID</th>
            <th className="px-4 py-2 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {votantes.map((votante) => (
            <tr key={votante.id} className="border-t">
              <td className="px-4 py-2">{votante.nombreCompleto}</td>
              <td className="px-4 py-2">{votante.apellidoPaterno}</td>
              <td className="px-4 py-2">{votante.mesaElectoralId}</td>
              <td className="px-4 py-2 space-x-2">
                <button
                  onClick={() => onEdit(votante)}
                  className="text-blue-600 hover:underline inline-flex items-center gap-1"
                >
                  <FaEdit /> Editar
                </button>
                <button
                  onClick={() => onDelete(votante.id!)}
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

export default VotanteTable;
