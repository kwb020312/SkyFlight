import { useState } from "react";
import { Vector3 } from "three";

function randomPoint(scale) {
  return new Vector3(
    Math.random() * 2 - 1,
    Math.random() * 2 - 1,
    Math.random() * 2 - 1
  ).multiply(scale || new Vector3(1, 1, 1));
}

const TARGET_RAD = 0.125;

const Targets = () => {
  const [targets, setTargets] = useState(() => {
    const arr = [];

    for (let i = 0; i < 25; i++) {
      arr.push({
        center: randomPoint(new Vector3(4, 1, 4)).add(
          new Vector3(0, 2 + Math.random() * 2, 0)
        ),
      });
    }

    return arr;
  });
  return (
    <>
      {targets.map((target, i) => (
        <mesh key={i} position={target.center}>
          <torusGeometry args={[TARGET_RAD, 0.02, 8, 25]} />
          <meshStandardMaterial roughness={0.5} metalness={0.5} />
        </mesh>
      ))}
    </>
  );
};

export default Targets;
