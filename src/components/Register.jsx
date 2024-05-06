import React, { useState } from 'react';
import useApi from '../hooks/useApi';
import './login.css';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const { sendRequest, loading, error } = useApi();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');

    try {
      const response = await sendRequest({
        method: 'POST',
        url: '/users',
        data: {
          username,
          password,
          name,
        },
      });

      if (response.affectedRows > 0) {
        alert('Usuario registrado exitosamente');
        setUsername('');
        setPassword('');
        setName('');
        setTimeout(() => {
          navigate('/login');
        }, 1000);
      } else {
        alert('Error al registrar el usuario');
      }
    } catch (error) {
      console.error(error);
      alert('Error al registrar el usuario');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
      <h2 className="admin4">Registro 🚗</h2>
        <label className="admin1">Nombre de Usuario</label>
        <input
          type="text"
          placeholder="Nombre de usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label className="admin1">Contraseña</label>
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label className="admin1">Nombre</label>
        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit" className="login-submit-button" disabled={loading}>
          {loading ? 'Cargando...' : 'Registrarse'}
        </button>
      </form>
      <p>¿Ya tienes cuenta? <a href="/login" className='admin2'>Iniciar Sesión</a></p>
    </div>
  );
}

export default Register;