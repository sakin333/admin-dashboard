import React from "react";
import { Form, Input, Button, Checkbox, Typography, Card } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import "./Login.css";
import { Link } from "react-router-dom";

const { Title } = Typography;

const Login = () => {
  return (
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
            />
          </Form.Item>

          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Link to="/forgotPassword" className="login-form-forgot-passsword">
              Forgot Password
            </Link>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              size="large"
            >
              Login
            </Button>
            <span>Don't have an account? </span>
            <Link to="/register">Register now!</Link>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
