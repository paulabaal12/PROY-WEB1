import React from 'react';

const Footer = () => {
  const styles = {
    padding: '20px 25px',
    backgroundColor: '#FF0000',
    fontSize: '14px',
    textAlign: 'center',
    textTransform: 'uppercase',
    color: 'white',
    fontWeight: 'bold',
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    fontFamily: 'sans-serif',
    zIndex: 10,
  };

  return (
    <footer style={styles}>
      © Paula Barillas | 22764
    </footer>
  );
};

export default Footer;