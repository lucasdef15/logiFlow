import { useGLTF } from '@react-three/drei';
import type {
  MathProps,
  ReactProps,
  EventHandlers,
  InstanceProps,
} from '@react-three/fiber';
import type {
  Mutable,
  Overwrite,
} from '@react-three/fiber/dist/declarations/src/core/utils';
import type { JSX } from 'react/jsx-runtime';
import type { Group, Object3DEventMap } from 'three';
import * as THREE from 'three';

export function Model(
  props: JSX.IntrinsicAttributes &
    Mutable<
      Overwrite<
        Partial<
          Overwrite<
            Group<Object3DEventMap>,
            MathProps<Group<Object3DEventMap>> &
              ReactProps<Group<Object3DEventMap>> &
              Partial<EventHandlers>
          >
        >,
        Omit<InstanceProps<Group<Object3DEventMap>, Group>, 'object'>
      >
    >
) {
  const { nodes, materials } = useGLTF('/models/drone.glb');
  return (
    <group {...props} args={[]} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <mesh
          geometry={(nodes.Object_2 as THREE.Mesh).geometry}
          material={materials.Cargo}
        />
        <mesh
          geometry={(nodes.Object_3 as THREE.Mesh).geometry}
          material={materials.Drone}
        />
        <mesh
          geometry={(nodes.Object_4 as THREE.Mesh).geometry}
          material={materials.Flaps}
        />
      </group>
    </group>
  );
}

useGLTF.preload('/models/drone.glb');
