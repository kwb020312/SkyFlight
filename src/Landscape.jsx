import { MeshReflectorMaterial, useGLTF } from "@react-three/drei";
import { useEffect, useMemo } from "react";
import { Color, MeshStandardMaterial } from "three";

const Landscape = (props) => {
  const { nodes, materials } = useGLTF("/assets/models/scene.glb");

  // 빛이 물에 반사되도록 설정(렌더링 비용이 크므로, memoization)
  const [lightsMaterial, waterMaterial] = useMemo(() => {
    return [
      new MeshStandardMaterial({
        envMapIntensity: 0,
        color: new Color("#ea6619"),
        roughness: 0,
        metalness: 0,
        emissive: new Color("#f6390f").multiplyScalar(1),
      }),
      <MeshReflectorMaterial
        transparent={true}
        opacity={0.6}
        color={"#23281b"}
        roughness={0}
        blur={[10, 10]}
        mixBlur={1}
        mixStrength={20}
        mixContrast={1.2}
        resolution={512}
        mirror={0}
        depthScale={0}
        minDepthThreshold={0}
        maxDepthThreshold={0.1}
        depthToBlurRatioBias={0.0025}
        debug={0}
        reflectorOffset={0.0}
      />,
    ];
  }, []);

  //   지면 및 나무의 색감과 반사도, 거칠기와 강도 설정
  useEffect(() => {
    const landscapeMat = materials["Material.009"];
    landscapeMat.envMapIntensity = 0.75;

    const treesMat = materials["Material.008"];
    treesMat.color = new Color("#2f2f13");
    treesMat.envMapIntensity = 0.3;
    treesMat.roughness = 1;
    treesMat.metalness = 0;
  }, [materials]);

  return (
    <group {...props} dispose={null}>
      {/* 지면 */}
      <mesh
        geometry={nodes.landscape_gltf.geometry}
        material={materials["Material.009"]}
        castShadow
        receiveShadow
      />
      {/* 지면 테두리 */}
      <mesh
        geometry={nodes.landscape_borders.geometry}
        material={materials["Material.010"]}
      />
      {/* 수목 */}
      <mesh
        geometry={nodes.trees_light.geometry}
        material={materials["Material.008"]}
        castShadow
        receiveShadow
      />
      {/* 빛 반사(수면) */}
      <mesh
        geometry={nodes.lights.geometry}
        material={lightsMaterial}
        castShadow
        receiveShadow
      />
      {/* 수면 */}
      <mesh
        position={[-2.536, 1.272, 0.79]}
        rotation={[-Math.PI * 0.5, 0, 0]}
        scale={[1.285, 1.285, 1]}
      >
        <planeGeometry args={[1, 1]} />
        {waterMaterial}
      </mesh>
      {/* 수면 */}
      <mesh
        position={[1.729, 0.943, 2.709]}
        rotation={[-Math.PI * 0.5, 0, 0]}
        scale={[3, 3, 1]}
      >
        <planeGeometry args={[1, 1]} />
        {waterMaterial}
      </mesh>
      {/* 수면 */}
      <mesh
        position={[0.415, 1.588, -2.275]}
        rotation={[-Math.PI * 0.5, 0, 0]}
        scale={[3.105, 2.405, 1]}
      >
        <planeGeometry args={[1, 1]} />
        {waterMaterial}
      </mesh>
    </group>
  );
};

useGLTF.preload("/assets/model/scene.glb");

export default Landscape;
