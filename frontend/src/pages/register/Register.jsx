import React from "react";
import { Form, Input, Button, Checkbox, Typography, Card } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import "./Register.css";
import { Link } from "react-router-dom";

const { Title } = Typography;

const Register = () => {
  return (
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
            <Button
              type="primary"
              htmlType="submit"
              className="register-form-button"
              size="large"
            >
              Login
            </Button>
            <span>Already have an account? </span>
            <Link to="/login">Login</Link>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Register;
