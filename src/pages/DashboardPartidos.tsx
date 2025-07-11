import { useEffect, useState } from "react";
import type { Partido } from "../models/Partido";
import type { CreatePartido } from "../models/Dtos/PartidoDto";
import {
  getPartidos,
  crearPartido,
  actualizarPartido,
  eliminarPartido,
} from "../services/partidoService";
import PartidoForm from "../components/PartidoForm";
import PartidoTable from "../components/PartidoTable";
import { FaPlus } from "react-icons/fa";

const DashboardPartidos = () => {
  const [partidos, setPartidos] = useState<Partido[]>([]);
  const [editPartido, setEditPartido] = useState<Partido | null>(null);
  const [showForm, setShowForm] = useState(false);

  const fetchPartidos = async () => {
    try {
      const res = await getPartidos();
      setPartidos(res.data);
    } catch (err) {
      console.error("Error al obtener partidos", err);
    }
  };

  useEffect(() => {
    fetchPartidos();
  }, []);

  const handleSubmit = async (data: CreatePartido) => {
    try {
      if (editPartido) {
        await actualizarPartido(editPartido.id!, data);
      } else {
        await crearPartido(data);
      }
      fetchPartidos();
      setShowForm(false);
      setEditPartido(null);
    } catch (err) {
      console.error("Error al guardar partido", err);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("¿Deseas eliminar este partido?")) {
      try {
        await eliminarPartido(id);
        fetchPartidos();
      } catch (err) {
        console.error("Error al eliminar partido", err);
      }
    }
  };

  const handleEdit = (partido: Partido) => {
    setEditPartido(partido);
    setShowForm(true);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-blue-700 mb-4">
        Gestión de Partidos Políticos
      </h1>
      <p className="mb-4 text-gray-600">
        Registre, edite o elimine partidos políticos para las elecciones.
      </p>

      <div className="flex justify-end mb-4">
        <button
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 flex items-center gap-2"
          onClick={() => {
            setEditPartido(null);
            setShowForm(true);
          }}
        >
          <FaPlus /> Registrar Partido
        </button>
      </div>

      <PartidoTable partidos={partidos} onEdit={handleEdit} onDelete={handleDelete} />

      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
          <div className="bg-white p-6 rounded-md w-full max-w-md shadow-xl">
            <h2 className="text-xl font-semibold text-blue-700 mb-4">
              {editPartido ? "Editar Partido" : "Registrar Partido"}
            </h2>
            <PartidoForm
              initialData={editPartido || undefined}
              onSubmit={handleSubmit}
            />
            <button
              className="mt-4 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
              onClick={() => {
                setShowForm(false);
                setEditPartido(null);
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

export default DashboardPartidos;
