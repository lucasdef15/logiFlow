import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { Model } from './Scene';

const HeroExperience = () => {
  return (
    <Canvas camera={{ position: [0, 2, 15], fov: 50 }} shadows>
      {/* Iluminação */}
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[10, 15, 10]}
        intensity={1.5}
        castShadow
        shadow-mapSize-width={512}
        shadow-mapSize-height={512}
        shadow-normalBias={0.01}
      />
      <pointLight
        position={[5, 5, 5]}
        intensity={1}
        color={0xadd8e6}
        distance={20}
      />
      <spotLight
        position={[0, 0, -10]}
        intensity={2}
        angle={Math.PI / 6}
        penumbra={0.5}
        color={0x00b7eb}
        distance={30}
      />
      <Environment preset='sunset' />

      {/* Controles */}
      <OrbitControls
        autoRotate
        autoRotateSpeed={0.5}
        minDistance={10}
        maxDistance={20}
      />

      {/* Objeto 3D */}
      <Model position={[0, 0, 0]} rotation={[0, Math.PI / 4, 0]} scale={90} />
    </Canvas>
  );
};

export default HeroExperience;
