import React from "react";
import { RigidBody } from "@react-three/rapier";

function Ground() {
  return (
    <RigidBody type="fixed">
      <mesh
        receiveShadow
        rotation={[-Math.PI / 2, 0, 0]}
        position={[20, -1, -20]}
      >
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color="gray" />
      </mesh>
    </RigidBody>
  );
}




export default Ground ;  
