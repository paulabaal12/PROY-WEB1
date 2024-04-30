import React, { useState } from 'react';
import Posts from './Posts';
import Login from './components/Login';
import Footer from './components/Footer';
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import CreatepostPage from './pages/CreatepostPage';
import EditPostPage from './pages/EditPostPage';
import DeletePostPage from './pages/DeletePostPage';
import ViewPostsPage from './pages/viewposts';
import withAdminAuth from './components/withAdmin'; 

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
  const [showLogin, setShowLogin] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setShowLogin(false);
    localStorage.setItem('isLoggedIn', 'true'); 
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
  };

  
  const CreatePostPageWithAdminAuth = withAdminAuth(CreatepostPage);
  const EditPostPageWithAdminAuth = withAdminAuth(EditPostPage);
  const DeletePostPageWithAdminAuth = withAdminAuth(DeletePostPage);
  const ViewPostsPageWithAdminAuth = withAdminAuth(ViewPostsPage);

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
        <Route path="admin/create-post" element={<CreatePostPageWithAdminAuth />} />
        <Route path="admin/edit-post" element={<EditPostPageWithAdminAuth />} />
        <Route path="admin/delete-post" element={<DeletePostPageWithAdminAuth />} />
        <Route path="admin/view-posts" element={<ViewPostsPageWithAdminAuth />} />
        <Route path="/" element={showLogin ? <Login onLogin={handleLogin} /> : <Posts />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;