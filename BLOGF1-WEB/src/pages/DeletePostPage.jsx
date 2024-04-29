import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DeletePostPage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('/api/posts', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const handleDeletePost = async (id) => {
    try {
      await axios.delete(`/api/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setPosts(posts.filter((post) => post.id !== id));
      alert('Publicación eliminada exitosamente');
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Error al eliminar la publicación');
    }
  };

  return (
    <div>
      <h1>Eliminar Publicación</h1>
      {posts.map((post) => (
        <div key={post.id}>
          <h3>{post.name_circuit}</h3>
          <p>{post.highlights}</p>
          <button onClick={() => handleDeletePost(post.id)}>Eliminar</button>
        </div>
      ))}
    </div>
  );
};

export default DeletePostPage;