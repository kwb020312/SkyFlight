import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Matrix4, Quaternion, Vector3 } from "three";
import { updatePlaneAxis } from "./controls";

const x = new Vector3(1, 0, 0);
const y = new Vector3(0, 1, 0);
const z = new Vector3(0, 0, 1);

export const planePosition = new Vector3(0, 3, 7);

const delayedRotMatrix = new Matrix4();
const delayedQuaternion = new Quaternion();

// 모델을 만드신 berilbasak님께 감사드립니다.
const Airplane = (props) => {
  const { nodes, materials } = useGLTF("/assets/models/airplane.glb");
  const groupRef = useRef();
  const helixMeshRef = useRef();

  // 비행기의 시작점 위치를 4차원 벡터 행렬을 사용하여 위치시킴
  useFrame(({ camera }) => {
    updatePlaneAxis(x, y, z, planePosition, camera);

    const rotMatrix = new Matrix4().makeBasis(x, y, z);

    const matrix = new Matrix4()
      .makeTranslation(planePosition.x, planePosition.y, planePosition.z)
      .multiply(rotMatrix);

    groupRef.current.matrixAutoUpdate = false;
    groupRef.current.matrix.copy(matrix);
    groupRef.current.matrixWorldNeedsUpdate = true;

    let quaternionA = new Quaternion().copy(delayedQuaternion);
    let quaternionB = new Quaternion();
    quaternionB.setFromRotationMatrix(rotMatrix);

    let interpolationFactor = 0.175;
    let interpolatedQuaternion = new Quaternion().copy(quaternionA);
    interpolatedQuaternion.slerp(quaternionB, interpolationFactor);
    delayedQuaternion.copy(interpolatedQuaternion);

    delayedRotMatrix.identity();
    delayedRotMatrix.makeRotationFromQuaternion(delayedQuaternion);

    const cameraMatrix = new Matrix4()
      .multiply(
        new Matrix4().makeTranslation(
          planePosition.x,
          planePosition.y,
          planePosition.z
        )
      )
      .multiply(rotMatrix)
      .multiply(new Matrix4().makeRotationX(-0.2))
      .multiply(new Matrix4().makeTranslation(0, 0.015, 0.3));

    camera.matrixAutoUpdate = false;
    camera.matrix.copy(cameraMatrix);
    camera.matrixWorldNeedsUpdate = true;

    helixMeshRef.current.rotation.z -= 1.0;
  });

  return (
    <>
      <group ref={groupRef} position={[0, 0, 0]}>
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
