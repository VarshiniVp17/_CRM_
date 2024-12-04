import React from 'react';
import './UnderConstruction.css'; // Make sure to import the CSS file

const UnderConstruction = () => {
  return (
    <div className="construction-container">
      <div className="construction-message">
        <h1>🚧 Page Under Construction 🚧</h1>
        <p>We're working hard to bring this page to life. Please check back soon!</p>
      </div>
      <div className="construction-image">
        <img src="https://via.placeholder.com/400x300.png?text=Under+Construction" alt="Under Construction" />
      </div>
    </div>
  );
}

export default UnderConstruction;
