import React, { useRef, useState } from 'react';
import { RigidBody } from '@react-three/rapier';
import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import useGame from '../stores/useGame';

function Endpoint({ position }) {
  const endpointRef = useRef();
  const endGame = useGame((state) => state.end);
  const [isTriggered, setIsTriggered] = useState(false);
  const texture = useLoader(THREE.TextureLoader, '/portalENcheckpoint/maxresdefault.jpg');

  const handleCollisionEnter = () => {
    endGame();
    setIsTriggered(true);
  };

  return (
    // Conditional rendering: render only when not triggered
    (!isTriggered) && <RigidBody
        ref={endpointRef}
        type="fixed"
        position={position}
        sensor
        onIntersectionEnter={() => handleCollisionEnter()} // Handle intersection event
    >
        <mesh>
            <cylinderGeometry args={[4, 4, 0.1, 32]} />
            <meshStandardMaterial map={texture} />
        </mesh>
    </RigidBody>
  );
}

export default Endpoint;