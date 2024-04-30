import React, { useState, useEffect } from 'react';
import useApi from '../hooks/useApi';
import Post from '../Post';

const ViewPostsPage = () => {
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

  return (
    <div>
      <h1 className="title">Ver Todas las Publicaciones</h1>
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