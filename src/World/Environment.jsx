import {
  Environment,
  Lightformer,
  useHelper,
} from "@react-three/drei";
import React, { useRef } from "react";
import * as THREE from "three";

const Envi = ({ selectedEnvironment }) => {
    const directionalLightRef = useRef();
    useHelper(directionalLightRef, THREE.DirectionalLightHelper, 1);

    return (
      <>
        <Environment
          background
          receiveShadow
          files={selectedEnvironment} // Use the selected environment
          resolution={1024}
          ground={{
            intensity: {value: 0},
            height: {value: 0},
            radius: {value: 0},
            scale: {value: 0},
          }}
        >
          <color args={["#000000"]} attach="background" />
          <Lightformer
            position-z={-5}
            scale={5}
            color="red"
            intensity={1}
            form="ring"
          />
        </Environment>
      </>
    );
  };

export default Envi;
