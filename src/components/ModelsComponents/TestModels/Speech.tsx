import { useGLTF } from '@react-three/drei';
import type { JSX } from 'react';
type GroupProps = JSX.IntrinsicElements['group'];
import * as THREE from 'three';

type GLTFResult = {
  nodes: {
    Object_3: THREE.Mesh;
    Object_5: THREE.Mesh;
    Object_6: THREE.Mesh;
    Object_7: THREE.Mesh;
    Object_8: THREE.Mesh;
  };
  materials: {
    material_0: THREE.Material;
    material_1: THREE.Material;
  };
};

export function Model(props: GroupProps) {
  const { nodes, materials } = useGLTF(
    '/models/speech.glb'
  ) as unknown as GLTFResult;

  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <mesh
          geometry={nodes.Object_3.geometry}
          material={materials.material_1}
        />
        <mesh
          geometry={nodes.Object_5.geometry}
          material={materials.material_0}
        />
        <mesh
          geometry={nodes.Object_6.geometry}
          material={materials.material_0}
        />
        <mesh
          geometry={nodes.Object_7.geometry}
          material={materials.material_0}
        />
        <mesh
          geometry={nodes.Object_8.geometry}
          material={materials.material_0}
        />
      </group>
    </group>
  );
}

useGLTF.preload('/models/speech.glb');
