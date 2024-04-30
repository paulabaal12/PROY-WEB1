import React, { lazy, Suspense, useState, useEffect } from 'react';
import axios from 'axios';
import PostSkeleton from './PostSkeleton';

const LazyPost = lazy(() => import('./Post'));

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading]  = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:3001/posts/');
        setPosts(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (posts.length === 0) {
    return <div>No posts available.</div>;
  }

  return (
    <div style={{ paddingTop: '80px', paddingBottom: '100px' }}>
      <Suspense fallback={<PostSkeleton />}>
        {posts.map((post) => (
          <LazyPost
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
      </Suspense>
    </div>
  );
};

export default Posts;