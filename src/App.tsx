import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/users/LoginPage";
import DashboardPadron from "./pages/DashboardPadron";
import DashboardAdmin from "./pages/DashboardAdmin";
import DashboardRecintos from "./pages/DashboardRecintos";
import ConsultaPublica from "./pages/ConsultaPublica";
import UnauthorizedPage from "./pages/UnauthorizedPage";
import PrivateRoute from "./routes/PrivateRoute";
import DashboardPartidos from "./pages/DashboardPartidos";
import DashboardSecciones from "./pages/DashboardSecciones";
import DashboardCargos from "./pages/DashboardCargos";
import DashboardRecintosElectoral from "./pages/DashboardRecintosElectoral";
import DashboardElecciones from "./pages/DashboardElecciones";
import DashboardMesaElectoral from "./pages/DashboardMesaElectoral";
import DashboardJurados from "./pages/DashboardJurados";
import DashboardVotantes from "./pages/DashboardVotantes";
import DashboardCandidaturas from "./pages/DashboardCandidaturas";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/consulta" element={<ConsultaPublica />} />
      {/* rutas sistema administracion publicas */}
      <Route path="/partido" element={<DashboardPartidos />} />
      <Route path="/secciones" element={<DashboardSecciones />} />
      <Route path="/cargo" element={<DashboardCargos />} />
      <Route path="/admin/recintos" element={<DashboardRecintosElectoral />} />
      <Route path="/eleccion" element={< DashboardElecciones />} />
      <Route path="/mesa-electoral" element={< DashboardMesaElectoral />} />
      <Route path="/jurado" element={< DashboardJurados />} />
      <Route path="/votante" element={< DashboardVotantes />} />
      <Route path="/candidatura" element={< DashboardCandidaturas />} />

      <Route path="/unauthorized" element={<UnauthorizedPage />} />

      <Route
        path="/padron"
        element={
          <PrivateRoute allowedRoles={["admin_padron"]}>
            <DashboardPadron />
          </PrivateRoute>
        }
      />

      <Route
        path="/recintos"
        element={
          <PrivateRoute allowedRoles={["admin_padron"]}>
            <DashboardRecintos />
          </PrivateRoute>
        }
      />

      <Route
        path="/admin"
        element={
          <PrivateRoute allowedRoles={["super_admin"]}>
            <DashboardAdmin />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;
