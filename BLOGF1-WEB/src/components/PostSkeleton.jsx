import React from 'react';

const PostSkeleton = () => (
  <div style={styles}>
    <div className="skeleton-header" />
    <div className="skeleton-image" />
    <div className="skeleton-content" />
    <div className="skeleton-details" />
  </div>
);

export default PostSkeleton;