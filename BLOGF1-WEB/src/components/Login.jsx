import { useState } from 'react';
import CryptoJS from 'crypto-js';
import useToken from '../hooks/useToken';
import { useNavigate } from 'react-router-dom';
import './login.css';

function Login({ onLogin, setIsLoggedIn }) {
  const { setToken } = useToken();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const defaultUsername = 'admin';
    const defaultPassword = 'leclerc';

    if (username === defaultUsername && CryptoJS.MD5(password).toString() === CryptoJS.MD5(defaultPassword).toString()) {
      const access_token = 'token_de_ejemplo';
      setToken(access_token);
      setIsLoggedIn(true); // Actualizar el estado isLoggedIn
      navigate('/admin', { replace: true });
    } else {
      alert("Usuario inválido, intentalo nuevamente");
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <input type="text" placeholder="Usuario" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit" className="login-submit-button">
          Iniciar Sesión
        </button>
      </form>
      <h3 className="admin">Solo para administrador</h3>
    </div>
  );
}

export default Login;