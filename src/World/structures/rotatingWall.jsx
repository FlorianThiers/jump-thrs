import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Physics, RigidBody } from '@react-three/rapier';
import { OrbitControls } from '@react-three/drei';
import { Perf } from 'r3f-perf';
import * as THREE from 'three';

function RotatingWall({ position, args, color, onCollisionEnter, delay }) {
  const [hitsound] = useState(() => new Audio('/hit.mp3'));
  const wallRef = useRef();
  const [startTime, setStartTime] = useState(null);

  const collisionEnter = () => {
    hitsound.currentTime = 0;
    hitsound.volume = Math.random();
    hitsound.play();
  };

  useEffect(() => {
    setStartTime(Date.now());
  }, []);

  useFrame((state, delta) => {
    if (wallRef.current && startTime !== null) {
      const currentTime = Date.now();
      if (currentTime - startTime < delay * 1000) {
        return; // Wait until the delay is over
      }

      // Calculate the rotation angle
      const rotationSpeed = 0.5; // speed in radians per second
      wallRef.current.rotation.y += rotationSpeed * delta; // Rotate around the Y-axis
    }
  });

  return (
    <RigidBody
      ref={wallRef}
      type="kinematicPosition"
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

export default RotatingWall;
