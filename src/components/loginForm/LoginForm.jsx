import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { fetchLogin } from "../../Api";

const LoginForm = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "emredindr",
      password: "asd123",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
       const loginResponse = await fetchLogin(values)
        login(loginResponse.result);
        navigate("/");
      } catch (error) {
        console.log(error);
      }
      login(values);
    },
  });

  return (
    <div style={{ width: "300px", margin: "auto", marginTop: "50px" }}>
      <h2>Login</h2>
      <form onSubmit={formik.handleSubmit}>
        <label style={{ display: "block", marginBottom: "10px" }}>
          Username:
          <input type="text" id="username" name="username" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.username} style={{ width: "100%", padding: "8px" }} />
          {formik.touched.username && formik.errors.username && <div style={{ color: "red" }}>{formik.errors.username}</div>}
        </label>

        <label style={{ display: "block", marginBottom: "10px" }}>
          Password:
          <input type="password" id="password" name="password" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} style={{ width: "100%", padding: "8px" }} />
          {formik.touched.password && formik.errors.password && <div style={{ color: "red" }}>{formik.errors.password}</div>}
        </label>

        <button type="submit" style={{ padding: "10px", backgroundColor: "blue", color: "white", cursor: "pointer" }}>
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
