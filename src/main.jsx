import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Canvas shadows>
    <Suspense fallback={null}>
      <App />
    </Suspense>
  </Canvas>
);
