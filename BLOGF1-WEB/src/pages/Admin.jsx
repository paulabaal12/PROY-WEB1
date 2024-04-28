import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

  // Verificar si el usuario está autenticado
  const token = localStorage.getItem('token');
  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

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

  useEffect(() => {
    fetchPosts();
  }, []);

  // Crear una nueva publicación
  const handleCreatePost = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        '/api/posts',
        newPost,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
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
      await axios.put(
        `/api/posts/${id}`,
        updatedPost,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
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
        <input
          type="text"
          placeholder="País del circuito"
          value={newPost.country_circuit}
          onChange={(e) => setNewPost({ ...newPost, country_circuit: e.target.value })}
        />
        <input
          type="text"
          placeholder="Nombre del ganador"
          value={newPost.name_winner}
          onChange={(e) => setNewPost({ ...newPost, name_winner: e.target.value })}
        />
        <input
          type="text"
          placeholder="Equipo del ganador"
          value={newPost.team}
          onChange={(e) => setNewPost({ ...newPost, team: e.target.value })}
        />
        <input
          type="date"
          placeholder="Fecha de la carrera"
          value={newPost.date}
          onChange={(e) => setNewPost({ ...newPost, date: e.target.value })}
        />
        <input
          type="number"
          placeholder="Año"
          value={newPost.year}
          onChange={(e) => setNewPost({ ...newPost, year: e.target.value })}
        />
        <input
          type="text"
          placeholder="Tiempo de vuelta más rápida"
          value={newPost.time_fastest_lap}
          onChange={(e) => setNewPost({ ...newPost, time_fastest_lap: e.target.value })}
        />
        <textarea
          placeholder="Puntos destacados"
          value={newPost.highlights}
          onChange={(e) => setNewPost({ ...newPost, highlights: e.target.value })}
        />
        <input
          type="text"
          placeholder="URL de la imagen (base64)"
          value={newPost.image_base64}
          onChange={(e) => setNewPost({ ...newPost, image_base64: e.target.value })}
        />
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