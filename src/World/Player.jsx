import React, { useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { RigidBody } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import { useKeyboardControls } from "@react-three/drei";
import useFirstPerson from "./hooks/useFirstPerson";
import useJump from "./hooks/useJump";
import useGame from "./stores/useGame";

// The Player component with forwardRef
const Player = React.forwardRef((props, ref) => {
  const player = useRef();
  const [subscribeKeys, getKeys] = useKeyboardControls();

  const start = useGame((state) => state.start);
  const end = useGame((state) => state.end);
  const restart = useGame((state) => state.restart);
  const respawn = useGame((state) => state.respawn);
  const blocksCount = useGame((state) => state.blocksCount);
  const checkpoint = useGame((state) => state.checkpoint);
  const setAudio = useGame((state) => state.setAudio);
  
  const audioFiles = ["/Tetris.mp3", "/FlORIDDEM.mp3", "/Granula4.mp3", "/KILLINGNAME.mp3", "/overthinking_V3.mp3", "/TEKHOUSE_V1.mp3", "/Tinnitus.mp3"];
  let currentIndex = Math.floor(Math.random() * audioFiles.length);
  const audio = new Audio(audioFiles[currentIndex]);
  audio.volume = 0.3;
  audio.addEventListener("ended", () => {
    currentIndex = (currentIndex + 1) % audioFiles.length;
    audio.src = audioFiles[currentIndex];
    audio.play();
  });


  useEffect(() => {
    setAudio(audio); // Stel de audio-instantie in de useGame store in

    const unsubscribeReset = useGame.subscribe(
      (state) => state.phase,
      (value) => {
        if (value === "ready") reset();
      }
    );

    const unsubscribeAny = subscribeKeys(() => {
      start();
      audio.play();
    });

    return () => {
      unsubscribeReset();
      unsubscribeAny();
    };
  }, []);

  useFrame((state) => {
    if (!player?.current) return;

    // Camera follows the player
    const { x, y, z } = player.current.translation();
    state.camera.position.set(x, y, z);

    const playerPos = player?.current?.translation();
    if (playerPos.z < -(blocksCount * 8 + 2)) {
      end();
    }

    if (y < -10) {
      respawnPlayer();
    }
  });

  useEffect(() => {
    console.log("checkpoint", checkpoint);
  }, [checkpoint]);

  const reset = () => {
    respawnPlayer();
    player.current.setLinvel({ x: 0, y: 0, z: 0 });
    player.current.setAngvel({ x: 0, y: 0, z: 0 });
  };

  const respawnPlayer = () => {
    respawn(); // Increment fails count without resetting the timer

    if (checkpoint) {
      player.current.setTranslation({
        x: checkpoint[0],
        y: checkpoint[1],
        z: checkpoint[2],
      });
    } else {
      player.current.setTranslation({ x: 0, y: 1, z: 0 });
    }
  };

  useJump(player, subscribeKeys);
  useFirstPerson(player);



  return (
    <RigidBody
      colliders="ball"
      ref={player} // Forward ref to RigidBody
      position={checkpoint}
      restitution={0.6}
      friction={0.5}
      linearDamping={0.25}
      angularDamping={0.5}
      {...props}
    >
      <mesh dispose={null} castShadow>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="blue" />
      </mesh>
    </RigidBody>
  );
});

export default Player;
