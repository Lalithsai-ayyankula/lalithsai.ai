import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface Props {
  activeMode?: 'speech' | 'vision' | 'llm' | 'default';
  interactive?: boolean;
}

export const IntelligenceEngineCanvas: React.FC<Props> = ({
  activeMode = 'default',
  interactive = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [fpsState, setFpsState] = useState<'optimal' | 'stable'>('optimal');
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationFrameId: number;
    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || 600;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.z = 24;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    // Group to hold all computational engine components
    const engineGroup = new THREE.Group();
    scene.add(engineGroup);

    // 1. Core Concentric Tensor Rings
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0x06b6d4, // Cyan
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });

    const innerRingGeo = new THREE.TorusGeometry(3.5, 0.08, 16, 64);
    const innerRing = new THREE.Mesh(innerRingGeo, ringMaterial);
    innerRing.rotation.x = Math.PI / 3;
    engineGroup.add(innerRing);

    const midRingGeo = new THREE.TorusGeometry(5.8, 0.05, 16, 80);
    const midRingMat = new THREE.MeshBasicMaterial({
      color: 0x6366f1, // Indigo
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const midRing = new THREE.Mesh(midRingGeo, midRingMat);
    midRing.rotation.y = Math.PI / 4;
    engineGroup.add(midRing);

    const outerRingGeo = new THREE.TorusGeometry(8.2, 0.04, 16, 100);
    const outerRingMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8, // Sky Blue
      wireframe: true,
      transparent: true,
      opacity: 0.2,
    });
    const outerRing = new THREE.Mesh(outerRingGeo, outerRingMat);
    outerRing.rotation.x = -Math.PI / 4;
    engineGroup.add(outerRing);

    // 2. Central Neural Node Core (Icosahedron + Wireframe shell)
    const coreGeo = new THREE.IcosahedronGeometry(1.8, 1);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.2,
      metalness: 0.8,
      wireframe: false,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    engineGroup.add(coreMesh);

    const coreWireMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.6,
    });
    const coreWire = new THREE.Mesh(coreGeo, coreWireMat);
    coreWire.scale.set(1.03, 1.03, 1.03);
    engineGroup.add(coreWire);

    // 3. Floating Node Clusters (Layered Graph Nodes)
    const nodeCount = 38;
    const nodePositions: THREE.Vector3[] = [];
    const nodeSpheres: THREE.Mesh[] = [];
    const nodeGeo = new THREE.SphereGeometry(0.18, 12, 12);
    const nodeMat = new THREE.MeshBasicMaterial({
      color: 0x22d3ee,
    });

    for (let i = 0; i < nodeCount; i++) {
      const radius = 3.5 + Math.random() * 5.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      const pos = new THREE.Vector3(x, y, z);
      nodePositions.push(pos);

      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
      nodeMesh.position.copy(pos);
      engineGroup.add(nodeMesh);
      nodeSpheres.push(nodeMesh);
    }

    // 4. Dynamic Synaptic Connections (Lines between nearby nodes)
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.15,
    });

    const linePoints: THREE.Vector3[] = [];
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        if (nodePositions[i].distanceTo(nodePositions[j]) < 4.2) {
          linePoints.push(nodePositions[i]);
          linePoints.push(nodePositions[j]);
        }
      }
    }
    const lineGeo = new THREE.BufferGeometry().setFromPoints(linePoints);
    const networkLines = new THREE.LineSegments(lineGeo, lineMaterial);
    engineGroup.add(networkLines);

    // 5. Data Flow Particle Field
    const particleCount = 260;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleOriginals: { x: number; y: number; z: number; speed: number; orbit: number; angle: number }[] = [];

    for (let i = 0; i < particleCount; i++) {
      const orbit = 3.0 + Math.random() * 8.5;
      const angle = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 8.0;
      const speed = 0.005 + Math.random() * 0.015;

      const x = Math.cos(angle) * orbit;
      const z = Math.sin(angle) * orbit;

      particlePositions[i * 3] = x;
      particlePositions[i * 3 + 1] = y;
      particlePositions[i * 3 + 2] = z;

      particleOriginals.push({ x, y, z, speed, orbit, angle });
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0x67e8f9,
      size: 0.14,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    engineGroup.add(particles);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x06b6d4, 3, 40);
    pointLight.position.set(0, 0, 8);
    scene.add(pointLight);

    const violetLight = new THREE.PointLight(0x818cf8, 2.5, 40);
    violetLight.position.set(-8, 6, 6);
    scene.add(violetLight);

    // Mouse Interaction Parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive) return;
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetX = x * 0.6;
      targetY = y * 0.6;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Resize observer
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(container);

    // Animation Loop
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Smooth mouse interpolation
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      engineGroup.rotation.y = time * 0.12 + mouseX * 1.5;
      engineGroup.rotation.x = Math.sin(time * 0.08) * 0.15 + mouseY * 1.5;

      // Rotate individual tensor rings at differing harmonic speeds
      innerRing.rotation.z += delta * 0.4;
      innerRing.rotation.y += delta * 0.2;
      midRing.rotation.x += delta * 0.25;
      midRing.rotation.z += delta * 0.3;
      outerRing.rotation.y -= delta * 0.18;
      outerRing.rotation.x += delta * 0.12;

      // Pulse core
      const pulse = 1 + Math.sin(time * 2.5) * 0.06;
      coreWire.scale.set(1.03 * pulse, 1.03 * pulse, 1.03 * pulse);

      // Animate Particles along orbital data pathways
      const positions = particleGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        const p = particleOriginals[i];
        p.angle += p.speed * (activeMode === 'speech' ? 1.8 : 1.0);
        positions[i * 3] = Math.cos(p.angle) * p.orbit;
        positions[i * 3 + 1] = p.y + Math.sin(time * 1.5 + p.angle) * 0.4;
        positions[i * 3 + 2] = Math.sin(p.angle) * p.orbit;
      }
      particleGeo.attributes.position.needsUpdate = true;

      // Mode-specific color tinting
      if (activeMode === 'speech') {
        pointLight.color.setHex(0x38bdf8);
        particleMat.color.setHex(0x38bdf8);
      } else if (activeMode === 'vision') {
        pointLight.color.setHex(0x10b981);
        particleMat.color.setHex(0x34d399);
      } else {
        pointLight.color.setHex(0x06b6d4);
        particleMat.color.setHex(0x67e8f9);
      }

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      resizeObserver.disconnect();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      ringMaterial.dispose();
      midRingMat.dispose();
      outerRingMat.dispose();
      coreMat.dispose();
      coreWireMat.dispose();
      nodeMat.dispose();
      lineMaterial.dispose();
      particleMat.dispose();
    };
  }, [activeMode, interactive]);

  return (
    <div
      ref={containerRef}
      id="intelligence-engine-canvas"
      className="relative w-full h-full min-h-[480px] lg:min-h-[580px] cursor-grab active:cursor-grabbing flex items-center justify-center select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Subtle Overlay Status Pill */}
      <div className="absolute bottom-4 left-6 z-10 hidden sm:flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-slate-950/70 border border-slate-800/80 backdrop-blur-md text-[11px] font-mono text-slate-400">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
        <span className="text-cyan-300 font-semibold">ENGINE: ACTIVE</span>
        <span className="text-slate-600">|</span>
        <span>LATENCY: 0.4ms</span>
        <span className="text-slate-600">|</span>
        <span className="text-indigo-300">INTERACTIVE GRAPH</span>
      </div>
    </div>
  );
};
