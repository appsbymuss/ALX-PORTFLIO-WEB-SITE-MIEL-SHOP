import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import '../style/Login.css';
import { AuthAPI } from '../api/methods';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        checkStatusLogin();
    }, []);

    const checkStatusLogin = async () => {
        try {
            const response = await AuthAPI.CheckStatus();
            navigate("/dashboard");
        } catch (err) {
            //
        }
    }

    const handleLogin = async (values) => {
        const hideLoadingMessage = message.loading("Loading...", 0);
        try {
            setLoading(true);
            const response = await AuthAPI.logIn(values);

            hideLoadingMessage();
            setLoading(false);

            navigate("/dashboard");

        } catch (err) {
            hideLoadingMessage();
            setLoading(false);
            message.error("The password is incorrect or the user doesn't exist");
        }
    };
  
    return (
      <div className="login-container">
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={handleLogin}
        >
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input your Email!',
              },
            ]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" disabled={loading}/>
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your Password!',
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
              disabled={loading}
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
  
            <a className="login-form-forgot" href="">
              Forgot password
            </a>
          </Form.Item>
  
          <Form.Item>
            <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                disabled={loading}
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  };
  
export default LoginPage;
