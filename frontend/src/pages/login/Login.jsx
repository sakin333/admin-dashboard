import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Checkbox,
  Typography,
  Card,
  notification,
} from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { snackbar } from "../../utils/snackbar";
import axios from "axios";
import { BASE_URL } from "../../constants";

const { Title } = Typography;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [api, contextHolder] = notification.useNotification();

  const navigate = useNavigate();

  const handleLogin = () => {
    if (!username && !password) {
      snackbar(api, "error", "Enter all required fields");
      return false;
    }
    const userData = {
      username,
      password,
    };
    axios
      .post(`${BASE_URL}/api/users/login`, userData)
      .then((response) => {
        const result = response.data.data;

        const USERDETAILS = {
          id: result._id,
          username: result.username,
          email: result.email,
        };
        localStorage.setItem("user", JSON.stringify(USERDETAILS));
        navigate("/dashboard");

        snackbar(api, "success", `Welcome ${result.username}`);
      })
      .catch(({ response }) => {
        const errorMsg = response.data.error;
        snackbar(api, "error", errorMsg);
      });
  };

  return (
    <>
      {contextHolder}
      <div className="login-form-container">
        <Card className="login-form-card">
          <Title level={2} className="login-form-title">
            Login
          </Title>
          <Form
            layout="vertical"
            className="login-form"
            initialValues={{
              remember: true,
            }}
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your username",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                size="large"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Item>

            <Form.Item
              label="Password"
              name="passoword"
              rules={[
                {
                  required: true,
                  message: "Please input your password",
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                size="large"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Item>

            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                >
                  Remember me
                </Checkbox>
              </Form.Item>

              <Link
                to="/forgotPassword"
                className="login-form-forgot-passsword"
              >
                Forgot Password
              </Link>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                size="large"
                onClick={handleLogin}
              >
                Login
              </Button>
              <span>Don't have an account? </span>
              <Link to="/register">Register now!</Link>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </>
  );
};

export default Login;
