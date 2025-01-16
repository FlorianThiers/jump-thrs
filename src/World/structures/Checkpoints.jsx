import React, { useRef, useState } from 'react';
import { RigidBody } from '@react-three/rapier';
import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import useGame from '../stores/useGame';

function Checkpoint({ position }) {
  const checkpointRef = useRef();
  const setCheckpoint = useGame((state) => state.setCheckpoint);
  const [isTriggered, setIsTriggered] = useState(false);
  const texture = useLoader(THREE.TextureLoader, '/portalENcheckpoint/dczsu6j-8cb4ff68-a26a-4a12-9f20-83411c85eaf4.png');

  const handleCollisionEnter = () => {
    setCheckpoint(position);
    setIsTriggered(true);
  };

  return (
    (!isTriggered) && <RigidBody
      ref={checkpointRef}
      type="fixed"
      position={position}
      sensor
      onIntersectionEnter={() => handleCollisionEnter()}
    >
      <mesh>
        <cylinderGeometry args={[0.51, 0.51, 0.01, 32]} />
        <meshStandardMaterial map={texture} />
      </mesh>
    </RigidBody>
  );
}

export default Checkpoint;