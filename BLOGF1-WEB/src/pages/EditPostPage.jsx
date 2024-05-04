import React, { useState, useEffect } from 'react';
import useApi from '../hooks/useApi';
import  './pages.css';

const EditPostPage = () => {
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  const { loading, error, sendRequest } = useApi();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await sendRequest({
          method: 'get',
          url: '/posts',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setPosts(response);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, [sendRequest]);

  const handleEditPost = (post) => {
    setEditingPost(post);
  };

  const handleUpdatePost = async (e) => {
    e.preventDefault();
    try {
      const updatedPost = Object.fromEntries(
        Object.entries(editingPost).filter(([key, value]) => value !== '')
      );
      await sendRequest({
        method: 'put',
        url: `/posts/${editingPost.id}`,
        data: updatedPost,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setEditingPost(null);
      alert('Publicación actualizada exitosamente');
    } catch (error) {
      console.error('Error updating post:', error);
      alert('Error al actualizar la publicación');
    }
  };
  

  const handleChange = (e) => {
    setEditingPost({ ...editingPost, [e.target.name]: e.target.value });
  };


  return (
    <div>
       <h1 className="title">| Editar Publicación | Prestar atención a la fecha |</h1>
      {editingPost ? (
        <form onSubmit={handleUpdatePost} className="form-container">
          <label className="form-label">Nombre del Circuito</label>
          <input
            type="text"
            name="name_circuit"
            placeholder="Nombre del circuito"
            value={editingPost.name_circuit}
            onChange={handleChange}
            className="form-input-wide"
          />
          <label className="form-label">Ciudad del Circuito</label>
          <input
            type="text"
            name="country_circuit"
            placeholder="País del circuito"
            value={editingPost.country_circuit}
            onChange={handleChange}
            className="form-input-wide"

          />
          <label className="form-label">Nombre del Ganador (Piloto)</label>
          <input
            type="text"
            name="name_winner"
            placeholder="Nombre del ganador"
            value={editingPost.name_winner}
            onChange={handleChange}
            className="form-input-wide"
          />
          <label className="form-label">Nombre del Equipo Ganador</label>
          <input
            type="text"
            name="team"
            placeholder="Equipo del ganador"
            value={editingPost.team}
            onChange={handleChange}
            className="form-input-wide"
          />
          <label className="form-label">Fecha de la carrera</label>
          <input
            type="date"
            name="date"
            placeholder="Fecha de la carrera"
            value={editingPost.date}
            onChange={handleChange}
            className="form-input-wide"
          />
           <label className="form-label">Año de la carrera</label>
          <input
            type="number"
            name="year"
            placeholder="Año"
            value={editingPost.year}
            onChange={handleChange}
            className="form-input-wide"
          />
          <label className="form-label">Tiempo de la vuelta más rápida</label>
          <input
            type="text"
            name="time_fastest_lap"
            placeholder="Tiempo de vuelta más rápida"
            value={editingPost.time_fastest_lap}
            onChange={handleChange} 
            className="form-input-wide"
          />
          <label className="form-label">Lo más destacado de la carrera</label>
          <textarea
            name="highlights"
            placeholder="Puntos destacados"
            value={editingPost.highlights}
            onChange={handleChange}
            className="form-input-wide"

          />
           <label className="form-label">URL de la imagen</label>
          <input
            type="text"
            name="image_base64"
            placeholder="URL de la imagen"
            value={editingPost.image_base64}
            onChange={handleChange}
            className="form-input-wide"
          />
          <button type="submit" className='form-button'>Actualizar Publicación</button>
        </form>
      ) : (
        <>
         <h3>Selecciona una publicación para editar</h3>
          {posts.map((post) => (
            <div key={post.id} className="post-container1">
              <h3>{post.name_circuit} | {post.name_winner} | {post.year}</h3>
              <p>{post.highlights}</p>
              <img src={post.image_base64} alt="Post" style={{ display: 'block', margin: '0 auto', width: '200px', height: '200px', objectFit: 'cover' }} />
              <button onClick={() => handleEditPost(post)} className='button3'>Editar</button>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default EditPostPage;