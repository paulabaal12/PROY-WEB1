import React, { useState } from 'react';
import Posts from './Posts';
import Login from './components/Login';
import Footer from './components/Footer';
import { Route, Routes, Link, Navigate } from 'react-router-dom';
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
    localStorage.setItem('isLoggedIn', 'true');
  };
  
  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
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
            <Link to="/login" className="button4">Iniciar Sesión</Link>
          )}
        </div>

      </div>
      <Routes>
        <Route path="/login" element={isLoggedIn ? <Navigate to="/" /> : <Login onLogin={handleLogin} />} />
        <Route path="/admin/*" element={isLoggedIn ? <AdminRoutes /> : <Navigate to="/login" />} />
        <Route path="/" element={<Posts />} />
      </Routes>
      <Footer />
    </div>
  );
};

const AdminRoutes = () => {
  const CreatePostPageWithAdminAuth = withAdminAuth(CreatepostPage);
  const EditPostPageWithAdminAuth = withAdminAuth(EditPostPage);
  const DeletePostPageWithAdminAuth = withAdminAuth(DeletePostPage);
  const ViewPostsPageWithAdminAuth = withAdminAuth(ViewPostsPage);

  return (
    <Routes>
      <Route path="create-post" element={<CreatePostPageWithAdminAuth />} />
      <Route path="edit-post" element={<EditPostPageWithAdminAuth />} />
      <Route path="delete-post" element={<DeletePostPageWithAdminAuth />} />
      <Route path="view-posts" element={<ViewPostsPageWithAdminAuth />} />
    </Routes>
  );
};

export default App;