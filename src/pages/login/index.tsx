import React from 'react';
import { Input, Button, Form } from 'antd';
import { authCredentials } from '../../providers';
import { useNavigate } from 'react-router-dom'; // Import for navigation
//import styles from './login.css'; // Import CSS Modules
import './login.css';
export const Login = () => {
  const navigate = useNavigate(); // Utilize useNavigate hook

  const handleSubmit = (values: any) => {
    // Implement your login logic here (e.g., API call, authentication)
    console.log('Login form submitted:', values);

    // Assuming successful login, redirect to register page
    navigate('/dashboard');
  };
/**
 * 
 * 
 * Minuto 42:56
 * 
 * 
 * 
 */
  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Login</h2>
        <h3 className='login-description'>Ingrese su dirección de correo electrónico y contraseña para acceder</h3>
        <Form layout='vertical' initialValues={authCredentials} onFinish={handleSubmit}>
        <Form.Item className="login-form">
          <label style={{ color: "white" }}>Ingresa tu correo institucional</label>
          <Input name="email" type="email" placeholder="Correo institucional" />
        </Form.Item>


          <Form.Item className="login-form">
          <label style={{ color: "white" }}>Ingresa tu contraseña</label>
            <Input.Password name='password' placeholder='Contraseña' />
          </Form.Item>

          <Button type='text' htmlType='submit' className="login-button">
            Ingresar
          </Button>
        </Form>
      </div>
    </div>
  );
};
