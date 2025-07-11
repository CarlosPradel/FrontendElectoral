import React, { useEffect, useState } from "react";
import type { Seccion } from "../models/Seccion";
import type { CreateSeccion } from "../models/Dtos/SeccionDto";
import {
  getSecciones,
  crearSeccion,
  actualizarSeccion,
  eliminarSeccion,
} from "../services/seccionService";
import SeccionForm from "../components/SeccionForm";
import SeccionTable from "../components/SeccionTable";
import { FaPlus } from "react-icons/fa";

const DashboardSecciones = () => {
  const [secciones, setSecciones] = useState<Seccion[]>([]);
  const [editSeccion, setEditSeccion] = useState<Seccion | null>(null);
  const [showForm, setShowForm] = useState(false);

  const fetchSecciones = async () => {
    try {
      const res = await getSecciones();
      setSecciones(res.data);
    } catch (err) {
      console.error("Error al obtener secciones", err);
    }
  };

  useEffect(() => {
    fetchSecciones();
  }, []);

  const handleSubmit = async (data: CreateSeccion) => {
    try {
      if (editSeccion) {
        await actualizarSeccion(editSeccion.id!, data);
      } else {
        await crearSeccion(data);
      }
      fetchSecciones();
      setShowForm(false);
      setEditSeccion(null);
    } catch (err) {
      console.error("Error al guardar sección", err);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("¿Deseas eliminar esta sección?")) {
      try {
        await eliminarSeccion(id);
        fetchSecciones();
      } catch (err) {
        console.error("Error al eliminar sección", err);
      }
    }
  };

  const handleEdit = (seccion: Seccion) => {
    setEditSeccion(seccion);
    setShowForm(true);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-blue-700 mb-4">
        Gestión de Secciones Electorales
      </h1>
      <p className="mb-4 text-gray-600">
        Dibuja y gestiona las secciones territoriales en el mapa.
      </p>

      <div className="flex justify-end mb-4">
        <button
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 flex items-center gap-2"
          onClick={() => {
            setEditSeccion(null);
            setShowForm(true);
          }}
        >
          <FaPlus /> Registrar Sección
        </button>
      </div>

      <SeccionTable
        secciones={secciones}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
          <div className="bg-white p-6 rounded-md w-full max-w-2xl shadow-xl">
            <h2 className="text-xl font-semibold text-blue-700 mb-4">
              {editSeccion ? "Editar Sección" : "Registrar Sección"}
            </h2>
            <SeccionForm
              initialData={editSeccion || undefined}
              onSubmit={handleSubmit}
            />
            <button
              className="mt-4 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
              onClick={() => {
                setShowForm(false);
                setEditSeccion(null);
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

export default DashboardSecciones;
