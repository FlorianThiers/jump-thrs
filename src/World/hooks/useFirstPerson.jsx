
import { useFrame } from '@react-three/fiber';
import { useKeyboardControls } from '@react-three/drei';
import * as THREE from 'three';

const useFirstPerson = (player) => {

    const [, get] = useKeyboardControls();
    const [subscribeKeys, getKeys] = useKeyboardControls();
    const direction = new THREE.Vector3();
    const frontVector = new THREE.Vector3();
    const sideVector = new THREE.Vector3();

    useFrame((state) => {

        if (!player.current) return;

        const currentVelocity = player.current.linvel();

        frontVector.set(0, 0, get().backward - get().forward);
        sideVector.set(get().left - get().right, 0, 0);

        direction
        .subVectors(frontVector, sideVector)
        .normalize()
        .multiplyScalar(10)
        .applyEuler(state.camera.rotation);

        player.current.wakeUp();
        player.current.setLinvel({
        x: direction.x,
        y: currentVelocity.y,
        z: direction.z,
        });

    });

}

export default useFirstPerson;