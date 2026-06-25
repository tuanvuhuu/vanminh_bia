import { useRef, useState, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, useHelper } from '@react-three/drei'
import * as THREE from 'three'

// Pocket positions (6 pockets: 4 corners + 2 middle)
const POCKET_POS = [
  [-2.0,  0.115, -1.0],  // back-left corner
  [ 0,    0.115, -1.02], // back-middle
  [ 2.0,  0.115, -1.0],  // back-right corner
  [-2.0,  0.115,  1.0],  // front-left corner
  [ 0,    0.115,  1.02], // front-middle
  [ 2.0,  0.115,  1.0],  // front-right corner
]

// Diamond sights on rails
const DIAMOND_POS_BACK = [
  [-1.4, 0.13, -0.97],
  [-0.7, 0.13, -0.99],
  [ 0.7, 0.13, -0.99],
  [ 1.4, 0.13, -0.97],
]
const DIAMOND_POS_FRONT = [
  [-1.4, 0.13,  0.97],
  [-0.7, 0.13,  0.99],
  [ 0.7, 0.13,  0.99],
  [ 1.4, 0.13,  0.97],
]

// Balls: [x, y, z, color]
const BALLS_DATA = [
  [-0.6, 0.19, 0.1,  '#f8fafc'], // cue ball (white)
  [ 0.7, 0.19, -0.06,'#fbbf24'], // 1 yellow
  [ 0.82,0.19,  0.1, '#dc2626'], // 3 red
  [ 0.77,0.19, -0.2, '#1d4ed8'], // 2 blue
  [ 0.95,0.19,  0.01,'#7c3aed'], // 4 purple
  [ 0.89,0.19,  0.22,'#ea580c'], // 5 orange
  [ 1.06,0.19, -0.1, '#16a34a'], // 6 green
  [ 1.06,0.19,  0.15,'#92400e'], // 7 chestnut
]

function TableModel({ clothHex, railHex, autoRotate }) {
  const groupRef = useRef()

  // Auto-rotate until user interaction
  useFrame((_, delta) => {
    if (autoRotate && groupRef.current) {
      groupRef.current.rotation.y += delta * 0.25
    }
  })

  return (
    <group ref={groupRef}>
      {/* === OUTER WOODEN FRAME === */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[4.4, 0.24, 2.2]} />
        <meshStandardMaterial color={railHex} roughness={0.45} metalness={0.08} />
      </mesh>

      {/* Darker underside of frame */}
      <mesh position={[0, -0.15, 0]}>
        <boxGeometry args={[4.0, 0.08, 1.9]} />
        <meshStandardMaterial color="#111113" roughness={0.8} />
      </mesh>

      {/* === CLOTH SURFACE (slightly raised/inset from rails) === */}
      {/* Main flat cloth */}
      <mesh position={[0, 0.125, 0]} receiveShadow>
        <boxGeometry args={[3.8, 0.01, 1.8]} />
        <meshStandardMaterial color={clothHex} roughness={0.92} metalness={0} />
      </mesh>

      {/* Cushion strips (slightly darker cloth on rail edges) */}
      {/* Back cushion */}
      <mesh position={[0, 0.125, -0.84]}>
        <boxGeometry args={[3.8, 0.025, 0.08]} />
        <meshStandardMaterial
          color={new THREE.Color(clothHex).multiplyScalar(0.75)}
          roughness={0.9}
        />
      </mesh>
      {/* Front cushion */}
      <mesh position={[0, 0.125, 0.84]}>
        <boxGeometry args={[3.8, 0.025, 0.08]} />
        <meshStandardMaterial
          color={new THREE.Color(clothHex).multiplyScalar(0.75)}
          roughness={0.9}
        />
      </mesh>
      {/* Left cushion */}
      <mesh position={[-1.84, 0.125, 0]}>
        <boxGeometry args={[0.08, 0.025, 1.64]} />
        <meshStandardMaterial
          color={new THREE.Color(clothHex).multiplyScalar(0.75)}
          roughness={0.9}
        />
      </mesh>
      {/* Right cushion */}
      <mesh position={[1.84, 0.125, 0]}>
        <boxGeometry args={[0.08, 0.025, 1.64]} />
        <meshStandardMaterial
          color={new THREE.Color(clothHex).multiplyScalar(0.75)}
          roughness={0.9}
        />
      </mesh>

      {/* === LEGS (4 corners) === */}
      {[
        [-1.85, -0.72, -0.85],
        [ 1.85, -0.72, -0.85],
        [-1.85, -0.72,  0.85],
        [ 1.85, -0.72,  0.85],
      ].map(([x, y, z], i) => (
        <group key={i} position={[x, y, z]}>
          <mesh castShadow>
            <boxGeometry args={[0.22, 1.2, 0.22]} />
            <meshStandardMaterial color={railHex} roughness={0.5} metalness={0.05} />
          </mesh>
          {/* Leg shadow side */}
          <mesh position={[0.01, 0, 0.01]}>
            <boxGeometry args={[0.22, 1.2, 0.22]} />
            <meshStandardMaterial color="#0a0a0a" roughness={0.9} transparent opacity={0.3} />
          </mesh>
        </group>
      ))}

      {/* === POCKET HOLES === */}
      {POCKET_POS.map(([x, y, z], i) => (
        <group key={i} position={[x, y, z]}>
          {/* Dark hole cylinder */}
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.12, 0.12, 0.3, 20]} />
            <meshStandardMaterial color="#040404" roughness={0.95} />
          </mesh>
          {/* Metal rim (torus) */}
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.12, 0.018, 12, 30]} />
            <meshStandardMaterial color="#a1a1aa" roughness={0.3} metalness={0.85} />
          </mesh>
        </group>
      ))}

      {/* === DIAMOND SIGHTS === */}
      {[...DIAMOND_POS_BACK, ...DIAMOND_POS_FRONT].map(([x, y, z], i) => (
        <mesh key={i} position={[x, y, z]}>
          <sphereGeometry args={[0.022, 12, 12]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.1} metalness={0.9} />
        </mesh>
      ))}

      {/* === BILLIARD BALLS === */}
      {BALLS_DATA.map(([bx, by, bz, color], i) => (
        <mesh key={i} position={[bx, by, bz]} castShadow>
          <sphereGeometry args={[0.08, 32, 32]} />
          <meshStandardMaterial
            color={color}
            roughness={0.05}
            metalness={0.15}
            envMapIntensity={1.5}
          />
        </mesh>
      ))}

      {/* === CUE STICK === */}
      <group position={[-1.2, 0.25, 0.55]} rotation={[0.08, 0.45, -0.04]}>
        {/* Shaft (light maple) */}
        <mesh castShadow>
          <cylinderGeometry args={[0.012, 0.02, 1.8, 16]} />
          <meshStandardMaterial color="#e8c87a" roughness={0.35} metalness={0.05} />
        </mesh>
        {/* Wrap grip (dark) */}
        <mesh position={[0, -0.6, 0]}>
          <cylinderGeometry args={[0.021, 0.021, 0.5, 12]} />
          <meshStandardMaterial color="#1c1009" roughness={0.8} />
        </mesh>
        {/* Ferrule (white tip area) */}
        <mesh position={[0, 0.9, 0]}>
          <cylinderGeometry args={[0.011, 0.011, 0.06, 10]} />
          <meshStandardMaterial color="#e5e5e5" roughness={0.4} metalness={0.5} />
        </mesh>
        {/* Tip (blue chalk) */}
        <mesh position={[0, 0.945, 0]}>
          <cylinderGeometry args={[0.011, 0.011, 0.02, 10]} />
          <meshStandardMaterial color="#1d4ed8" roughness={0.9} />
        </mesh>
      </group>

      {/* === SUSPENDED LED LIGHT FIXTURE === */}
      <group position={[0, 2.2, 0]}>
        {/* Hanging cables */}
        {[-1.2, 1.2].map((x, i) => (
          <mesh key={i} position={[x, 0.6, 0]}>
            <cylinderGeometry args={[0.005, 0.005, 1.2, 6]} />
            <meshStandardMaterial color="#71717a" roughness={0.5} metalness={0.8} />
          </mesh>
        ))}
        {/* Fixture body */}
        <mesh>
          <boxGeometry args={[2.8, 0.08, 0.3]} />
          <meshStandardMaterial color="#27272a" roughness={0.4} metalness={0.6} />
        </mesh>
        {/* LED strip glow */}
        <mesh position={[0, -0.04, 0]}>
          <boxGeometry args={[2.7, 0.015, 0.05]} />
          <meshStandardMaterial
            color="#fffde7"
            emissive="#fffde7"
            emissiveIntensity={3}
          />
        </mesh>
      </group>

      {/* === FLOOR SHADOW === */}
      <mesh position={[0, -1.35, 0]} receiveShadow>
        <planeGeometry args={[8, 5]} />
        <meshStandardMaterial color="#080608" roughness={0.95} />
      </mesh>
    </group>
  )
}

function Lighting() {
  return (
    <>
      {/* Ambient fill */}
      <ambientLight intensity={0.25} color="#c8d8f0" />

      {/* Main overhead spot (simulates the LED fixture) */}
      <spotLight
        position={[0, 4, 0]}
        angle={0.55}
        penumbra={0.4}
        intensity={3.5}
        color="#fff8e8"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0005}
      />

      {/* Key light (front-left, warm) */}
      <pointLight position={[-5, 4, 3]} intensity={0.8} color="#fdf0d8" distance={18} />

      {/* Rim light (back-right, cool blue) */}
      <pointLight position={[5, 3, -4]} intensity={0.5} color="#c0d8f8" distance={16} />

      {/* Under-table subtle fill */}
      <pointLight position={[0, -1, 0]} intensity={0.12} color="#401010" distance={4} />
    </>
  )
}

export default function BilliardTable3D({ clothHex = '#0f4c81', railHex = '#d97706' }) {
  const [userInteracted, setUserInteracted] = useState(false)

  return (
    <div className="w-full h-full" onPointerDown={() => setUserInteracted(true)}>
      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.2 }}
      >
        <PerspectiveCamera makeDefault position={[5.5, 3.8, 5.5]} fov={32} />
        <color attach="background" args={['#070709']} />
        <fog attach="fog" args={['#070709', 14, 28]} />

        <Lighting />

        <Suspense fallback={null}>
          <TableModel
            clothHex={clothHex}
            railHex={railHex}
            autoRotate={!userInteracted}
          />
        </Suspense>

        <OrbitControls
          enablePan={false}
          enableDamping
          dampingFactor={0.06}
          minDistance={4}
          maxDistance={11}
          minPolarAngle={0.3}
          maxPolarAngle={Math.PI / 2.05}
          onStart={() => setUserInteracted(true)}
        />
      </Canvas>
    </div>
  )
}
