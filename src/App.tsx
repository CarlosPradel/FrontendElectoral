import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/users/LoginPage";
import DashboardPadron from "./pages/DashboardPadron";
import DashboardAdmin from "./pages/DashboardAdmin";
import DashboardRecintos from "./pages/DashboardRecintos";
import ConsultaPublica from "./pages/ConsultaPublica";
import UnauthorizedPage from "./pages/UnauthorizedPage";
import PrivateRoute from "./routes/PrivateRoute";
import DashboardPartidos from "./pages/DashboardPartidos";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/consulta" element={<ConsultaPublica />} />
      <Route path="/partido" element={<DashboardPartidos />} />

      
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
