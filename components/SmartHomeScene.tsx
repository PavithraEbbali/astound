"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, RoundedBox } from "@react-three/drei";
import { useMemo, useRef, type ReactNode } from "react";
import * as THREE from "three";

// Palette (JS equivalent of CSS variables for the WebGL layer).
const C = {
  houseLight: "#8b6fd6",
  housePurple: "#6b46c1",
  roof: "#4c2e94",
  teal: "#0dcfcf",
  cyan: "#22e0e0",
  grass: "#27c39a",
  platform: "#b3a9e6",
  platformTop: "#cfc8f0",
  cablePurple: "#7c3aed",
  cableTeal: "#0dcfcf",
  trunk: "#7a5230",
  foliage: "#34b97e",
  robot: "#dde1ec",
  robotDark: "#5b5470",
  solar: "#1b2333",
  white: "#f4f3fb",
};

/** Wraps a group and springs it up from y = -3 to 0 with a stagger delay. */
function RisingPart({ delay = 0, children }: { delay?: number; children: ReactNode }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const p = Math.min(1, Math.max(0, (state.clock.elapsedTime - delay) / 0.7));
    const e = 1 - Math.pow(1 - p, 3); // easeOutCubic
    ref.current.position.y = (1 - e) * -3;
  });
  return (
    <group ref={ref} position={[0, -3, 0]}>
      {children}
    </group>
  );
}

/** Emissive window that pulses its glow. */
function Win({ position, args = [0.04, 0.55, 0.42], speed = 2, phase = 0 }: { position: [number, number, number]; args?: [number, number, number]; speed?: number; phase?: number }) {
  const m = useRef<THREE.MeshStandardMaterial>(null);
  useFrame((s) => {
    if (m.current) m.current.emissiveIntensity = 0.7 + Math.sin(s.clock.elapsedTime * speed + phase) * 0.45;
  });
  return (
    <mesh position={position}>
      <boxGeometry args={args} />
      <meshStandardMaterial ref={m} color={C.cyan} emissive={C.cyan} emissiveIntensity={0.9} toneMapped={false} />
    </mesh>
  );
}

function WifiRing({ delay, color, y }: { delay: number; color: string; y: number }) {
  const ref = useRef<THREE.Mesh>(null);
  const m = useRef<THREE.MeshStandardMaterial>(null);
  useFrame((s) => {
    const t = (s.clock.elapsedTime * 0.5 + delay) % 1;
    const sc = 0.15 + t * 1.25;
    ref.current?.scale.set(sc, sc, sc);
    if (m.current) m.current.opacity = Math.max(0, 1 - t);
  });
  return (
    <mesh ref={ref} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[0.5, 0.03, 8, 32]} />
      <meshStandardMaterial ref={m} color={color} emissive={color} emissiveIntensity={1.1} transparent opacity={1} toneMapped={false} />
    </mesh>
  );
}

function Tree({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.25, 0]}>
        <cylinderGeometry args={[0.06, 0.09, 0.5, 8]} />
        <meshStandardMaterial color={C.trunk} />
      </mesh>
      <mesh position={[0, 0.62, 0]}>
        <coneGeometry args={[0.28, 0.7, 12]} />
        <meshStandardMaterial color={C.foliage} />
      </mesh>
    </group>
  );
}

function Robot({ position, phase = 0 }: { position: [number, number, number]; phase?: number }) {
  const g = useRef<THREE.Group>(null);
  useFrame((s) => {
    if (g.current) g.current.position.y = position[1] + Math.sin(s.clock.elapsedTime * 2 + phase) * 0.08;
  });
  return (
    <group ref={g} position={position}>
      <mesh position={[0, 0.24, 0]}><boxGeometry args={[0.3, 0.34, 0.24]} /><meshStandardMaterial color={C.robot} metalness={0.3} roughness={0.45} /></mesh>
      <mesh position={[0, 0.54, 0]}><boxGeometry args={[0.26, 0.22, 0.23]} /><meshStandardMaterial color={C.robot} metalness={0.3} roughness={0.4} /></mesh>
      <mesh position={[0, 0.55, 0.12]}><boxGeometry args={[0.17, 0.07, 0.02]} /><meshStandardMaterial color={C.teal} emissive={C.teal} emissiveIntensity={1.3} toneMapped={false} /></mesh>
      <mesh position={[-0.17, 0.27, 0]}><boxGeometry args={[0.06, 0.2, 0.06]} /><meshStandardMaterial color={C.robotDark} /></mesh>
      <mesh position={[0.17, 0.27, 0]}><boxGeometry args={[0.06, 0.2, 0.06]} /><meshStandardMaterial color={C.robotDark} /></mesh>
    </group>
  );
}

function Solar({ position }: { position: [number, number, number] }) {
  const m = useRef<THREE.MeshStandardMaterial>(null);
  useFrame((s) => {
    if (m.current) m.current.emissiveIntensity = 0.08 + Math.abs(Math.sin(s.clock.elapsedTime * 0.8)) * 0.18;
  });
  return (
    <mesh position={position} rotation={[-0.12, 0, 0]}>
      <boxGeometry args={[0.66, 0.04, 0.46]} />
      <meshStandardMaterial ref={m} color={C.solar} emissive={C.cyan} emissiveIntensity={0.12} metalness={0.6} roughness={0.3} />
    </mesh>
  );
}

function Orb({ position }: { position: [number, number, number] }) {
  const m = useRef<THREE.MeshStandardMaterial>(null);
  useFrame((s) => {
    if (m.current) m.current.emissiveIntensity = 1.1 + Math.sin(s.clock.elapsedTime * 2) * 0.6;
  });
  return (
    <group position={position}>
      <mesh><cylinderGeometry args={[0.42, 0.5, 0.16, 24]} /><meshStandardMaterial color={C.platformTop} metalness={0.2} /></mesh>
      <mesh position={[0, 0.26, 0]}><sphereGeometry args={[0.26, 24, 24]} /><meshStandardMaterial ref={m} color={C.teal} emissive={C.teal} emissiveIntensity={1.4} toneMapped={false} /></mesh>
    </group>
  );
}

function Cable({ z, y, color, speed, offset }: { z: number; y: number; color: string; speed: number; offset: number }) {
  const curve = useMemo(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(-9, y, z + 0.5),
        new THREE.Vector3(-4, y + 0.1, z),
        new THREE.Vector3(-1.5, y, z * 0.6),
        new THREE.Vector3(1.5, y, z * 0.6),
        new THREE.Vector3(4, y + 0.1, z),
        new THREE.Vector3(9, y, z + 0.5),
      ]),
    [z, y]
  );
  const dot = useRef<THREE.Mesh>(null);
  useFrame((s) => {
    const t = (s.clock.elapsedTime * speed + offset) % 1;
    const p = curve.getPoint(t);
    dot.current?.position.set(p.x, p.y, p.z);
  });
  return (
    <group>
      <mesh>
        <tubeGeometry args={[curve, 100, 0.05, 8, false]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.1} toneMapped={false} roughness={0.5} />
      </mesh>
      <mesh ref={dot}>
        <sphereGeometry args={[0.1, 12, 12]} />
        <meshBasicMaterial color={color} toneMapped={false} />
      </mesh>
    </group>
  );
}

const CABLES = [
  { z: 1.5, y: -0.5, color: C.cablePurple, speed: 0.16, offset: 0 },
  { z: 2.1, y: -0.7, color: C.cablePurple, speed: 0.13, offset: 0.3 },
  { z: 1.0, y: -0.3, color: C.cablePurple, speed: 0.2, offset: 0.6 },
  { z: -1.5, y: -0.5, color: C.cableTeal, speed: 0.15, offset: 0.1 },
  { z: -2.1, y: -0.7, color: C.cableTeal, speed: 0.18, offset: 0.45 },
  { z: -1.0, y: -0.3, color: C.cableTeal, speed: 0.12, offset: 0.75 },
];

function House() {
  return (
    <group>
      {/* main tall block */}
      <RoundedBox args={[1.8, 1.7, 1.6]} radius={0.05} smoothness={4} position={[-0.5, 0.95, -0.2]}>
        <meshStandardMaterial color={C.houseLight} roughness={0.6} />
      </RoundedBox>
      {/* lower wing */}
      <RoundedBox args={[1.5, 1.05, 1.5]} radius={0.05} smoothness={4} position={[1.1, 0.62, 0.3]}>
        <meshStandardMaterial color={C.housePurple} roughness={0.6} />
      </RoundedBox>
      {/* roof terrace grass on wing */}
      <RoundedBox args={[1.5, 0.1, 1.5]} radius={0.04} position={[1.1, 1.18, 0.3]}>
        <meshStandardMaterial color={C.grass} roughness={0.9} />
      </RoundedBox>

      {/* windows on main block front (+z) */}
      <Win position={[-1.05, 1.0, 0.61]} args={[0.04, 0.6, 0.42]} phase={0} />
      <Win position={[-0.5, 1.0, 0.61]} args={[0.04, 0.6, 0.42]} phase={1.2} />
      <Win position={[0.05, 1.0, 0.61]} args={[0.04, 0.6, 0.42]} phase={2.1} />
      {/* side window */}
      <Win position={[-1.41, 1.0, -0.2]} args={[0.42, 0.55, 0.04]} phase={0.6} />
      {/* wing window */}
      <Win position={[1.86, 0.65, 0.3]} args={[0.42, 0.5, 0.04]} phase={1.7} />

      {/* door */}
      <mesh position={[0.5, 0.55, 1.06]}><boxGeometry args={[0.4, 0.9, 0.06]} /><meshStandardMaterial color={C.roof} /></mesh>
      <mesh position={[0.5, 0.55, 1.1]}><boxGeometry args={[0.28, 0.7, 0.02]} /><meshStandardMaterial color={C.teal} emissive={C.teal} emissiveIntensity={0.5} toneMapped={false} /></mesh>

      {/* garage door on main block front */}
      <mesh position={[-0.5, 0.45, 0.61]}><boxGeometry args={[1.0, 0.7, 0.05]} /><meshStandardMaterial color={C.roof} roughness={0.5} /></mesh>

      {/* solar panels on main block roof */}
      <Solar position={[-1.0, 1.83, -0.2]} />
      <Solar position={[-0.3, 1.83, -0.2]} />
      <Solar position={[-0.65, 1.83, 0.32]} />
    </group>
  );
}

function Scene() {
  return (
    <group position={[0, 0.2, 0]}>
      {/* platform */}
      <RisingPart delay={0}>
        <RoundedBox args={[5, 1, 5]} radius={0.18} smoothness={4} position={[0, -0.5, 0]}>
          <meshStandardMaterial color={C.platform} roughness={0.7} />
        </RoundedBox>
        <RoundedBox args={[4.6, 0.14, 4.6]} radius={0.14} position={[0, 0.04, 0]}>
          <meshStandardMaterial color={C.grass} roughness={0.9} />
        </RoundedBox>
      </RisingPart>

      <RisingPart delay={0.25}>
        <House />
      </RisingPart>

      <RisingPart delay={0.5}>
        <Orb position={[-1.4, 0.12, 1.4]} />
      </RisingPart>

      <RisingPart delay={0.65}>
        <Tree position={[-1.9, 0.1, 1.8]} />
        <Tree position={[1.9, 0.1, -1.7]} />
        <Tree position={[1.7, 0.1, 1.9]} />
        <Tree position={[-1.95, 0.1, -1.5]} />
      </RisingPart>

      <RisingPart delay={0.9}>
        <Robot position={[-1.7, 0.1, 0.2]} phase={0} />
        <Robot position={[1.9, 0.1, 1.3]} phase={1.5} />
      </RisingPart>

      {/* WiFi rings above the house */}
      <group position={[-0.5, 2.5, -0.2]}>
        <WifiRing delay={0} color={C.teal} y={0} />
        <WifiRing delay={0.33} color={C.teal} y={0} />
        <WifiRing delay={0.66} color={C.teal} y={0} />
      </group>

      {/* fiber cable streams */}
      {CABLES.map((c, i) => (
        <Cable key={i} {...c} />
      ))}
    </group>
  );
}

export default function SmartHomeScene() {
  return (
    <Canvas
      dpr={[1, 1.6]}
      camera={{ position: [8, 6, 8], fov: 32 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.75} />
      <directionalLight position={[6, 9, 4]} intensity={1.15} color="#ffffff" />
      <pointLight position={[-0.5, 1, 0]} intensity={0.8} distance={6} color={C.teal} />
      <Scene />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.4} target={[0, 0.4, 0]} makeDefault />
    </Canvas>
  );
}
