import React from 'react';
import './IntroScreen.css';

const IntroScreen = ({ onReady }) => {
  return (
    <div className="intro-screen">
      <h1>Welcome to MyGame</h1>
      <h2>A parkour game where you need to jump from platform to platform to reach the end.</h2>
      <ul>
        <li>Use the <strong>Mouse</strong> to look around.</li>
        <li>Use <strong>Spacebar</strong> to <strong>Jump</strong>.</li>
        <li>U <strong><em>can't </em></strong>jump on a Hill</li>
        <li>Use <strong>W, A, S, D</strong> to <strong>Move</strong>.</li>
        <li>Use <strong>Esc</strong> to open and get out of the <strong>menu</strong>.</li>
        <li>Click on the <strong>Ready</strong> button to <strong>Start</strong>.</li>
      </ul>
      <button onClick={onReady}>Ready</button>



      <div className="credits">
        {/* credits */}
        <ul>
          <li>Game and Music made by Florian Thiers</li>
        </ul>
    </div>
    </div>
  );
};

export default IntroScreen;