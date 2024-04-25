import React, { useState } from 'react';
import useApi from '../hooks/useApi';
import useForm from '../hooks/useForm';

const AdminPage = () => {
  const { data: posts, loading, error } = useApi('/api/posts');
  const { values, handleChange, handleSubmit } = useForm(() => {
 
  });

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Área de Administración</h1>
      <form onSubmit={handleSubmit}>
        {/* */}
      </form>
      <h2>Publicaciones existentes</h2>
      {posts.map((post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          {/* Botones para actualizar y eliminar el post */}
        </div>
      ))}
    </div>
  );
};

export default AdminPage;