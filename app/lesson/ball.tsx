// Ball3D.tsx
import React, { useRef } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import { Sphere } from '@react-three/drei';

const Ball3D: React.FC = () => {
  const ballRef = useRef<any>(null);

  // Load the textures
  const textures = [
    useLoader(TextureLoader, '/planet/textures/Planet_baseColor.png'),
    useLoader(TextureLoader, '/planet/textures/Clouds_baseColor.png'),
  ];

  useFrame(() => {
    if (ballRef.current) {
      ballRef.current.rotation.y += 0.01;
    }
  });

  return (
    <Canvas style={{ height: '100px', width: '100px' }}>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Sphere ref={ballRef} args={[1, 32, 32]}>
        <meshStandardMaterial map={textures[0]} />
      </Sphere>
    </Canvas>
  );
};

export default Ball3D;
