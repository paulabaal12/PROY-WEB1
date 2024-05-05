import React from 'react';
import PropTypes from 'prop-types';

const Post = ({ title, content, imageUrl, year, country, nameWinner, team, date, timeFastestLap }) => {
  const styles = {
    backgroundColor: 'white',
    border: '4px solid red',
    padding: '20px',
    margin: '20px auto',
    maxWidth: '1000px',
    textAlign: 'center',
    position: 'relative',
    zIndex: 1,
  };

  return (
    <div style={styles}>
      <h1>{title}</h1>
      <h2>{country} | {year}</h2>
      <div className="post-container">
        <div>
          <img className="post-image" src={imageUrl} alt="Post" />
          <p>{content}</p>
        </div>
        <div>
          <div className="post-details">
            <h2>{nameWinner}</h2>
          </div>
          <div className="post-details">
            <h3>{team}</h3>
          </div>
          <div className="post-details">
            <h3>{date}</h3>
          </div>
          <div className="post-details">
            <h2>{timeFastestLap}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

Post.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
  country: PropTypes.string.isRequired,
  nameWinner: PropTypes.string.isRequired,
  team: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  timeFastestLap: PropTypes.string.isRequired,
};

export default Post;