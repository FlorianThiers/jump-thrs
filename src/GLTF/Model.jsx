import { useGLTF } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';

export default function Map() {
  const map = useGLTF('/eindwerk-Makkelijk.glb');

  return (
    <RigidBody type="fixed">
      <primitive object={map.scene} scale={1} />
    </RigidBody>
  );
}



{/* <ModelViewer scale="40" modelPath={"../../public/eindwerk.glb"} /> */}