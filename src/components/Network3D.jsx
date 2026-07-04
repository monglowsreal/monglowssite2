import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';

function LiquidBrain(props) {
  const meshRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    // Gentle floating rotation
    meshRef.current.rotation.x = time * 0.2;
    meshRef.current.rotation.y = time * 0.3;

    // Interactive tilt based on mouse
    const targetX = (state.pointer.x * Math.PI) / 4;
    const targetY = (state.pointer.y * Math.PI) / 4;
    meshRef.current.rotation.x += (targetY - meshRef.current.rotation.x) * 0.05;
    meshRef.current.rotation.y += (targetX - meshRef.current.rotation.y) * 0.05;
  });

  return (
    <Sphere ref={meshRef} args={[2.5, 64, 64]} {...props}>
      <MeshDistortMaterial
        color="#A78BFA" // Lighter, brighter purple for better visibility
        attach="material"
        distort={0.4} 
        speed={2} 
        roughness={0.1}
        metalness={1}
        wireframe={true} 
      />
    </Sphere>
  );
}

export default function Network3D() {
  return (
    <div className="absolute inset-0 w-full h-full z-0 opacity-80 mix-blend-screen pointer-events-auto">
      <Canvas 
        camera={{ position: [0, 0, 5] }} 
        dpr={[1, 2]} 
      >
        <ambientLight intensity={1.5} />
        <directionalLight position={[10, 10, 10]} intensity={3} color="#C4B5FD" />
        <directionalLight position={[-10, -10, -10]} intensity={1.5} color="#34D399" />
        <LiquidBrain />
      </Canvas>
    </div>
  );
}
