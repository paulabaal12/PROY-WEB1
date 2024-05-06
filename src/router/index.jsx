import React from 'react';
import { Route, Routes } from 'react-router-dom';
import useToken from '../hooks/useToken';
import useNavigate from '../hooks/useNavigate';
import Posts from '../Posts';
import Login from '../components/Login';
import Register from '../components/Register';
import CreatePostPage from '../pages/CreatepostPage';
import EditPostPage from '../pages/EditPostPage';
import DeletePostPage from '../pages/DeletePostPage';
import ViewPostsPage from '../pages/viewposts';
import withAdminAuth from '../components/withAdmin';
import PostDetails from '../pages/postdetails';

const routes = {
  '/': { 
    component: Posts, 
    requiresAuth: false },
    
  '/login': { 
    component: Login, 
    requiresAuth: false },

    
  '/register': {
    component: Register, 
    requiresAuth: false },

   '/postdetails' :{
    component: PostDetails, 
    requiresAuth: false
   }  ,

  '/admin': {
     component: Posts,
      requiresAuth: true },

  '/create-post': { 
    component: withAdminAuth(CreatePostPage), 
    requiresAuth: true },

  '/edit-post': { 
    component: withAdminAuth(EditPostPage), 
    requiresAuth: true },

  '/delete-post': {
     component: withAdminAuth(DeletePostPage), 
     requiresAuth: true },

  '/view-posts': { 
    component: withAdminAuth(ViewPostsPage),
     requiresAuth: true },

};


const Router = ({ onLogin, isLoggedIn }) => {
  const { token } = useToken();
  const { page } = useNavigate();

  let CurrentPage = () => <h1>404 Página no encontrada 🥲</h1>;

  if (routes[page]) {
    if (routes[page].requiresAuth && !token) {
      CurrentPage = Login;
    } else {
      CurrentPage = routes[page].component;
    }
  }

  if (page === "/logout") {
    window.location.replace("/");
  }

  return (
    <div>
      <Routes>
        {Object.keys(routes).map((route) => {
          const Component = routes[route].component === Login ? () => <Login onLogin={onLogin} /> : routes[route].component;
          return <Route key={route} path={route} element={<Component />} />;
        })}
      </Routes>
    </div>
  );
};

export default Router;
