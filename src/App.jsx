import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import SphereEnv from "./SphereEnv";
import Landscape from "./Landscape";
import Airplane from "./Airplane";
import Targets from "./Targets";

function App() {
  return (
    <>
      <SphereEnv />
      <Environment background={false} files={"/assets/textures/envmap.hdr"} />

      {/* 카메라를 구체보다 가까이 위치하게 하고 컨트롤러를 구 내부에 위치함으로써 */}
      {/* 구체 표면 모델이 마치 풍경이 된 것 같은 효과를 줌 */}
      <PerspectiveCamera makeDefault position={[0, 10, 10]} />
      {/* <OrbitControls target={[0, 0, 0]} /> */}

      {/* 지면 데이터 총괄 */}
      <Landscape />
      {/* 비행기 모델 */}
      <Airplane />
      {/* 타겟 원형 영역 */}
      <Targets />

      <directionalLight
        castShadow
        color={"#f3d29a"}
        intensity={2}
        position={[10, 5, 4]}
        shadow-bias={-0.0005}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={0.01}
        shadow-camera-far={20}
        shadow-camera-top={6}
        shadow-camera-bottom={-6}
        shadow-camera-left={-6.2}
        shadow-camera-right={6.4}
      />
    </>
  );
}

export default App;
