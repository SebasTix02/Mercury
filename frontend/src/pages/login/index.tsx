import React, { useRef, useEffect, useState } from 'react';
import { Button, message, Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../providers/options/login';
import './login.css';

export const Login = () => {
  const [isLoading, setIsLoading] = useState(true);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem('hasReloaded')) {
      sessionStorage.removeItem('hasReloaded');
      navigate("/");
    } else {
      setIsLoading(false);
    }
  }, [navigate]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const username = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!username || !password) {
      message.error('Por favor complete todos los campos');
      return;
    }

    const values = { username, password };

    const result: any = await loginUser(values);

    if (result.success) {
      message.info('Cargando...');
      sessionStorage.setItem('hasReloaded', 'true');
      window.location.reload();
    } else {
      console.log("Error");
      message.error(result.error.message || 'Error al loguearse');
    }
  };

  if (isLoading) {
    return (
      <div className="login-container">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="login-container">
      <div className="login-content">
        <div className="login-card">
          <h2 className="login-title">Login</h2>
          <h3 className="login-description">Ingrese su dirección de correo electrónico y contraseña para acceder</h3>
          <form onSubmit={handleSubmit}>
            <div className="login-form-item">
              <label style={{ color: 'white' }} htmlFor="email">Ingresa tu correo institucional</label>
              <input id="email" type="email" placeholder="Correo institucional" ref={emailRef} className="login-input" />
            </div>

            <div className="login-form-item">
              <label style={{ color: 'white' }} htmlFor="password">Ingresa tu contraseña</label>
              <input id="password" type="password" placeholder="Contraseña" ref={passwordRef} className="login-input" />
            </div>

            <Button type="primary" htmlType="submit" className="login-button">
              Ingresar
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
