import { useRapier } from "@react-three/rapier";
import { useEffect } from "react";

const useJump = (playerRef, subscribeKeys) => {
  const { rapier, world } = useRapier();
  const jump = () => {
    if (!playerRef.current) return;
    const origin = playerRef.current.translation();
    console.log(origin)
    origin.y -= 0.51; // Offset slightly to check below
    const direction = { x: 0, y: -1, z: 0 };
    const ray = new rapier.Ray(origin, direction);
    const hit = world.castRay(ray, 10, true);
    // console.log(hit.timeOfImpact)

    if (hit && hit.timeOfImpact < 0.1) {
      playerRef.current.applyImpulse({ x: 0, y: 5, z: 0 });
    }
  };

  // Handle jump control subscription
  useEffect(() => {
    const unsubscribeJump = subscribeKeys(
      (state) => state.jump,
      (value) => {
        if (value) {
          jump();
        }
      }
    );

    return () => {
      unsubscribeJump();
    };
  }, []);
};

export default useJump;
