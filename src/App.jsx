import React, { Suspense, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  KeyboardControls,
  PointerLockControls,
} from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import Player from "./World/Player";
import "./style.css";

import Map from "./GLTF/Model.jsx";
import World from "./World/World.jsx";
import Interfase from "./World/Interface.jsx";
import Envi from "./World/Environment.jsx";
import LoadingScreen from "./World/Loader.jsx";
import IntroScreen from "./World/IntroScreen/IntroScreen.jsx";

const keyboardMap = [
  { name: "forward", keys: ["KeyW"] },
  { name: "backward", keys: ["KeyS"] },
  { name: "left", keys: ["KeyA"] },
  { name: "right", keys: ["KeyD"] },
  { name: "jump", keys: ["Space"] },
];

// Hoofdscene met physics en controls
function Scene() {
  const [selectedEnvironment, setSelectedEnvironment] = useState("hdr/autumn_field_puresky_4k.hdr");
  const [showIntroScreen, setShowIntroScreen] = useState(true);

  const handleReady = () => {
    setShowIntroScreen(false);
  };

  
  return (
    <>
      <KeyboardControls map={keyboardMap}>
        {showIntroScreen && <IntroScreen onReady={handleReady} />}
        {!showIntroScreen && (
          <Canvas>
            <Suspense fallback={<LoadingScreen />}>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} />
              <Physics>
                <Player />
                <World />
                <Map />
              </Physics>
              <PointerLockControls />
              <Envi selectedEnvironment={selectedEnvironment} />
            </Suspense>
          </Canvas>
        )}
        <Interfase setSelectedEnvironment={setSelectedEnvironment} />
      </KeyboardControls>
    </>
  );
}

export default Scene;
