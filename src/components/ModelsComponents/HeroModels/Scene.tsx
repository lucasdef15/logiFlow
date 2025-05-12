import { useGLTF } from '@react-three/drei';
import type { ReactNode } from 'react';
import * as THREE from 'three';
export interface ModelProps extends React.ComponentProps<'group'> {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number | [number, number, number];
}

export function Model(props: ModelProps): ReactNode {
  const { nodes, materials } = useGLTF('/models/scene.glb');

  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={0.038}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <lineSegments
            geometry={(nodes.Object_10 as THREE.Mesh).geometry}
            material={materials.sat_earth_material}
          />
          <lineSegments
            geometry={(nodes.Object_12 as THREE.Mesh).geometry}
            material={materials.routes_material}
          />
          <lineSegments
            geometry={(nodes.Object_13 as THREE.Mesh).geometry}
            material={materials.routes_material}
          />
          <mesh
            geometry={(nodes.Object_15 as THREE.Mesh).geometry}
            material={materials.earth}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload('/models/scene.glb');
