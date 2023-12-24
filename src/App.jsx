import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import LoginForm from "./components/loginForm/LoginForm";
import Home from "./pages/Home";

function App() {
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </div>
  );
}

export default App;
