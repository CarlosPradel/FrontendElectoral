import { useEffect, useState } from "react";
import {
  getRecintos,
  crearRecinto,
  actualizarRecinto,
  eliminarRecinto,
} from "../services/padronService";
import { useAuth } from "../context/useAuth";
import RecintoForm from "../components/RecintoForm";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";

interface Recinto {
  id: number;
  nombre: string;
  direccion: string;
}

const DashboardRecintos = () => {
  const { token } = useAuth();
  const [recintos, setRecintos] = useState<Recinto[]>([]);
  const [editRecinto, setEditRecinto] = useState<Recinto | null>(null);
  const [showForm, setShowForm] = useState(false);

  const fetchRecintos = async () => {
    try {
      const res = await getRecintos(token!);
      setRecintos(res.data);
    } catch (err) {
      console.error("Error al obtener recintos", err);
    }
  };

  useEffect(() => {
    fetchRecintos();
  }, [token]);

  const handleSubmit = async (formData: FormData) => {
    try {
      if (editRecinto) {
        await actualizarRecinto(editRecinto.id, formData, token!);
      } else {
        await crearRecinto(formData, token!);
      }
      fetchRecintos();
      setShowForm(false);
      setEditRecinto(null);
    } catch (err) {
      console.error("Error al guardar recinto", err);
    }
  };

  const handleEdit = (recinto: Recinto) => {
    setEditRecinto(recinto);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm("¿Deseas eliminar este recinto?")) {
      try {
        await eliminarRecinto(id, token!);
        fetchRecintos();
      } catch (err) {
        console.error("Error al eliminar recinto", err);
      }
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-blue-700 mb-4">Gestión de Recintos</h1>
      <p className="mb-4 text-gray-600">Agregue o modifique recintos habilitados para votar.</p>

      <button
        className="mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 flex items-center gap-2"
        onClick={() => {
          setEditRecinto(null);
          setShowForm(true);
        }}
      >
        <FaPlus /> Registrar Recinto
      </button>

      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full text-sm border">
          <thead className="bg-blue-100">
            <tr>
              <th className="px-4 py-2 text-left">Nombre</th>
              <th className="px-4 py-2 text-left">Dirección</th>
              <th className="px-4 py-2 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {recintos.map((r) => (
              <tr key={r.id} className="border-t">
                <td className="px-4 py-2">{r.nombre}</td>
                <td className="px-4 py-2">{r.direccion}</td>
                <td className="px-4 py-2 space-x-2">
                  <button
                    onClick={() => handleEdit(r)}
                    className="text-blue-600 hover:underline inline-flex items-center gap-1"
                  >
                    <FaEdit /> Editar
                  </button>
                  <button
                    onClick={() => handleDelete(r.id)}
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
              {editRecinto ? "Editar Recinto" : "Registrar Recinto"}
            </h2>
            <RecintoForm
              initialData={editRecinto || undefined}
              onSubmit={handleSubmit}
            />
            <button
              className="mt-4 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
              onClick={() => {
                setShowForm(false);
                setEditRecinto(null);
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

export default DashboardRecintos;
