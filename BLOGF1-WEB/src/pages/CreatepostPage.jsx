import React, { useState } from 'react';
import useApi from '../hooks/useApi';

const CreatePostPage = () => {
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
  const { loading, error, sendRequest } = useApi();

  const handleChange = (e) => {
    setNewPost({ ...newPost, [e.target.name]: e.target.value });
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    try {
      await sendRequest({
        method: 'post',
        url: '/posts',
        data: newPost,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
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
      alert('Publicación creada exitosamente');
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Error al crear la publicación');
    }
  };

  return (
    <div>
      <h1>Crear Nueva Publicación</h1>
      <form onSubmit={handleCreatePost}>
        <input
          type="text"
          name="name_circuit"
          placeholder="Nombre del circuito"
          value={newPost.name_circuit}
          onChange={handleChange}
        />
        <input
          type="text"
          name="country_circuit"
          placeholder="País del circuito"
          value={newPost.country_circuit}
          onChange={handleChange}
        />
        <input
          type="text"
          name="name_winner"
          placeholder="Nombre del ganador"
          value={newPost.name_winner}
          onChange={handleChange}
        />
        <input
          type="text"
          name="team"
          placeholder="Equipo del ganador"
          value={newPost.team}
          onChange={handleChange}
        />
        <input
          type="date"
          name="date"
          placeholder="Fecha de la carrera"
          value={newPost.date}
          onChange={handleChange}
        />
        <input
          type="number"
          name="year"
          placeholder="Año"
          value={newPost.year}
          onChange={handleChange}
        />
        <input
          type="text"
          name="time_fastest_lap"
          placeholder="Tiempo de vuelta más rápida"
          value={newPost.time_fastest_lap}
          onChange={handleChange}
        />
        <textarea
          name="highlights"
          placeholder="Puntos destacados"
          value={newPost.highlights}
          onChange={handleChange}
        />
        <input
          type="text"
          name="image_base64"
          placeholder="URL de la imagen"
          value={newPost.image_base64}
          onChange={handleChange}
        />
        <button type="submit">Crear Publicación</button>
      </form>
    </div>
  );
};

export default CreatePostPage;
