import React from "react";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import notFound from "../../assets/notFound.json";
import { useAuth } from "../../contexts/AuthContext";

const NotFound = () => {
  const { loggedIn } = useAuth();

  const navigate = useNavigate();

  const goDashboard = () => {
    if (loggedIn) {
      navigate("/admin");
    } else {
      navigate("/");
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", flexDirection: "column", alignItems: "center", height: "400px" }}>
      <div style={{ maxWidth: "400px", maxHeight: "400px" }}>
        <Lottie animationData={notFound} />
      </div>
      <button type="button" onClick={goDashboard} style={{ cursor: "pointer", textDecoration: "underline", color: "#007BFF" }}>
        <h3> GO BACK TO HOME</h3>
      </button>
    </div>
  );
};

export default NotFound;
