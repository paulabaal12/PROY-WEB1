import { useState } from 'react';
import CryptoJS from 'crypto-js';
import { useNavigate } from 'react-router-dom';
import './login.css';
import useApi from '../hooks/useApi';

function Login({ onLogin }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { sendRequest, loading, error } = useApi();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await sendRequest({
        method: 'GET',
        url: '/users',
      });

      if (response) {
        const user = response.find(user => user.username === username && CryptoJS.MD5(user.password).toString() === CryptoJS.MD5(password).toString());

        if (user) {
          const access_token = 'token';
          onLogin(access_token); 
          navigate('/admin', { replace: true });
        } else {
          alert("Usuario inválido, intentalo nuevamente");
        }
      } else {
        console.error('La respuesta de la API no es válida');
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
      <h2 className="admin4">BIENVENIDO 🚗</h2>
      <label className="admin1">Usuario</label>
        <input type="text" placeholder="Usuario" value={username} onChange={(e) => setUsername(e.target.value)} />
        <label className="admin1">Contraseña</label>
        <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit" className="login-submit-button">
          Iniciar Sesión
        </button>
      </form>
      <h3 className="admin">Solo para administrador</h3>
      <p>¿No tienes cuenta? <a href="/register" className='admin2'>Regístrate</a></p>
    </div>
  );
}


export default Login;
