import { Routes, Route } from "react-router-dom";
import ApplicationCreate from "./pages/application-create/ApplicationCreate";
import ApplicationStatus from "./pages/application-status/ApplicationStatus";
import Login from "./pages/login/Login";
import AdminDashboard from "./pages/admin/admin-dashboard/AdminDashboard";
import ApplicationSuccess from "./pages/application-succes/ApplicationSuccess";
import ApplicationList from "./pages/admin/application-list/ApplicationList";
import ApplicationDetail from "./pages/admin/application-detail/ApplicationDetail";
import ProtectedRoute from "./hoc/ProtectedRoute";
import Home from "./pages/home/Home";
import NotFound from "./pages/not-found/NotFound";

const Router = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/application-create" element={<ApplicationCreate />} />
    <Route path="/application-status" element={<ApplicationStatus />} />
    <Route path="/login" element={<Login />} />
    <Route path="/admin" element={<ProtectedRoute Component={AdminDashboard} />} />
    <Route path="/admin/application-list" element={<ProtectedRoute Component={ApplicationList} />} />
    <Route path="/admin/application/:id" element={<ProtectedRoute Component={ApplicationDetail} />} />
    <Route path="/application-success/:id" element={<ApplicationSuccess />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default Router;
