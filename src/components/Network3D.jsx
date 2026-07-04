import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';

function ParticleSwarm(props) {
  const ref = useRef();
  // Create 3000 points in a sphere
  const sphere = useMemo(() => random.inSphere(new Float32Array(3000), { radius: 1.5 }), []);

  useFrame((state, delta) => {
    // Slow base rotation
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
    
    // Interactive tilt based on mouse/touch pointer
    // state.pointer holds normalized device coordinates (-1 to +1) for both mouse and touch
    const targetX = (state.pointer.x * Math.PI) / 4;
    const targetY = (state.pointer.y * Math.PI) / 4;
    
    // Smoothly interpolate current rotation towards pointer target for interactivity
    ref.current.rotation.x += (targetY - ref.current.rotation.x) * 0.02;
    ref.current.rotation.y += (targetX - ref.current.rotation.y) * 0.02;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color="#8B5CF6" // Neon Purple accent to match the site's primary accent
          size={0.005}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

export default function Network3D() {
  return (
    <div className="absolute inset-0 w-full h-full z-0 opacity-60 mix-blend-screen pointer-events-auto">
      <Canvas 
        camera={{ position: [0, 0, 1] }} 
        dpr={[1, 2]} // Caps pixel ratio at 2 for performance, great for mobile
        gl={{ antialias: false }} // Turn off antialias for performance since particles are tiny
      >
        <ParticleSwarm />
      </Canvas>
    </div>
  );
}
