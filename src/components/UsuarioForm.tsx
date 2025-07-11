import React, { useState, useEffect } from "react";

interface FormData {
  username: string;
  email: string;
  password?: string;
  role_id: number;
}

interface UsuarioFormProps {
  initialData?: FormData;
  onSubmit: (formData: FormData) => void;
  roles: { id: number; name: string }[];
}

const roleNameMap: Record<string, string> = {
  super_admin: "Super Administrador",
  admin_padron: "Administrador del Padrón",
  admin_elecciones: "Administrador de Elecciones",
  jurado: "Jurado Electoral",
};

const UsuarioForm: React.FC<UsuarioFormProps> = ({ initialData, onSubmit, roles }) => {
  const [form, setForm] = useState<FormData>({
    username: "",
    email: "",
    password: "",
    role_id: roles.length > 0 ? roles[0].id : 1,
  });

  useEffect(() => {
    if (initialData) {
      setForm({ ...initialData });
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "role_id" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-4 rounded shadow-md"
    >
      <input
        type="text"
        name="username"
        placeholder="Usuario"
        value={form.username}
        onChange={handleChange}
        className="w-full px-4 py-2 border rounded"
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Correo"
        value={form.email}
        onChange={handleChange}
        className="w-full px-4 py-2 border rounded"
        required
      />
      {!initialData && (
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={form.password || ""}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
          required
        />
      )}
      <select
        name="role_id"
        value={form.role_id}
        onChange={handleChange}
        className="w-full px-4 py-2 border rounded"
      >
        {roles.map((role) => (
          <option key={role.id} value={role.id}>
            {roleNameMap[role.name] || role.name}
          </option>
        ))}
      </select>

      <div className="flex justify-between gap-2">
        <button
          type="submit"
          className={`flex-1 flex items-center justify-center gap-2 font-semibold py-2 rounded text-white transition ${
            initialData
              ? "bg-yellow-500 hover:bg-yellow-600"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          <i className={`fas ${initialData ? "fa-save" : "fa-user-plus"}`}></i>
          {initialData ? "Actualizar Usuario" : "Crear Usuario"}
        </button>
      </div>
    </form>
  );
};

export default UsuarioForm;
