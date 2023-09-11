import { Button, Form, Input } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import style from './register.module.scss';
import axios from 'axios';
import axiosClient from '../../utils/config/axiosClient';

const Register = () => {
  let navigate = useNavigate();

  const handleSubmit = async (values: any) => {
    try {
      delete values.passwordRepeat;
      const data = await axiosClient.post('/users/register', values)
      if (data.status === 200) {
        localStorage.setItem('token', data.data.token)
        navigate('/sendVerifyEmail')
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className={style.registerContainer}>
      <div>
        <div>
          <Form
            onFinish={handleSubmit}
          >
            <Form.Item
              name="userName"
              rules={[
                { required: true, message: 'Por favor ingresar un nombre' },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Nombre de usuario"
              />
            </Form.Item>
            <Form.Item
              name="email"
              rules={[
                { required: true, message: 'Por favor ingresar un email' },
              ]}
            >
              <Input placeholder="Email" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Por favor ingresar una contraseña!',
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Contraseña"
              />
            </Form.Item>
            <Form.Item
              name="passwordRepeat"
              rules={[
                {
                  required: true,
                  message: 'Por favor ingresar nuevamente la contraseña!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error('¡Las contraseñas que ingresó no coinciden!'),
                    );
                  },
                }),
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Repetir contraseña"
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Crear cuenta
              </Button>
              <div>
                O <Link to="/register">iniciar sesión</Link>
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};
export default Register;
