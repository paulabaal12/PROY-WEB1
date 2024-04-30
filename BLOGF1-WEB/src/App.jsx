import React, { useState } from 'react';
import Posts from './Posts';
import Login from './components/Login';
import Footer from './components/Footer';
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import CreatepostPage from './pages/CreatepostPage';
import EditPostPage from './pages/EditPostPage';
import DeletePostPage from './pages/DeletePostPage';
import ViewPostsPage from './pages/viewposts';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    setIsLoggedIn(true);
    setShowLogin(false);
    navigate('/'); 
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
            <Link to="admin/create-post" className='button2'>Crear Post</Link>
            <Link to="admin/edit-post" className='button2'>Editar Post</Link>
            <Link to="admin/delete-post" className='button2'>Eliminar Post</Link>
            <Link to="admin/view-posts" className='button2'>Ver Posts</Link>
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
      <Routes>
        {isLoggedIn ? (
          <>
            <Route path="admin/create-post" element={<CreatepostPage />} />
            <Route path="admin/edit-post" element={<EditPostPage />} />
            <Route path="admin/delete-post" element={<DeletePostPage />} />
            <Route path="admin/view-posts" element={<ViewPostsPage />} />
          </>
        ) : (
          <Route path="admin/*" element={<Login onLogin={handleLogin} />} />
        )}
        <Route path="/" element={showLogin ? <Login onLogin={handleLogin} /> : <Posts />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;