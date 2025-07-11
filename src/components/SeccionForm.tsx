// ✅ SeccionForm.tsx
import React, { useEffect, useState } from "react";
import type { Seccion } from "../models/Seccion";
import type { CreateSeccion } from "../models/Dtos/SeccionDto";
import {
  GoogleMap,
  Polygon,
  useJsApiLoader,
} from "@react-google-maps/api";

interface SeccionFormProps {
  initialData?: Seccion;
  onSubmit: (data: CreateSeccion) => void;
}

const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: -17.7833,
  lng: -63.1821,
};

const SeccionForm: React.FC<SeccionFormProps> = ({ initialData, onSubmit }) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  const [nombre, setNombre] = useState("");
  const [path, setPath] = useState<google.maps.LatLngLiteral[]>([]);
  const [coordenadas, setCoordenadas] = useState<string>("");

  useEffect(() => {
    if (initialData) {
      setNombre(initialData.nombre);
      setCoordenadas(initialData.coordenadas);

      try {
        const coordsArray = JSON.parse(initialData.coordenadas);
        if (Array.isArray(coordsArray)) {
          setPath(coordsArray);
        }
      } catch (error) {
        console.warn("Coordenadas no en formato JSON válido");
      }
    }
  }, [initialData]);

  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      const lat = e.latLng.lat();
      const lng = e.latLng.lng();
      const newPoint = { lat, lng };

      if (
        path.length > 2 &&
        Math.abs(path[0].lat - lat) < 0.0001 &&
        Math.abs(path[0].lng - lng) < 0.0001
      ) {
        // Cierre del polígono
        setCoordenadas(JSON.stringify([...path, path[0]]));
      } else {
        const updatedPath = [...path, newPoint];
        setPath(updatedPath);
        setCoordenadas(JSON.stringify(updatedPath));
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!nombre || !coordenadas) {
      alert("Por favor ingresa el nombre y traza una sección en el mapa.");
      return;
    }

    onSubmit({ nombre, coordenadas });
  };

  if (!isLoaded) {
    return <div className="text-center text-gray-600">Cargando mapa...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded shadow">
      <input
        type="text"
        placeholder="Nombre de la sección"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        className="w-full px-4 py-2 border rounded"
        required
      />

      <div className="mt-2">
        <label className="block font-semibold text-gray-700 mb-2">
          Traza la sección haciendo clics en el mapa:
        </label>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={12}
          onClick={handleMapClick}
        >
          {path.length > 1 && <Polygon path={path} options={{ fillColor: "#2196f3", strokeColor: "#1e88e5", fillOpacity: 0.4, strokeWeight: 2 }} />}
        </GoogleMap>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        {initialData ? "Actualizar Sección" : "Registrar Sección"}
      </button>
    </form>
  );
};

export default SeccionForm;
