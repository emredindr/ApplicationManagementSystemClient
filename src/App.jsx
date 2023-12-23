import axios from "axios";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState({ username: "emredindr", password: "asd123" });

  const signIn = async () => {
    const response = await axios.post("https://localhost:7222/api/Auth/Login", data);
    console.log(response);
  };

  useEffect(() => {
    signIn();
  }, []);

  return (
    <div className="container">
      <h1>Application Management System</h1>
    </div>
  );
}

export default App;
