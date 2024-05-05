import React, { useState } from 'react';
import useApi from '../hooks/useApi';
import  './pages.css';

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

  // Agrega un nuevo estado para los posts
  const [posts, setPosts] = useState([]);

  const { loading, error, sendRequest } = useApi();

  const handleChange = (e) => {
    setNewPost({ ...newPost, [e.target.name]: e.target.value });
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    try {
      const response = await sendRequest({
        method: 'post',
        url: '/posts',
        data: newPost,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      setPosts([...posts, response.data]);

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
      <h1 className="title" >Crear Nueva Publicación</h1>
      <form onSubmit={handleCreatePost} className="form-container">
        <label className="form-label">Nombre del Circuito</label>
        <input
          type="text"
          name="name_circuit"
          placeholder="Nombre del circuito"
          value={newPost.name_circuit}
          onChange={handleChange}
          className="form-input-wide"
        />
        <label className="form-label">Ciudad del Circuito</label>
        <input
          type="text"
          name="country_circuit"
          placeholder="País del circuito"
          value={newPost.country_circuit}
          onChange={handleChange}
          className="form-input-wide"
        />
        <label className="form-label">Nombre del Ganador (Piloto)</label>
        <input
          type="text"
          name="name_winner"
          placeholder="Nombre del ganador"
          value={newPost.name_winner}
          onChange={handleChange}
          className="form-input-wide"
        />
        <label className="form-label">Nombre del Equipo Ganador</label>
        <input
          type="text"
          name="team"
          placeholder="Equipo del ganador"
          value={newPost.team}
          onChange={handleChange}
          className="form-input-wide"
        />
        <label className="form-label">Fecha de la carrera</label>
        <input
          type="date"
          name="date"
          placeholder="Fecha de la carrera"
          value={newPost.date}
          onChange={handleChange}
          className="form-input-wide"
        />
        <label className="form-label">Año de la carrera</label>
        <input
          type="number"
          name="year"
          placeholder="Año"
          value={newPost.year}
          onChange={handleChange}
          className="form-input-wide"
        />
        <label className="form-label">Tiempo de la vuelta más rápida</label>
        <input
          type="text"
          name="time_fastest_lap"
          placeholder="Tiempo de vuelta más rápida"
          value={newPost.time_fastest_lap}
          onChange={handleChange}
          className="form-input-wide"
        />
        <label className="form-label">Lo más destacado de la carrera</label>
        <textarea
          name="highlights"
          placeholder="Puntos destacados"
          value={newPost.highlights}
          onChange={handleChange}
          className="form-input-wide"
        />
        <label className="form-label">URL de la imagen</label>
        <input
          type="text"
          name="image_base64"
          placeholder="URL de la imagen"
          value={newPost.image_base64}
          onChange={handleChange}
          className="form-input-wide"
        />
        <button type="submit" className='form-button'>Crear Publicación</button>
      </form>
    </div>
  );
};

export default CreatePostPage;
