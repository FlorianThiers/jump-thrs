import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import * as THREE from "three";

export default create(
  subscribeWithSelector((set) => {
    return {
      blocksSeed: 0,
      startTime: 0,
      endTime: 0,
      fails: 0,
      laugh : new Audio('/laugh.mp3'),
      checkpoint: [0, 100, 0], // Voeg checkpoint toe
      gamemode: "normal", // Voeg gamemode toe
      environment: "autumn_field_puresky_4k.hdr",
      audio: null, // Voeg audio state toe

      /**
       * Phases
       */
      phase: "ready",

      setCheckpoint: (newCheckpoint) => set((state) => ({ checkpoint: newCheckpoint })),
      setGamemode: (mode) => set((state) => ({ gamemode: mode })),
      setEnvironment: (env) => set((state) => ({ environment: env })),
      setAudio: (audio) => set({ audio }), // Voeg setAudio functie toe

      start: () => {
        set((state) => {
          if (state.phase === "ready") {
            return { phase: "playing", startTime: Date.now() };
          }
          return {};
        });
      },
      respawn: () => {
        set((state) => {
          return { fails: state.fails + 1 };
        });
      },
      restart: () => {
        set((state) => {
          return {
            phase: "ready",
            startTime: Date.now(),
            fails: 0,
            blocksSeed: Math.random(),
            checkpoint: (0, 1, 0), // Reset checkpoint
          };
        });
      },
      end: () => {
        set((state) => {
          if (state.phase === "playing") {
            return { phase: "ended", endTime: Date.now() };
          }
          return {};
        });
      },
      pause: () => {
        set((state) => {
          if (state.phase === "playing") {
            return { phase: "paused", endTime: Date.now() };
          } else if (state.phase === "paused") {
            return { phase: "playing", startTime: Date.now() - (state.endTime - state.startTime) };
          }
          return {};
        });
      },
    };
  })
);
