import React, { useState } from 'react';
import Posts from './Posts';
import Login from './components/Login';
import Footer from './components/Footer';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setShowLogin(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('token');
  };

  return (
    <div>
      <div className="header">
        <img src="https://www.formula1.com/etc/designs/fom-website/images/f1_logo.svg" alt="F1 Logo" />
        <h1>F1 Blog</h1>
        {isLoggedIn && (
          <div className="admin-options login-button">
            <button onClick={() => window.location.href = '/admin/create'}  className='button2' >Crear Post</button>
            <button onClick={() => window.location.href = '/admin/edit'} className='button2'>Editar Post</button>
            <button onClick={() => window.location.href = '/admin/delete'}  className='button2' >Eliminar Post</button>
            <button onClick={() => window.location.href = '/admin/view'}  className='button2' >Ver Posts</button>
          </div>
        )}
        <div className="login-button">
          {isLoggedIn ? (
            <button onClick={handleLogout}>Cerrar Sesión</button>
          ) : (
            <button onClick={() => setShowLogin(true)}>Iniciar Sesión</button>
          )}
        </div>
      </div>
      {showLogin ? <Login onLogin={handleLogin} /> : <Posts />}
      <Footer />
    </div>
  );
};

export default App;