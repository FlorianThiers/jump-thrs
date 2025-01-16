import React, { useEffect, useRef, useState } from "react";
import { RigidBody } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import useGame from "../stores/useGame";

const BlockAxe = ({
  position = [0, 0, 0],
  geometry,
  material,
  obstacleMaterial,
}) => {
  const obstacle = useRef();
  const [timeOffset] = useState(() => Math.random() * Math.PI * 2);

  const restart = useGame((state) => state.restart);
  const laugh = useGame((state) => state.laugh);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    const x = Math.sin(time + timeOffset) * 1.25;
    if (obstacle.current) {
      obstacle.current.setNextKinematicTranslation({
        x: position[0] + x,
        y: position[1] + 0.75,
        z: position[2],
      });
    }
  }, []);

  return (
    <group position={position}>
      <mesh
        position={[0, 0.1, 0]}
        scale={[4, 0.2, 4]}as
        geometry={geometry}
        material={material}
        receiveShadow
      />
      <RigidBody
      onCollisionEnter={() => {
       
        restart();
        laugh.currentTime = 0.5;
        laugh.play();
      }}
        ref={obstacle}
        type="kinematicPosition"
        friction={0}
        restitution={0.2}
      >
        <mesh
          castShadow
          receiveShadow
          position={[0, 0.3, 0]}
          geometry={geometry}
          material={obstacleMaterial}
          scale={[1.5, 1.5, 0.3]}
        />
      </RigidBody>
    </group>
  );
};

export default BlockAxe;
