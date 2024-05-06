import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './PostDetails.css';

const PostDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { title, content, imageUrl, year, country, nameWinner, team, date, timeFastestLap } = location.state;

  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <div className="post-details-container">
      <div className="title-container">
        <h2>{title}</h2>
      </div>
      <div className="content-container">
        <div className="image-container2">
          <img src={imageUrl} alt={title} className="post-image1" />
        </div>
        <div className="details-container">
        <div className="details-content">
            <p><span className="title1">Highlights:</span>  {content}</p>
            <p><span className="title1">Year:</span>  {year}</p>
            <p><span className="title1">Country:</span>  {country}</p>
            <p><span className="title1">Winner:</span> {nameWinner}</p>
            <p><span className="title1">Team:</span> {team}</p>
            <p><span className="title1">Date:</span> {date}</p>
            <p><span className="title1">Fastest Lap Time:</span> {timeFastestLap}</p>
            </div>
          <div className="button-container">
            <button onClick={handleGoBack} className="button3" >Regresar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;