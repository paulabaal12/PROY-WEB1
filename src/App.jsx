import React, { useState, useEffect } from 'react';
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Footer from './components/Footer';
import { TokenProvider } from './hooks/useToken';
import { NavigationProvider } from './hooks/useNavigate';
import Router from './router/index'; 

const App = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const storedToken = localStorage.getItem('token');
  
    setIsLoggedIn(storedIsLoggedIn);
    setToken(storedToken);
  
    if (storedIsLoggedIn && storedToken) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
      navigate('/admin');
    }
  }, []);
  

  const handleLogin = (token) => {
    setIsLoggedIn(true);
    setToken(token);
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('token', token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    navigate('/admin');
  };
  
  const handleLogout = () => {
    setIsLoggedIn(false);
    setToken(null);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <TokenProvider>
      <NavigationProvider>
        <div>
          <div className="header">
            <img src="https://www.formula1.com/etc/designs/fom-website/images/f1_logo.svg" alt="F1 Logo" />
            <h1>F1 Blog</h1>
            <div className="login-button">
              {isLoggedIn ? (
                <>
                  <Link to="/create-post" className="button2">Crear Post</Link>
                  <Link to="/edit-post" className="button2">Editar Post</Link>
                  <Link to="/delete-post" className="button2">Eliminar Post</Link>
                  <Link to="/view-posts" className="button2">Ver Posts</Link>
                  <button onClick={handleLogout}>Cerrar Sesión</button>
                </>
              ) : (
                <Link to="/login" className="button4">
                  Iniciar Sesión
                </Link>
              )}
            </div>

          </div>
          <Router onLogin={handleLogin} isLoggedIn={isLoggedIn} /> 
          <Footer />
        </div>
      </NavigationProvider>
    </TokenProvider>
  );
};

export default App;
