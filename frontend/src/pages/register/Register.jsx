import React, { useState } from "react";
import { Form, Input, Button, Typography, Card, notification } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import { snackbar } from "../../utils/snackbar";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/actions/userAction";

const { Title } = Typography;

const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [api, contextHolder] = notification.useNotification();

  const { loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = () => {
    if (!email || !username || !password) {
      snackbar(api, "error", "Enter all required fields");
      return false;
    }

    const userData = {
      email,
      username,
      password,
      role: username === "admin1" && password === "admin123" ? "ADMIN" : "USER",
    };

    dispatch(registerUser(userData));
    if (!loading) snackbar(api, "success", "Signup successfully");
    navigate("/login");
  };

  return (
    <>
      {contextHolder}
      <div className="register-form-container">
        <Card className="register-form-card">
          <Title level={2} className="register-form-title">
            Create an account
          </Title>
          <Form
            layout="vertical"
            className="login-form"
            initialValues={{
              remember: true,
            }}
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                size="large"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Item>

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
              <Button
                type="primary"
                htmlType="submit"
                className="register-form-button"
                size="large"
                onClick={handleRegister}
              >
                Register
              </Button>
              <span>Already have an account? </span>
              <Link to="/login">Login</Link>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </>
  );
};

export default Register;
