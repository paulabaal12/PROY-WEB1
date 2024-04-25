import React, { lazy, Suspense } from 'react';
import PropTypes from 'prop-types';

const LazyImage = lazy(() => import('./LazyImage'));

const Post = ({ title, content, imageUrl, date }) => (
  <div>
    <h2>{title}</h2>
    <p>{date}</p>
    <Suspense fallback={<div>Cargando imagen...</div>}>
      <LazyImage src={imageUrl} alt={title} />
    </Suspense>
    <p>{content}</p>
  </div>
);

Post.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
};

export default Post;