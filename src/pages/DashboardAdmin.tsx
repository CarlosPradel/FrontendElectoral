import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/useAuth";
import UsuarioForm from "../components/UsuarioForm";
import {
  getUsuarios,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
} from "../services/userService";

interface Usuario {
  id: number;
  username: string;
  email: string;
  rol: string;
}

interface Rol {
  id: number;
  name: string;
}

interface FormData {
  username: string;
  email: string;
  password?: string;
  role_id: number;
}

const DashboardAdmin = () => {
  const { token } = useAuth();
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [roles, setRoles] = useState<Rol[]>([]);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editUser, setEditUser] = useState<Usuario | null>(null);

  const fetchUsuarios = async () => {
    try {
      const response = await getUsuarios(token!);
      setUsuarios(response.data);
    } catch (err) {
      setError("Error al obtener los usuarios");
      console.error(err);
    }
  };

  const fetchRoles = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/roles/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRoles(response.data);
    } catch (err) {
      console.error("Error al obtener roles", err);
    }
  };

  useEffect(() => {
    fetchUsuarios();
    fetchRoles();
  }, [token]);

  const handleSubmit = async (data: FormData) => {
    try {
      if (editUser) {
        await actualizarUsuario(editUser.id, data, token!);
      } else {
        await crearUsuario(data, token!);
      }
      setShowForm(false);
      setEditUser(null);
      fetchUsuarios();
    } catch (err) {
      console.error("Error al guardar usuario", err);
    }
  };

  const handleEdit = (usuario: Usuario) => {
    setEditUser(usuario);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm("¿Deseas eliminar este usuario?")) {
      try {
        await eliminarUsuario(id, token!);
        fetchUsuarios();
      } catch (err) {
        console.error("Error al eliminar usuario", err);
      }
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-blue-700 mb-4">
        Panel de SuperAdministrador
      </h1>
      <p className="text-gray-700 mb-6">Lista de usuarios registrados:</p>

      {error && <p className="text-red-500">{error}</p>}

      <button
        className="mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition flex items-center gap-2"
        onClick={() => {
          setEditUser(null);
          setShowForm(true);
        }}
      >
        <i className="fas fa-plus"></i> Crear nuevo usuario
      </button>

      <div className="overflow-x-auto rounded-md shadow">
        <table className="min-w-full bg-white border border-gray-200 text-sm">
          <thead className="bg-blue-100 text-blue-900">
            <tr>
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Usuario</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Rol</th>
              <th className="px-4 py-2 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((u) => (
              <tr key={u.id} className="border-t">
                <td className="px-4 py-2">{u.id}</td>
                <td className="px-4 py-2">{u.username}</td>
                <td className="px-4 py-2">{u.email}</td>
                <td className="px-4 py-2">{u.rol}</td>
                <td className="px-4 py-2 space-x-2">
                  <button
                    onClick={() => handleEdit(u)}
                    className="inline-flex items-center gap-2 px-3 py-1 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600"
                  >
                    <i className="fas fa-edit"></i> Editar
                  </button>
                  <button
                    onClick={() => handleDelete(u.id)}
                    className="inline-flex items-center gap-2 px-3 py-1 text-sm font-medium text-white bg-red-500 rounded hover:bg-red-600"
                  >
                    <i className="fas fa-trash"></i> Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
          <div className="bg-white p-6 rounded-md w-full max-w-md shadow-xl">
            <h2 className="text-xl font-semibold text-blue-700 mb-4">
              {editUser ? "Editar Usuario" : "Crear Usuario"}
            </h2>
            <UsuarioForm
              initialData={
                editUser
                  ? {
                      username: editUser.username,
                      email: editUser.email,
                      role_id: roles.find((r) => r.name === editUser.rol)?.id ?? 1,
                    }
                  : undefined
              }
              onSubmit={handleSubmit}
              roles={roles}
            />
            <button
              className="mt-4 text-red-500 hover:underline"
              onClick={() => {
                setShowForm(false);
                setEditUser(null);
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

export default DashboardAdmin;
