const UnauthorizedPage = () => (
  <div className="flex items-center justify-center h-screen bg-gray-100">
    <div className="text-center">
      <h1 className="text-4xl font-bold text-red-600 mb-4">❌ Acceso denegado</h1>
      <p className="text-gray-700 text-lg">No tienes permisos para acceder a esta página.</p>
    </div>
  </div>
);

export default UnauthorizedPage;
