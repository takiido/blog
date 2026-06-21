"use client";

import { Suspense, useRef, useState } from "react";
import {
  MeshTransmissionMaterial,
  useGLTF,
  Environment,
  Lightformer,
  Float
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { easing } from "maath";
import type { Mesh, Group } from "three";

const SPOTIFY_MODEL_URL = "/models/spotify/scene.gltf";
const X_MODEL_URL = "/models/x/scene.gltf";
const GITHUB_MODEL_URL = "/models/github/scene.gltf";

useGLTF.preload(SPOTIFY_MODEL_URL);
useGLTF.preload(X_MODEL_URL);
useGLTF.preload(GITHUB_MODEL_URL);

const MATERIAL_CONFIG = {
  backside: true,
  chromaticAberration: 0.3,
  anisotropicBlur: 0.15,
  thickness: 0.15,
} as const;

const POSITIONS: [number, number, number][] = [
  [0, 0, 0],
  [300, 0, -250],
  [-300, 0, -250],
];

function Logo({ meshNames, modelUrl }: { meshNames: string[]; modelUrl: string }) {
  const { nodes } = useGLTF(modelUrl);
  return (
    <>
      {meshNames.map((name) => (
        <mesh
          key={name}
          rotation={[Math.PI / 2, 0, 0]}
          receiveShadow
          castShadow
          scale={100}
          geometry={(nodes[name] as Mesh).geometry}
        >
          <MeshTransmissionMaterial {...MATERIAL_CONFIG} />
        </mesh>
      ))}
    </>
  );
}

const ITEMS = [
  {
    name: "GitHub",
    modelUrl: GITHUB_MODEL_URL,
    meshNames: ["Object_4", "Object_5"]
  },
  {
    name: "Playlists",
    modelUrl: SPOTIFY_MODEL_URL,
    meshNames: ["Object_4", "Object_6"]
  },
  {
    name: "X",
    modelUrl: X_MODEL_URL,
    meshNames: ["Object_4", "Object_5"]
  },

] as const;

function CarouselItem({ index, active }: { index: number; active: number }) {
  const ref = useRef<Group>(null);
  const total = ITEMS.length;
  const offset = (index - active + total) % total;
  const targetPos = POSITIONS[offset];
  const isActive = offset === 0;
  const item = ITEMS[index];

  useFrame((_, delta) => {
    if (!ref.current) return;
    easing.damp3(ref.current.position, targetPos, 0.3, delta);
    easing.damp3(ref.current.scale, isActive ? [1, 1, 1] : [0.6, 0.6, 0.6], 0.3, delta);
  });

  return (
    <group ref={ref} scale={0}>
      <Logo modelUrl={item.modelUrl} meshNames={[...item.meshNames]} />
    </group>
  );
}

function Carousel({ active }: { active: number }) {
  return (
    <Float floatIntensity={2}>
      {ITEMS.map((_, i) => (
        <CarouselItem key={i} index={i} active={active} />
      ))}
    </Float>
  );
}

export default function PersonalLinks() {
  const [active, setActive] = useState(0);
  const prev = () => setActive((a) => (a - 1 + ITEMS.length) % ITEMS.length);
  const next = () => setActive((a) => (a + 1) % ITEMS.length);

  return (
    <>
      <div style={{ position: "relative", width: "100%", height: "250px", background: "#000", overflow: "hidden" }}>
        <Canvas
          shadows
          style={{ display: "block", background: "#000" }}
          onCreated={({ gl }) => gl.setClearColor("#000000", 1)}
          camera={{ position: [0, 0, 700], fov: 45 }}
        >
          <spotLight position={[0, 0, 100]} penumbra={1} angle={0.15} castShadow />
          <Environment files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/studio_small_08_1k.hdr">
            <Lightformer intensity={8} position={[0, 0, 0]} scale={[10, 50, 10]} onUpdate={(self) => self.lookAt(0, 0, 0)} />
          </Environment>
          <Suspense fallback={null}>
            <Carousel active={active} />
          </Suspense>
        </Canvas>
        <button onClick={prev} style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", background: "transparent", border: "1px solid transparent", color: "#fff", width: 64, height: 64, cursor: "pointer", fontSize: 18 }}></button>
        <button onClick={next} style={{ position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)", background: "transparent", border: "1px solid transparent", color: "#fff", width: 64, height: 64, cursor: "pointer", fontSize: 18 }}></button>
      </div>
      <p>{ITEMS[active].name}</p>
    </>
  );
}
