import React from "react";
import type { CandidaturaDto } from "../../models/Dtos/CantidaturaDto";

interface CandidaturaTableProps {
  data: CandidaturaDto[];
  onEdit: (candidatura: CandidaturaDto) => void;
  onDelete: (id: number) => void;
}

const CandidaturaTable: React.FC<CandidaturaTableProps> = ({ data, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto bg-white rounded shadow">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Nombre Candidato</th>
            <th className="px-4 py-2">Cargo</th>
            <th className="px-4 py-2">Partido</th>
            <th className="px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((candidatura) => (
            <tr key={candidatura.id} className="border-b hover:bg-gray-50">
              <td className="px-4 py-2">{candidatura.id}</td>
              <td className="px-4 py-2">{candidatura.nombreCandidato}</td>
              <td className="px-4 py-2">{candidatura.nombreCargo}</td>
              <td className="px-4 py-2">{candidatura.nombrePartido}</td>
              <td className="px-4 py-2 space-x-2">
                <button
                  onClick={() => onEdit(candidatura)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                >
                  Editar
                </button>
                <button
                  onClick={() => onDelete(candidatura.id)}
                  className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CandidaturaTable;
