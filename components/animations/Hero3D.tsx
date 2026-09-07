"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Line } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import type { Points, Group, Mesh } from "three";

const R = 1.62;

/** Evenly distributed points on a sphere (Fibonacci lattice). */
function fibSphere(n: number, r: number) {
  const out: THREE.Vector3[] = [];
  const golden = Math.PI * (1 + Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const phi = Math.acos(1 - (2 * (i + 0.5)) / n);
    const theta = golden * i;
    out.push(
      new THREE.Vector3(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.cos(phi),
        r * Math.sin(phi) * Math.sin(theta)
      )
    );
  }
  return out;
}

function DotGlobe({ surface }: { surface: THREE.Vector3[] }) {
  const ref = useRef<Points>(null);
  const geo = useMemo(() => {
    const arr = new Float32Array(surface.length * 3);
    surface.forEach((p, i) => {
      arr[i * 3] = p.x;
      arr[i * 3 + 1] = p.y;
      arr[i * 3 + 2] = p.z;
    });
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(arr, 3));
    return g;
  }, [surface]);

  useFrame((s) => {
    if (ref.current) ref.current.rotation.y = s.clock.elapsedTime * 0.09;
  });

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial size={0.03} color="#8f7ce0" sizeAttenuation transparent opacity={0.85} depthWrite={false} />
    </points>
  );
}

/** A glowing signal travelling along a great-circle-ish arc between two nodes. */
function Arc({ a, b, color, speed, offset }: { a: THREE.Vector3; b: THREE.Vector3; color: string; speed: number; offset: number }) {
  const curve = useMemo(() => {
    const mid = a.clone().add(b).multiplyScalar(0.5).normalize().multiplyScalar(R + 0.85);
    return new THREE.QuadraticBezierCurve3(a, mid, b);
  }, [a, b]);
  const pts = useMemo(() => curve.getPoints(48).map((p) => [p.x, p.y, p.z] as [number, number, number]), [curve]);
  const dot = useRef<Mesh>(null);

  useFrame((s) => {
    const t = (s.clock.elapsedTime * speed + offset) % 1;
    const p = curve.getPoint(t);
    if (dot.current) dot.current.position.set(p.x, p.y, p.z);
  });

  return (
    <group>
      <Line points={pts} color={color} lineWidth={1.4} transparent opacity={0.5} />
      <mesh ref={dot}>
        <sphereGeometry args={[0.045, 12, 12]} />
        <meshBasicMaterial color={color} toneMapped={false} />
      </mesh>
    </group>
  );
}

function Scene() {
  const grp = useRef<Group>(null);
  const surface = useMemo(() => fibSphere(820, R), []);

  const arcs = useMemo(() => {
    const p = (i: number) => surface[i % surface.length];
    return [
      { a: p(24), b: p(540), color: "#3ab54a", speed: 0.17, offset: 0 },
      { a: p(300), b: p(760), color: "#69d97a", speed: 0.13, offset: 0.35 },
      { a: p(120), b: p(440), color: "#8f7ce0", speed: 0.2, offset: 0.7 },
      { a: p(640), b: p(180), color: "#3ab54a", speed: 0.15, offset: 0.5 },
    ];
  }, [surface]);

  // Endpoint "city" nodes (slightly larger, green).
  const nodes = useMemo(() => {
    const set = new Set<number>([24, 540, 300, 760, 120, 440, 640, 180]);
    return [...set].map((i) => surface[i]);
  }, [surface]);

  useFrame((s) => {
    if (grp.current) {
      grp.current.rotation.y += (s.pointer.x * 0.4 - grp.current.rotation.y) * 0.04;
      grp.current.rotation.x += (-s.pointer.y * 0.25 - grp.current.rotation.x) * 0.04;
    }
  });

  return (
    <group ref={grp}>
      <Float speed={1.1} rotationIntensity={0.25} floatIntensity={0.55}>
        <DotGlobe surface={surface} />
        {/* faint wireframe shell for depth */}
        <mesh>
          <icosahedronGeometry args={[R, 2]} />
          <meshBasicMaterial color="#3ab54a" wireframe transparent opacity={0.06} />
        </mesh>
        {nodes.map((n, i) => (
          <mesh key={i} position={[n.x, n.y, n.z]}>
            <sphereGeometry args={[0.035, 10, 10]} />
            <meshBasicMaterial color="#3ab54a" toneMapped={false} />
          </mesh>
        ))}
        {arcs.map((a, i) => (
          <Arc key={i} {...a} />
        ))}
      </Float>
    </group>
  );
}

export default function Hero3D() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 4.6], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ width: "100%", height: "100%" }}
    >
      <Scene />
    </Canvas>
  );
}
