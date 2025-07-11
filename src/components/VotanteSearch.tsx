import React, { useState } from "react";
import axios from "axios";

interface Votante {
  ci: string;
  nombre_completo: string;
  recinto: {
    nombre: string;
  };
}

const VotanteSearch = () => {
  const [ci, setCi] = useState("");
  const [votante, setVotante] = useState<Votante | null>(null);
  const [error, setError] = useState("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setVotante(null);

    try {
      const res = await axios.get<Votante>(`http://127.0.0.1:8001/api/verificar/${ci}/`);
      setVotante(res.data);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const message = err.response?.data?.detail ?? "No se encontró un votante con ese CI.";
        setError(message);
        console.error("Error al consultar CI:", err);
      } else {
        setError("Ocurrió un error inesperado.");
        console.error("Error desconocido:", err);
      }
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4 text-center text-blue-700">
        Verificación de Padrón Electoral
      </h2>

      <form onSubmit={handleSearch} className="space-y-4">
        <input
          type="text"
          value={ci}
          onChange={(e) => setCi(e.target.value)}
          placeholder="Ingrese su número de CI"
          className="w-full border border-gray-300 p-2 rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Consultar
        </button>
      </form>

      {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

      {votante && (
        <div className="mt-6 border-t pt-4">
          <p><strong>CI:</strong> {votante.ci}</p>
          <p><strong>Nombre:</strong> {votante.nombre_completo}</p>
          <p><strong>Recinto:</strong> {votante.recinto?.nombre}</p>
        </div>
      )}
    </div>
  );
};

export default VotanteSearch;
