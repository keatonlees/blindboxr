import { Environment } from "@react-three/drei";
import React from "react";

export default function Lights() {
  return (
    <>
      {/* <fog attach="fog" args={["#fff", 0, 22]} /> */}
      <Environment preset="sunset" />

      <ambientLight intensity={0.3} />
      <directionalLight
        position={[5, 5, 5]}
        intensity={1}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <directionalLight position={[-5, 3, -5]} intensity={0.5} />

      <pointLight position={[0, 50, 0]} intensity={2} />
    </>
  );
}
