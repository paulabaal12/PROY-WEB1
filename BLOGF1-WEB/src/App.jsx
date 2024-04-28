import React from 'react';
import { Switch, Route } from 'react-router-dom';
import BlogPage from './pages/blogpage';
import AdminPage from './pages/Admin';
import LoginPage from './pages/login';
import ProtectedRoute from './components/ruta';

const App = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/">
          <BlogPage />
        </Route>
        <ProtectedRoute path="/admin">
          <AdminPage />
        </ProtectedRoute>
        <Route path="/login">
          <LoginPage />
        </Route>
      </Switch>
    </div>
  );
};

export default App;