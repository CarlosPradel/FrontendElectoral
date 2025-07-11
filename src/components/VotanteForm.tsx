import React, { useEffect, useState } from "react";

interface VotanteFormProps {
  initialData?: {
    id?: string;
    ci: string;
    nombre_completo: string;
    direccion: string;
    recinto?: {
      id: number;
      nombre: string;
    };
  };
  onSubmit: (formData: FormData) => void;
  recintos: { id: number; nombre: string }[];
}

const VotanteForm: React.FC<VotanteFormProps> = ({
  initialData,
  onSubmit,
  recintos,
}) => {
  const [ci, setCi] = useState("");
  const [nombreCompleto, setNombreCompleto] = useState("");
  const [direccion, setDireccion] = useState("");
  const [recintoId, setRecintoId] = useState<number | "">("");

  const [fotoAnverso, setFotoAnverso] = useState<File | null>(null);
  const [fotoReverso, setFotoReverso] = useState<File | null>(null);
  const [fotoRostro, setFotoRostro] = useState<File | null>(null);

  const [previewAnverso, setPreviewAnverso] = useState<string>("");
  const [previewReverso, setPreviewReverso] = useState<string>("");
  const [previewRostro, setPreviewRostro] = useState<string>("");

  useEffect(() => {
    if (initialData) {
      setCi(initialData.ci || "");
      setNombreCompleto(initialData.nombre_completo || "");
      setDireccion(initialData.direccion || "");
      setRecintoId(initialData.recinto?.id || "");
    }
  }, [initialData]);

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFile: React.Dispatch<React.SetStateAction<File | null>>,
    setPreview: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("ci", ci);
    formData.append("nombre_completo", nombreCompleto);
    formData.append("direccion", direccion);
    formData.append("recinto_id", recintoId.toString());

    if (fotoAnverso) formData.append("foto_anverso", fotoAnverso);
    if (fotoReverso) formData.append("foto_reverso", fotoReverso);
    if (fotoRostro) formData.append("foto_rostro", fotoRostro);

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white rounded shadow">
      <input
        type="text"
        placeholder="CI"
        value={ci}
        onChange={(e) => setCi(e.target.value)}
        className="w-full px-4 py-2 border rounded"
        required
      />

      <input
        type="text"
        placeholder="Nombre completo"
        value={nombreCompleto}
        onChange={(e) => setNombreCompleto(e.target.value)}
        className="w-full px-4 py-2 border rounded"
        required
      />

      <textarea
        placeholder="Dirección"
        value={direccion}
        onChange={(e) => setDireccion(e.target.value)}
        className="w-full px-4 py-2 border rounded"
        required
      />

      <select
        value={recintoId}
        onChange={(e) => setRecintoId(Number(e.target.value))}
        className="w-full px-4 py-2 border rounded"
        required
      >
        <option value="">Seleccionar recinto</option>
        {recintos.map((r) => (
          <option key={r.id} value={r.id}>
            {r.nombre}
          </option>
        ))}
      </select>

      {/* Fotos */}
      <div className="flex gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Foto Anverso</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageChange(e, setFotoAnverso, setPreviewAnverso)}
            className="block w-full text-sm"
          />
          {previewAnverso && <img src={previewAnverso} className="w-20 mt-2" />}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Foto Reverso</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageChange(e, setFotoReverso, setPreviewReverso)}
            className="block w-full text-sm"
          />
          {previewReverso && <img src={previewReverso} className="w-20 mt-2" />}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Foto Rostro</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageChange(e, setFotoRostro, setPreviewRostro)}
            className="block w-full text-sm"
          />
          {previewRostro && <img src={previewRostro} className="w-20 mt-2" />}
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        {initialData ? "Actualizar Votante" : "Registrar Votante"}
      </button>
    </form>
  );
};

export default VotanteForm;
