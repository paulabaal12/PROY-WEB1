import { Routes, Route } from 'react-router-dom';
import BlogPage from './pages/blogpage';
import AdminPage from './pages/Admin';
import LoginPage from './pages/login';
import ProtectedRoute from './components/ruta';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<BlogPage />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminPage />
          </ProtectedRoute>
        }
      />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
};

export default App;