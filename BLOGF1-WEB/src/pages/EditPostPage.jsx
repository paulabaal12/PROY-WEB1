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
       <h1 className="title">Editar Publicación</h1>
      {editingPost ? (
        <form onSubmit={handleUpdatePost}>
          <input
            type="text"
            name="name_circuit"
            placeholder="Nombre del circuito"
            value={editingPost.name_circuit}
            onChange={handleChange}
          />
          <input
            type="text"
            name="country_circuit"
            placeholder="País del circuito"
            value={editingPost.country_circuit}
            onChange={handleChange}
          />
          <input
            type="text"
            name="name_winner"
            placeholder="Nombre del ganador"
            value={editingPost.name_winner}
            onChange={handleChange}
          />
          <input
            type="text"
            name="team"
            placeholder="Equipo del ganador"
            value={editingPost.team}
            onChange={handleChange}
          />
          <input
            type="date"
            name="date"
            placeholder="Fecha de la carrera"
            value={editingPost.date}
            onChange={handleChange}
          />
          <input
            type="number"
            name="year"
            placeholder="Año"
            value={editingPost.year}
            onChange={handleChange}
          />
          <input
            type="text"
            name="time_fastest_lap"
            placeholder="Tiempo de vuelta más rápida"
            value={editingPost.time_fastest_lap}
            onChange={handleChange}
          />
          <textarea
            name="highlights"
            placeholder="Puntos destacados"
            value={editingPost.highlights}
            onChange={handleChange}
          />
          <input
            type="text"
            name="image_base64"
            placeholder="URL de la imagen (base64)"
            value={editingPost.image_base64}
            onChange={handleChange}
          />
          <button type="submit">Actualizar Publicación</button>
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