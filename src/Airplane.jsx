import { useGLTF } from "@react-three/drei";
import { useRef } from "react";

// 모델을 만드신 berilbasak님께 감사드립니다.
const Airplane = (props) => {
  const { nodes, materials } = useGLTF("/assets/models/airplane.glb");
  const groupRef = useRef();
  const helixMeshRef = useRef();

  return (
    <>
      <group ref={groupRef}>
        <group {...props} dispose={null} scale={0.01} rotation-y={Math.PI}>
          <mesh
            geometry={nodes.supports.geometry}
            material={materials["Material.004"]}
          />
          <mesh
            geometry={nodes.chassis.geometry}
            material={materials["Material.005"]}
          />
          <mesh
            geometry={nodes.helix.geometry}
            material={materials["Material.005"]}
            ref={helixMeshRef}
          />
        </group>
      </group>
    </>
  );
};

export default Airplane;
