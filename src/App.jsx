import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import SphereEnv from "./SphereEnv";

function App() {
  return (
    <>
      <SphereEnv />
      <Environment background={false} files={"/assets/textures/envmap.hdr"} />

      {/* 카메라를 구체보다 가까이 위치하게 하고 컨트롤러를 구 내부에 위치함으로써 */}
      {/* 구체 표면 모델이 마치 풍경이 된 것 같은 효과를 줌 */}
      <PerspectiveCamera makeDefault position={[0, 10, 10]} />
      <OrbitControls target={[0, 0, 0]} />
    </>
  );
}

export default App;
