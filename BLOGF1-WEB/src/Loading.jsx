import React from 'react';
import styled from 'styled-components';

const StyledLoader = styled.div`
  width: 30px; 
  aspect-ratio: 1;
  border-radius: 50%;
  animation: l5 1s infinite linear alternate;

  @keyframes l5 {
    0% {
      box-shadow: 40px 0 #000, -40px 0 #0002; 
      background: #000;
    }
    33% {
      box-shadow: 40px 0 #000, -40px 0 #0002;
      background: #0002;
    }
    66% {
      box-shadow: 40px 0 #0002, -40px 0 #000;
      background: #0002;
    }
    100% {
      box-shadow: 40px 0 #0002, -40px 0 #000;
      background: #000;
    }
  }
`;

const Loading = () => {
  return <StyledLoader />;
};

export default Loading;