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
  };

  return (
    <div>
      <div className="header">
        <img src="https://www.formula1.com/etc/designs/fom-website/images/f1_logo.svg" alt="F1 Logo" />
        <h1>F1 Blog</h1>
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
