import React, { useEffect, useState } from "react";
import VotanteForm from "../components/VotanteForm";
import { getRecintos, getVotantes, crearVotante, actualizarVotante, eliminarVotante } from "../services/padronService";
import { useAuth } from "../context/useAuth";
import { FaPlus, FaEdit, FaTrash, FaSchool } from "react-icons/fa";

interface Votante {
  id: string;
  ci: string;
  nombre_completo: string;
  direccion: string;
  recinto: { id: number; nombre: string };
}

interface Recinto {
  id: number;
  nombre: string;
}

const DashboardPadron = () => {
  const { token } = useAuth();
  const [votantes, setVotantes] = useState<Votante[]>([]);
  const [recintos, setRecintos] = useState<Recinto[]>([]);
  const [editVotante, setEditVotante] = useState<Votante | null>(null);
  const [showForm, setShowForm] = useState(false);

  const fetchVotantes = async () => {
    try {
      const res = await getVotantes(token!);
      setVotantes(res.data);
    } catch (err) {
      console.error("Error al obtener votantes", err);
    }
  };

  const fetchRecintos = async () => {
    try {
      const res = await getRecintos(token!);
      setRecintos(res.data);
    } catch (err) {
      console.error("Error al obtener recintos", err);
    }
  };

  useEffect(() => {
    fetchVotantes();
    fetchRecintos();
  }, [token]);

  const handleSubmit = async (formData: FormData) => {
    try {
      if (editVotante) {
        await actualizarVotante(editVotante.id, formData, token!);
      } else {
        await crearVotante(formData, token!);
      }
      fetchVotantes();
      setShowForm(false);
      setEditVotante(null);
    } catch (err) {
      console.error("Error al guardar votante", err);
    }
  };

  const handleEdit = (votante: Votante) => {
    setEditVotante(votante);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("¿Deseas eliminar este votante?")) {
      try {
        await eliminarVotante(id, token!);
        fetchVotantes();
      } catch (err) {
        console.error("Error al eliminar votante", err);
      }
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-blue-700 mb-4">
        Administración de Votantes
      </h1>
      <p className="mb-4 text-gray-600">Registre y gestione los datos del padrón electoral.</p>

      <div className="flex justify-between mb-4">
        <button
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 flex items-center gap-2"
          onClick={() => {
            setEditVotante(null);
            setShowForm(true);
          }}
        >
          <FaPlus /> Registrar Votante
        </button>

        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-2"
          onClick={() => window.location.href = "/recintos"}
        >
          <FaSchool /> Gestionar Recintos
        </button>
      </div>

      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full text-sm border">
          <thead className="bg-blue-100">
            <tr>
              <th className="px-4 py-2 text-left">CI</th>
              <th className="px-4 py-2 text-left">Nombre</th>
              <th className="px-4 py-2 text-left">Dirección</th>
              <th className="px-4 py-2 text-left">Recinto</th>
              <th className="px-4 py-2 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {votantes.map((v) => (
              <tr key={v.id} className="border-t">
                <td className="px-4 py-2">{v.ci}</td>
                <td className="px-4 py-2">{v.nombre_completo}</td>
                <td className="px-4 py-2">{v.direccion}</td>
                <td className="px-4 py-2">{v.recinto?.nombre}</td>
                <td className="px-4 py-2 space-x-2">
                  <button
                    onClick={() => handleEdit(v)}
                    className="text-blue-600 hover:underline inline-flex items-center gap-1"
                  >
                    <FaEdit /> Editar
                  </button>
                  <button
                    onClick={() => handleDelete(v.id)}
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

      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
          <div className="bg-white p-6 rounded-md w-full max-w-lg shadow-xl">
            <h2 className="text-xl font-semibold text-blue-700 mb-4">
              {editVotante ? "Editar Votante" : "Registrar Votante"}
            </h2>
            <VotanteForm
              initialData={editVotante || undefined}
              onSubmit={handleSubmit}
              recintos={recintos}
            />
            <button
              className="mt-4 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
              onClick={() => {
                setShowForm(false);
                setEditVotante(null);
              }}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPadron;
