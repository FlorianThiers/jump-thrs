import React from 'react';
import { Html, useProgress } from '@react-three/drei';

const LoadingScreen = () => {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="loading-screen">
        <div className="loading-bar">
          <div className="loading-bar-progress" style={{ width: `${progress}%` }}></div>
        </div>
        <h1>Loading {progress.toFixed(2)}%</h1>
      </div>
    </Html>
  );
};

export default LoadingScreen;