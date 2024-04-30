import React, { useState, useEffect } from 'react';
import useApi from '../hooks/useApi';
import  './pages.css';

const DeletePostPage = () => {
  const [posts, setPosts] = useState([]);
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

  const handleDeletePost = async (id) => {
    try {
      await sendRequest({
        method: 'delete',
        url: `/posts/${id}`,
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
      <h1 className="title">Eliminar Publicación</h1>
      {posts.map((post) => (
        <div key={post.id} className="post-container1">
           <h3>{post.name_circuit} | {post.name_winner} | {post.year}</h3>
              <p>{post.highlights}</p>
              <img src={post.image_base64} alt="Post" style={{ display: 'block', margin: '0 auto', width: '200px', height: '200px', objectFit: 'cover' }} />
          <button onClick={() => handleDeletePost(post.id)} className='button3'>Eliminar</button>
        </div>
      ))}
    </div>
  );
};

export default DeletePostPage;

