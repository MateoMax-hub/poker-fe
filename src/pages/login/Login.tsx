import { Button, Form, Input } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom';
import style from './login.module.scss'
import axiosClient from './../../utils/config/axiosClient';

const Login = () => {
  let navigate = useNavigate();

  const handleSubmit = async (values: any) => {
    try {
      delete values.passwordRepeat;
      const data = await axiosClient.post('/users/login', values)
      if (data.status === 200) {
        localStorage.setItem('token', data.data.token)
        navigate('/')
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className={style.loginContainer}>
      <div>
        <div>
          <Form onFinish={handleSubmit}>
            <Form.Item
              name="email"
              rules={[
                { required: true, message: 'Por favor ingresar un email' },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Email"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: 'Por favor ingresar una contraseña!' },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Contraseña"
              />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                Ingresar
                </Button>
                <div>O <Link to='/register'>crear una cuenta ahora!</Link></div>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};
export default Login;
