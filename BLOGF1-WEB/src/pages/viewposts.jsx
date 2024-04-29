import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Post from '../Post';

const ViewPostsPage = () => {
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

  return (
    <div>
      <h1>Ver Todas las Publicaciones</h1>
      {posts.map((post) => (
        <Post
          key={post.id}
          title={post.name_circuit}
          content={post.highlights}
          imageUrl={post.image_base64}
          year={post.year}
          country={post.country_circuit}
          nameWinner={post.name_winner}
          team={post.team}
          date={post.date}
          timeFastestLap={post.time_fastest_lap}
        />
      ))}
    </div>
  );
};

export default ViewPostsPage;