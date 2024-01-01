import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const ProtectedRoute = ({ Component, ...rest }) => {
  const { loggedIn } = useAuth();
  return loggedIn ? <Component /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
