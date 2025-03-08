import React from 'react';

const Footer = () => {
  return (
    <div style={styles.footer}>
      <p>&copy; 2024 StayEaze. All rights reserved.</p>
    </div>
  );
};

const styles = {
  footer: {
    backgroundColor: '#041a59', // Dark blue background
    color: 'white',
    textAlign: 'center',
    padding: '20px 0',
    position: 'fixed',
    bottom: '0',
    left: '0',
    width: '100%',
    boxShadow: '0 -4px 10px rgba(0, 0, 0, 0.1)',
  },
  footerText: {
    margin: '0',
    fontSize: '14px',
  },
};

export default Footer;
