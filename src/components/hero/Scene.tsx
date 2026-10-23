"use client";

import { RoundedBoxGeometry } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  type RefObject,
} from "react";
import * as THREE from "three";

import type { Theme } from "@/lib/theme";

/**
 * A fresnel shell: near-invisible face-on, bright at grazing angles. Reads as
 * lit glass on a near-black ground without an environment map, an HDRI fetch or
 * a single light in the scene — which is most of why this stays cheap.
 */
const VERTEX = /* glsl */ `
  varying vec3 vWorldNormal;
  varying vec3 vViewDirection;

  void main() {
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vWorldNormal = normalize(mat3(modelMatrix) * normal);
    vViewDirection = normalize(cameraPosition - worldPosition.xyz);
    gl_Position = projectionMatrix * viewMatrix * worldPosition;
  }
`;

const FRAGMENT = /* glsl */ `
  uniform vec3 uCore;
  uniform vec3 uRim;
  uniform float uPower;
  uniform float uOpacity;

  varying vec3 vWorldNormal;
  varying vec3 vViewDirection;

  void main() {
    float facing = clamp(dot(normalize(vWorldNormal), normalize(vViewDirection)), 0.0, 1.0);
    float fresnel = pow(1.0 - facing, uPower);
    vec3 colour = mix(uCore, uRim, fresnel);
    gl_FragColor = vec4(colour, uOpacity * (0.12 + fresnel * 0.88));
  }
`;

/**
 * Shell colours per theme. On the dark ground the core sinks into the page and
 * the rim glows; on the light one that inverts — a pale core and a deep blue
 * rim, so the shapes still read as glass edges rather than grey smudges.
 */
const PALETTE: Record<Theme, { core: string; rim: string }> = {
  dark: { core: "#0a1120", rim: "#77aaff" },
  light: { core: "#c9d8f5", rim: "#2f6fe4" },
};

type Shape = {
  id: string;
  position: [number, number, number];
  scale: number;
  spin: number;
  bob: number;
  phase: number;
  kind: "ico" | "box";
};

/**
 * Cluster laid out in the right half of the frame so the headline column on
 * the left is never competing with it.
 */
const SHAPES: Shape[] = [
  { id: "a", position: [0.15, 0.2, 0], scale: 1.0, spin: 0.10, bob: 0.14, phase: 0.0, kind: "ico" },
  { id: "b", position: [1.62, -1.05, -1.4], scale: 0.5, spin: -0.14, bob: 0.2, phase: 1.1, kind: "ico" },
  { id: "c", position: [-0.85, -1.05, -0.5], scale: 0.3, spin: 0.19, bob: 0.26, phase: 2.3, kind: "box" },
  { id: "d", position: [1.4, 1.3, -2.0], scale: 0.44, spin: 0.08, bob: 0.18, phase: 3.4, kind: "ico" },
  { id: "e", position: [-1.2, 1.15, -1.4], scale: 0.24, spin: -0.22, bob: 0.3, phase: 4.2, kind: "box" },
  { id: "f", position: [2.55, 0.5, -2.9], scale: 0.66, spin: 0.06, bob: 0.12, phase: 5.0, kind: "ico" },
  { id: "g", position: [0.5, 1.75, -0.8], scale: 0.2, spin: 0.25, bob: 0.32, phase: 0.7, kind: "ico" },
  { id: "h", position: [1.9, -1.6, -1.2], scale: 0.28, spin: -0.17, bob: 0.24, phase: 2.9, kind: "ico" },
];

/**
 * Camera work.
 *
 * Two owners, two axes, no overlap: this rig owns x/y (damped cursor parallax,
 * never a 1:1 follow) and the shared `progress` ref owns the z dolly. GSAP
 * writes only to that ref — it never touches a three.js object — so the render
 * loop stays the single authority over the scene graph.
 */
function Rig({ progress }: { progress: RefObject<number> }) {
  const target = useRef(new THREE.Vector3(0, 0, 0));

  // Camera and pointer come off the frame callback's own state rather than
  // `useThree()`. Same objects, but the mutation happens on a value the frame
  // loop owns, which is both idiomatic R3F and honest about where writes live.
  useFrame((state, delta) => {
    const { camera, pointer } = state;

    // Frame-rate independent damping: same feel at 60fps and 144fps.
    const damping = 1 - Math.pow(0.0015, delta);

    camera.position.x += (pointer.x * 0.75 - camera.position.x) * damping;
    camera.position.y += (pointer.y * 0.4 - camera.position.y) * damping;
    camera.position.z = 6 + progress.current * 3.2;
    camera.lookAt(target.current);
  });

  return null;
}

function Cluster({
  progress,
  theme,
}: {
  progress: RefObject<number>;
  theme: Theme;
}) {
  const group = useRef<THREE.Group>(null);
  const meshes = useRef<(THREE.Mesh | null)[]>([]);
  const viewport = useThree((state) => state.viewport);

  // One geometry per shape kind and ONE material for the whole cluster: eight
  // meshes, three GPU resources, and a single uniform to scrub for the scroll
  // fade.
  //
  // Two paths, deliberately separate. Render reads the memoised objects; the
  // frame loop writes through a ref. That keeps rendering pure while still
  // letting the scroll fade mutate a uniform sixty times a second.
  const icosahedron = useMemo(() => new THREE.IcosahedronGeometry(1, 1), []);

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uCore: { value: new THREE.Color("#0a1120") },
          uRim: { value: new THREE.Color("#77aaff") },
          uPower: { value: 2.0 },
          uOpacity: { value: 1 },
        },
        vertexShader: VERTEX,
        fragmentShader: FRAGMENT,
        transparent: true,
        depthWrite: false,
        side: THREE.FrontSide,
      }),
    [],
  );

  const writable = useRef<THREE.ShaderMaterial | null>(null);

  // Layout effect so the ref is populated before the theme effect below reads it.
  useLayoutEffect(() => {
    writable.current = material;
    return () => {
      writable.current = null;
    };
  }, [material]);

  // A theme switch recolours the one shared material in place — no new
  // material, no recompile. Layout effect, so the first frame is already right.
  useLayoutEffect(() => {
    const target = writable.current;
    if (!target) return;
    target.uniforms.uCore.value.set(PALETTE[theme].core);
    target.uniforms.uRim.value.set(PALETTE[theme].rim);
  }, [theme]);

  // Dispose explicitly: these were created outside the reconciler, so R3F's
  // own teardown will not free them when the canvas unmounts on scroll-past.
  useEffect(
    () => () => {
      icosahedron.dispose();
      material.dispose();
    },
    [icosahedron, material],
  );

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;

    SHAPES.forEach((shape, index) => {
      const mesh = meshes.current[index];
      if (!mesh) return;

      mesh.rotation.x += delta * shape.spin * 0.5;
      mesh.rotation.y += delta * shape.spin;
      mesh.position.y =
        shape.position[1] + Math.sin(time * 0.35 + shape.phase) * shape.bob;
    });

    if (group.current) {
      group.current.rotation.y = Math.sin(time * 0.08) * 0.12;
    }

    // Fades with the scroll dolly so the scene leaves rather than just recedes.
    const target = writable.current;
    if (target) {
      target.uniforms.uOpacity.value = 1 - progress.current;
    }
  });

  // Keep the cluster in the right-hand third at any aspect ratio.
  const scale = THREE.MathUtils.clamp(viewport.width * 0.088, 0.45, 0.86);
  const offsetX = viewport.width * 0.23;

  return (
    <group position={[offsetX, 0, 0]} ref={group} scale={scale}>
      {SHAPES.map((shape, index) =>
        shape.kind === "ico" ? (
          <mesh
            geometry={icosahedron}
            key={shape.id}
            material={material}
            position={shape.position}
            ref={(node) => {
              meshes.current[index] = node;
            }}
            scale={shape.scale}
          />
        ) : (
          <mesh
            key={shape.id}
            material={material}
            position={shape.position}
            ref={(node) => {
              meshes.current[index] = node;
            }}
            scale={shape.scale}
          >
            <RoundedBoxGeometry
              args={[1.25, 1.25, 1.25]}
              radius={0.22}
              smoothness={4}
            />
          </mesh>
        ),
      )}
    </group>
  );
}

type SceneProps = {
  /** 0 at the top of the hero, 1 once it has scrolled away. Written by GSAP. */
  progress: RefObject<number>;
  /** "never" halts rendering entirely — hidden tab, or hero off-screen. */
  frameloop: "always" | "never";
  theme: Theme;
};

export function Scene({ progress, frameloop, theme }: SceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45, near: 0.1, far: 40 }}
      dpr={[1, 2]}
      frameloop={frameloop}
      gl={{
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      }}
      // The canvas is decorative; the hero's meaning is entirely in the text.
      aria-hidden="true"
      style={{ pointerEvents: "none" }}
    >
      <Rig progress={progress} />
      <Cluster progress={progress} theme={theme} />
    </Canvas>
  );
}

export default Scene;
