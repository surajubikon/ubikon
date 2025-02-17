import React from 'react';
import Lottie from 'react-lottie';
import animationData from './NotFound.json';  // Replace with the correct path to your Lottie JSON file

const NotFound = () => {
  // Lottie animation options
  const defaultOptions = {
    loop: true,  // Set to false if you want the animation to play once
    autoplay: true,  // Set to true to auto-play the animation
    animationData: animationData,  // Pass the imported animation data
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      
      <Lottie options={defaultOptions} height={400} width={400} />
    </div>
  );
};

export default NotFound;
