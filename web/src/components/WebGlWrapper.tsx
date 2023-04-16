// GlWrapper.js
import React, { FC } from 'react';
import { Canvas } from 'react-three-fiber';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
type Props = {
  children: React.ReactNode;
};
const WebGlWrapper: FC<Props> = ({ children }) => (
  <Canvas
    shadows
    camera={{ position: [0, 0, 2], fov: 60 }}
    onCreated={({ gl }) => {
      gl.shadowMap.enabled = true;
      gl.shadowMap.type = THREE.PCFSoftShadowMap;
    }}
  >
    {children}
    <primitive object={OrbitControls} />
  </Canvas>
);

export default WebGlWrapper;
