import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Model } from './Speech';

const Testimo3d = () => {
  return (
    <Canvas
      camera={{ position: [0, 1, 2], fov: 50 }}
      shadows
      gl={{ antialias: true }}
      className='relative z-[1]'
    >
      {/* Lighting */}
      <ambientLight intensity={1} />
      <directionalLight
        position={[5, 10, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-bias={-0.0001}
        shadow-normalBias={0.01}
      />
      <hemisphereLight color='#ffffff' intensity={0.5} position={[0, 5, 0]} />
      <spotLight
        position={[0, 5, 5]}
        intensity={0.8}
        angle={Math.PI / 4}
        penumbra={0.5}
        color='#FF6666'
        castShadow
        shadow-mapSize-width={512}
        shadow-mapSize-height={512}
        distance={10}
      />
      <pointLight position={[0, 0, 0]} intensity={1} color='#FF6666' />
      <pointLight position={[0, 0, 0]} intensity={1} color='#FF6666' />

      {/* Background */}

      {/* Controls */}
      <OrbitControls
        autoRotate
        autoRotateSpeed={0.3}
        minDistance={1}
        maxDistance={2}
      />

      {/* 3D Object */}
      <Model position={[0, 0, 0]} rotation={[0, Math.PI / 4, 0]} scale={0.02} />
    </Canvas>
  );
};

export default Testimo3d;
