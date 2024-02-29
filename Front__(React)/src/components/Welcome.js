import React from 'react';
import { Link } from 'react-router-dom';

const Welcome = () => {
  const containerStyle = {
    margin: '0 auto',
    textAlign: 'center',
    padding: '30px',
    position: 'relative',
    background: 'url("315c2d2d07e1031080b73a6d8c683263.webp")',
    backgroundSize: 'cover',
    backgroundAttachment: 'fixed',
    minHeight: '100vh',
  };

  const overlayStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: '20px',
    borderRadius: '10px',
    backdropFilter: 'blur(5px)',
  };

  const linkStyle = {
    textDecoration: 'none',
    padding: '10px 20px',
    backgroundColor: '#007BFF',
    color: '#fff',
    borderRadius: '5px',
  };

  // Media query for smaller screens
  const mediaQuery = '@media (max-width: 768px)';

  return (
    <div style={containerStyle}>
      <div style={overlayStyle}>
        <h2>Welcome to My Supermarket App</h2>
        <p>
          As the sole developer, I've crafted an exceptional shopping experience with my React-based supermarket app. Leveraging a robust Django server, I've meticulously managed and stored data to ensure a seamless user experience.
        </p>

        <p>
          My React app is hosted on Netlify's cloud infrastructure, guaranteeing high availability and optimal performance. Simultaneously, the Django server, meticulously developed by me, operates on a dedicated Render server, providing a reliable backend for a smooth user experience.
        </p>

        <p>Explore the projects on GitHub:</p>

        <ul style={{ listStyleType: 'none', padding: '0' }}>
          <li><a href="https://github.com/MosheL2680/react_supermarket.git" target="_blank" rel="noopener noreferrer">React App Repository</a></li>
          <li><a href="https://github.com/MosheL2680/super_django.git" target="_blank" rel="noopener noreferrer">Django Server Repository</a></li>
          <li><a href="https://github.com/MosheL2680/admin_react-redux-TS.git" target="_blank" rel="noopener noreferrer">react-redux-TS (admin site) Repository</a></li>
        </ul>

        <p>Ready to start shopping? Click the link below to browse my categories:</p>

        <Link to={'categories'} style={{ ...linkStyle, [mediaQuery]: { width: '100%' } }}>Explore the Shop</Link><br/><br/><br/>
      </div>
    </div>
  );
};

export default Welcome;
