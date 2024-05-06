import React, { lazy, Suspense, useState, useEffect } from 'react';
import axios from 'axios';
import Loading from './Loading';
import Skeleton from './components/Skeleton';
import './index.css';

const PostLazy = lazy(() => import('./Post'));

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
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

  if (loading) {
    return <Loading />; 
  }
  
  if (error) {
    return <div className='post-container2 post-details'>Error: {error}</div>;
  }

  if (posts.length === 0) {
    return <div className='post-container2 post-details'>No posts available.</div>;
  }

  return (
    <div style={{ paddingTop: '80px', paddingBottom: '100px' }}>
      <Suspense fallback={<Skeleton />}>
        {posts.map((post) => (
          <PostLazy
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