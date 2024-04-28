import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const AdminPage = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({
    name_circuit: '',
    country_circuit: '',
    name_winner: '',
    team: '',
    date: '',
    year: '',
    time_fastest_lap: '',
    highlights: '',
    image_base64: '',
  });
  const history = useHistory();

  // Verificar si el usuario está autenticado
  const token = localStorage.getItem('token');
  if (!token) {
    history.push('/login');
    return null;
  }

  // Obtener todas las publicaciones
  const fetchPosts = async () => {
    try {
      const response = await axios.get('/api/posts', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  React.useEffect(() => {
    fetchPosts();
  }, []);

  // Crear una nueva publicación
  const handleCreatePost = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/posts', newPost, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNewPost({
        name_circuit: '',
        country_circuit: '',
        name_winner: '',
        team: '',
        date: '',
        year: '',
        time_fastest_lap: '',
        highlights: '',
        image_base64: '',
      });
      fetchPosts();
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  // Actualizar una publicación
  const handleUpdatePost = async (id, updatedPost) => {
    try {
      await axios.put(`/api/posts/${id}`, updatedPost, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchPosts();
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  // Eliminar una publicación
  const handleDeletePost = async (id) => {
    try {
      await axios.delete(`/api/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <div>
      <h1>Área de Administración</h1>
      <form onSubmit={handleCreatePost}>
        <input
          type="text"
          placeholder="Nombre del circuito"
          value={newPost.name_circuit}
          onChange={(e) => setNewPost({ ...newPost, name_circuit: e.target.value })}
        />
        {/* Otros campos del formulario para crear una nueva publicación */}
        <button type="submit">Crear Publicación</button>
      </form>
      <h2>Publicaciones existentes</h2>
      {posts.map((post) => (
        <div key={post.id}>
          <h3>{post.name_circuit}</h3>
          <p>{post.highlights}</p>
          <button onClick={() => handleUpdatePost(post.id, { /* Datos actualizados */ })}>
            Actualizar
          </button>
          <button onClick={() => handleDeletePost(post.id)}>Eliminar</button>
        </div>
      ))}
    </div>
  );
};

export default AdminPage;