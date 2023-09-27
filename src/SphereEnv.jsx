import { useTexture } from "@react-three/drei";
import { BackSide } from "three";

const SphereEnv = () => {
  const map = useTexture("/assets/textures/envmap.jpg");
  return (
    // 거대한 구를 그린다. 이는 즉 구 내부에 우리가 위치함을 의미하며
    // 인간의 시야와 비슷하도록 360도 배경화면을 적용하는것에 주로 사용되는 기법
    <mesh>
      <sphereGeometry args={[60, 50, 60]} />
      <meshBasicMaterial side={BackSide} map={map} />
    </mesh>
  );
};

export default SphereEnv;
