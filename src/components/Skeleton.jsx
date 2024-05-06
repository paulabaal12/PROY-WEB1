import React from 'react';
import './Skeleton.css';

const Skeleton = () => (
  <div className="skeleton">
    <div className="skeleton-header">
      <div className="skeleton-avatar" />
      <div className="skeleton-author" />
    </div>
    <div className="skeleton-content">
      <div className="skeleton-line" />
      <div className="skeleton-line" />
      <div className="skeleton-line" />
      <div className="skeleton-line" />
      <div className="skeleton-line" />
    </div>
  </div>
);

export default Skeleton;