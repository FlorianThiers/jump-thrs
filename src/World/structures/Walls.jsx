import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Physics, RigidBody } from '@react-three/rapier';

function Wall({ position, args, color, delay }) {
  const [hitsound] = useState(() => new Audio('/hit.mp3'));
  const wallRef = useRef();
  const [direction, setDirection] = useState(1); // 1 for right, -1 for left
  const [elapsedTime, setElapsedTime] = useState(0);
  const [startTime, setStartTime] = useState(null);

  const collisionEnter = () => {
    hitsound.currentTime = 0;
    hitsound.volume = Math.random();
    hitsound.play();
  }

  useEffect(() => {
    setStartTime(Date.now());
  }, []);

  useFrame((state, delta) => {
    if (wallRef.current && startTime !== null) {
      const currentTime = Date.now();
      if (currentTime - startTime < delay * 1000) {
        return; // Wait until the delay is over
      }

      // Update the wall's position
      const translation = wallRef.current.translation();
      wallRef.current.setTranslation({
        x: translation.x + direction * delta, // Move based on the direction
        y: translation.y,
        z: translation.z,
      });

      // Update the elapsed time
      setElapsedTime((prevTime) => {
        const newTime = prevTime + delta;
        // Change direction every 2 seconds
        if (newTime >= 2) {
          setDirection((prevDirection) => prevDirection * -1); // Reverse the direction
          return 0; // Reset the elapsed time
        }
        return newTime;
      });
    }
  });

  return (
    <RigidBody
      ref={wallRef}
      type="fixed"
      position={position}
      onCollisionEnter={collisionEnter}
    >
      <mesh castShadow>
        <boxGeometry args={args} />
        <meshStandardMaterial color={color} />
      </mesh>
    </RigidBody>
  );
}

export default Wall;
