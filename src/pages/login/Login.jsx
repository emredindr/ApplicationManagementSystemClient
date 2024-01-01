import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/api";
import { Form, Input, Button, Typography, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
const { Title } = Typography;
import withLoading from "../../hoc/withLoading";

const Login = ({ loading, setLoading }) => {
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "kodluyoruz",
      password: "bootcamp109",
    },
    onSubmit: async (values) => {
      console.log(values);
      try {
        setLoading(true);
        const loginResponse = await login(values);
        signIn(loginResponse?.result);
        navigate("/admin");
        message.success("Login successful");
      } catch (error) {
        console.log(error);
        message.error(error?.response?.data?.responseException?.exceptionMessage);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="login-container">
      <div className="login-form-container">
        <Title level={2}>Sign in</Title>
        <Form onFinish={formik.handleSubmit} initialValues={formik.initialValues}>
          <Form.Item label="Username" help={formik.touched.username && formik.errors.username} name="username" rules={[{ required: true, message: "Please enter your username" }]}>
            <Input prefix={<UserOutlined />} placeholder="Username" size="middle" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.username} />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Please enter your password" },
              {
                min: 8,
                message: "Must be at least 8 characters",
              },
            ]}
          >
            <Input.Password prefix={<LockOutlined />} size="middle" placeholder="Password" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} />
          </Form.Item>

          <Form.Item style={{ textAlign: "end" }}>
            <Button type="primary" htmlType="submit" size="middle" loading={loading}>
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default withLoading(Login);
