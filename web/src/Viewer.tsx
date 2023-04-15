import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from 'react-three-fiber';
import * as THREE from 'three';
import { Font, FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

interface TextProps {
  font: Font;
  position: [number, number, number];
  children: string;
}

const Text = (props: TextProps) => {
  const mesh = useRef<THREE.Mesh>(null);
  const geometry = useMemo(() => {
    const geom = new TextGeometry(props.children, {
      font: props.font,
      size: 80,
      height: 8,
      curveSegments: 12,
      bevelEnabled: true,
      bevelThickness: 0,
      bevelSize: 1,
      bevelOffset: 0,
      bevelSegments: 0,
    });
    geom.center();
    return geom;
  }, [props.children, props.font]);

  return (
    <mesh
      ref={mesh}
      position={props.position}
      geometry={geometry}
      material={new THREE.MeshStandardMaterial({ color: 'darkblue' })}
    />
  );
};
const Box = () => {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.x += 0.01;
      ref.current.rotation.y += 0.01;
    }
  });
  return (
    <mesh ref={ref}>
      <boxGeometry args={[350, 350, 350]} />
      <meshStandardMaterial color="hotpink" />
    </mesh>
  );
};

const Viewer: React.FC = () => {
  const [font, setFont] = useState<Font | null>(null);

  useEffect(() => {
    const loadFont = async () => {
      try {
        const fontLoader = new FontLoader();
        const loadedFont = await fontLoader.loadAsync(
          'https://threejs.org/examples/fonts/helvetiker_regular.typeface.json',
        );
        setFont(loadedFont);
      } catch (error) {
        return error;
      }
    };
    loadFont();
  }, []);

  if (!font) {
    return <div>Loading...</div>;
  }
  return (
    <Canvas camera={{ position: [0, 0, 700] }}>
      <ambientLight intensity={0.5} />
      <spotLight intensity={0.8} position={[300, 300, 400]} />
      <Box />
      <Text position={[0, -400, 100]} font={font}>
        Basic setup for Three.js with React
      </Text>
    </Canvas>
  );
};

export default Viewer;
