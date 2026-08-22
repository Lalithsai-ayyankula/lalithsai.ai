import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Props {
  className?: string;
}

interface HUDLabelItem {
  sprite: THREE.Sprite;
  texture: THREE.CanvasTexture;
  material: THREE.SpriteMaterial;
  baseX: number;
  baseY: number;
  baseZ: number;
  phase: number;
}

export const HeroIntelligenceField: React.FC<Props> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationFrameId: number;
    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    // 1. Scene Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x080a0f, 0.022);

    // 2. Camera Setup
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 32);

    // 3. High Performance Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // Master Group for 3D computational world
    const worldGroup = new THREE.Group();
    scene.add(worldGroup);

    // Right-shifted focal hub (creates nice spatial composition with left-aligned typography)
    const focalGroup = new THREE.Group();
    focalGroup.position.set(width > 1024 ? 7.5 : 0, width > 1024 ? 0.5 : -2, 0);
    worldGroup.add(focalGroup);

    // 4. Central Computational Tensor Core (Icosahedron + Wireframe Lattice)
    const coreGeo = new THREE.IcosahedronGeometry(2.4, 1);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x0f172a,
      transparent: true,
      opacity: 0.6,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    focalGroup.add(coreMesh);

    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4, // Cyan
      wireframe: true,
      transparent: true,
      opacity: 0.55,
    });
    const coreWire = new THREE.Mesh(coreGeo, wireMat);
    coreWire.scale.set(1.04, 1.04, 1.04);
    focalGroup.add(coreWire);

    // 5. Concentric Quantum Orbital Rings (Multi-axis rotation)
    const ring1Geo = new THREE.TorusGeometry(4.8, 0.04, 16, 80);
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8, // Sky
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    focalGroup.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(7.6, 0.035, 16, 100);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: 0x818cf8, // Indigo / Violet
      wireframe: true,
      transparent: true,
      opacity: 0.3,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.y = Math.PI / 4;
    focalGroup.add(ring2);

    const ring3Geo = new THREE.TorusGeometry(10.8, 0.03, 16, 120);
    const ring3Mat = new THREE.MeshBasicMaterial({
      color: 0x22d3ee, // Cyan
      wireframe: true,
      transparent: true,
      opacity: 0.2,
    });
    const ring3 = new THREE.Mesh(ring3Geo, ring3Mat);
    ring3.rotation.x = -Math.PI / 5;
    ring3.rotation.z = Math.PI / 6;
    focalGroup.add(ring3);

    // 6. Neural Graph Nodes & Synaptic Fiber Connections
    const isMobile = width < 768;
    const nodeCount = isMobile ? 32 : 64;
    const nodePositions: THREE.Vector3[] = [];
    const nodeSpheres: THREE.Mesh[] = [];

    const nodeGeo = new THREE.SphereGeometry(0.14, 8, 8);
    const nodeMatCyan = new THREE.MeshBasicMaterial({ color: 0x22d3ee });
    const nodeMatIndigo = new THREE.MeshBasicMaterial({ color: 0xa5b4fc });
    const nodeMatEmerald = new THREE.MeshBasicMaterial({ color: 0x34d399 });

    for (let i = 0; i < nodeCount; i++) {
      // Distribute nodes in an organic 3D cloud expanding around and behind the scene
      const spreadX = (Math.random() - 0.35) * 36;
      const spreadY = (Math.random() - 0.5) * 22;
      const spreadZ = (Math.random() - 0.5) * 16 - 2;

      const pos = new THREE.Vector3(spreadX, spreadY, spreadZ);
      nodePositions.push(pos);

      const mat = i % 3 === 0 ? nodeMatCyan : i % 3 === 1 ? nodeMatIndigo : nodeMatEmerald;
      const nodeMesh = new THREE.Mesh(nodeGeo, mat);
      nodeMesh.position.copy(pos);
      worldGroup.add(nodeMesh);
      nodeSpheres.push(nodeMesh);
    }

    // Synaptic connections between close nodes
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.14,
    });

    const linePoints: THREE.Vector3[] = [];
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        if (nodePositions[i].distanceTo(nodePositions[j]) < 7.2) {
          linePoints.push(nodePositions[i]);
          linePoints.push(nodePositions[j]);
        }
      }
    }
    const lineGeo = new THREE.BufferGeometry().setFromPoints(linePoints);
    const networkLines = new THREE.LineSegments(lineGeo, lineMaterial);
    worldGroup.add(networkLines);

    // 7. Atmospheric Data Particle Cloud
    const particleCount = isMobile ? 180 : 380;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);
    const particleOriginals: { x: number; y: number; z: number; vx: number; vy: number; vz: number; speed: number; orbit: number; angle: number }[] = [];

    const color1 = new THREE.Color(0x38bdf8); // Cyan
    const color2 = new THREE.Color(0x818cf8); // Indigo
    const color3 = new THREE.Color(0xa7f3d0); // Mint

    for (let i = 0; i < particleCount; i++) {
      const orbit = 3.5 + Math.random() * 18.0;
      const angle = Math.random() * Math.PI * 2;
      const x = Math.cos(angle) * orbit + (Math.random() - 0.5) * 12;
      const y = (Math.random() - 0.5) * 22;
      const z = (Math.random() - 0.5) * 20 - 4;

      particlePositions[i * 3] = x;
      particlePositions[i * 3 + 1] = y;
      particlePositions[i * 3 + 2] = z;

      // Color variation
      const mixRatio = Math.random();
      const mixedColor = mixRatio < 0.5 ? color1.clone().lerp(color2, mixRatio * 2) : color2.clone().lerp(color3, (mixRatio - 0.5) * 2);
      particleColors[i * 3] = mixedColor.r;
      particleColors[i * 3 + 1] = mixedColor.g;
      particleColors[i * 3 + 2] = mixedColor.b;

      particleOriginals.push({
        x,
        y,
        z,
        vx: (Math.random() - 0.5) * 0.008,
        vy: (Math.random() - 0.5) * 0.008,
        vz: (Math.random() - 0.5) * 0.008,
        speed: 0.003 + Math.random() * 0.009,
        orbit,
        angle,
      });
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: isMobile ? 0.16 : 0.22,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });

    const particleSystem = new THREE.Points(particleGeo, particleMat);
    worldGroup.add(particleSystem);

    // 8. Semi-Transparent Floating Technical HUD Text Labels (Resume-Grounded Technologies)
    const hudLabels: HUDLabelItem[] = [];

    const techCatalog = [
      { text: 'NLP', color: '#22d3ee', x: -11.0, y: 7.2, z: -5.0 },
      { text: 'COMPUTER VISION', color: '#818cf8', x: 6.5, y: -5.2, z: -2.0 },
      { text: 'FASTAPI', color: '#34d399', x: 13.5, y: 2.0, z: -4.5 },
      { text: 'PYTORCH', color: '#38bdf8', x: 8.5, y: 5.8, z: -3.5 },
      { text: 'SPEECH AI / ASR', color: '#a5b4fc', x: 14.5, y: 6.5, z: -6.5 },
      { text: 'TRANSFORMERS', color: '#22d3ee', x: 11.5, y: -2.5, z: -4.0 },
      { text: 'PGVECTOR (HNSW)', color: '#38bdf8', x: 5.2, y: 7.5, z: -4.2 },
      { text: 'WAV2LIP', color: '#34d399', x: 15.2, y: -6.0, z: -5.5 },
      { text: 'WHISPER ASR', color: '#22d3ee', x: -13.0, y: -4.5, z: -6.5 },
      { text: 'LLM & RAG', color: '#38bdf8', x: 10.5, y: 9.0, z: -6.0 },
    ];

    const createHUDTextSprite = (text: string, color: string, opacity: number = 0.35) => {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 128;
      const ctx = canvas.getContext('2d');
      if (!ctx) return null;

      ctx.clearRect(0, 0, 512, 128);

      // Subtle background badge pill
      ctx.fillStyle = 'rgba(8, 12, 22, 0.4)';
      if (ctx.roundRect) {
        ctx.roundRect(14, 18, 484, 92, 16);
      } else {
        ctx.fillRect(14, 18, 484, 92);
      }
      ctx.fill();

      // Subtle high-tech bounding border
      ctx.strokeStyle = color;
      ctx.lineWidth = 2.5;
      if (ctx.roundRect) {
        ctx.roundRect(14, 18, 484, 92, 16);
      } else {
        ctx.strokeRect(14, 18, 484, 92);
      }
      ctx.stroke();

      // Small telemetry dot
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(48, 64, 6, 0, Math.PI * 2);
      ctx.fill();

      // Technology HUD text
      ctx.font = 'bold 34px "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace';
      ctx.fillStyle = color;
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.fillText(text, 72, 64);

      const texture = new THREE.CanvasTexture(canvas);
      texture.minFilter = THREE.LinearFilter;
      const spriteMaterial = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        opacity,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });

      const sprite = new THREE.Sprite(spriteMaterial);
      sprite.scale.set(3.4, 0.85, 1);
      return { sprite, texture, material: spriteMaterial };
    };

    // Instantiate HUD labels
    techCatalog.forEach((item, index) => {
      const res = createHUDTextSprite(item.text, item.color, isMobile ? 0.22 : 0.36);
      if (res) {
        const { sprite, texture, material } = res;
        sprite.position.set(item.x, item.y, item.z);
        worldGroup.add(sprite);
        hudLabels.push({
          sprite,
          texture,
          material,
          baseX: item.x,
          baseY: item.y,
          baseZ: item.z,
          phase: index * 0.7,
        });
      }
    });

    // 9. Lighting System
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const cyanLight = new THREE.PointLight(0x06b6d4, 3.5, 50);
    cyanLight.position.set(6, 4, 10);
    scene.add(cyanLight);

    const violetLight = new THREE.PointLight(0x6366f1, 3.0, 50);
    violetLight.position.set(-10, -5, 8);
    scene.add(violetLight);

    // 10. Interactive Parallax & Mouse Response
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) - 0.5;
      const y = (e.clientY / window.innerHeight) - 0.5;
      targetX = x * 1.2;
      targetY = y * 0.8;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // 11. Resize Observer
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);

      // Re-position focal hub based on screen width
      focalGroup.position.set(width > 1024 ? 7.5 : 0, width > 1024 ? 0.5 : -2, 0);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // 12. Animation Tick Loop
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Smooth camera and world parallax
      mouseX += (targetX - mouseX) * 0.04;
      mouseY += (targetY - mouseY) * 0.04;

      camera.position.x = mouseX * 3.5;
      camera.position.y = -mouseY * 2.5;
      camera.lookAt(0, 0, 0);

      // Rotate focal core and rings at harmonic speeds
      focalGroup.rotation.y = time * 0.08;
      focalGroup.rotation.x = Math.sin(time * 0.05) * 0.12;

      ring1.rotation.z += delta * 0.35;
      ring1.rotation.y += delta * 0.2;
      ring2.rotation.x += delta * 0.22;
      ring2.rotation.z -= delta * 0.18;
      ring3.rotation.y -= delta * 0.15;
      ring3.rotation.x += delta * 0.12;

      // Pulse core wireframe
      const pulse = 1 + Math.sin(time * 2.2) * 0.05;
      coreWire.scale.set(1.04 * pulse, 1.04 * pulse, 1.04 * pulse);

      // Gentle floating motion for world nodes
      for (let i = 0; i < nodeSpheres.length; i++) {
        const mesh = nodeSpheres[i];
        mesh.position.y = nodePositions[i].y + Math.sin(time * 0.8 + i * 0.3) * 0.25;
      }

      // Gentle floating dynamics for HUD text annotations
      for (let i = 0; i < hudLabels.length; i++) {
        const label = hudLabels[i];
        label.sprite.position.y = label.baseY + Math.sin(time * 0.65 + label.phase) * 0.3;
        label.sprite.position.x = label.baseX + Math.cos(time * 0.45 + label.phase) * 0.2;
      }

      // Animate flowing particle field
      const posArray = particleGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        const p = particleOriginals[i];
        p.angle += p.speed;
        
        // Orbital drift + soft undulating y-wave
        posArray[i * 3] = p.x + Math.cos(p.angle) * 1.5;
        posArray[i * 3 + 1] = p.y + Math.sin(time * 0.8 + p.angle) * 0.8;
        posArray[i * 3 + 2] = p.z + Math.sin(p.angle) * 1.2;
      }
      particleGeo.attributes.position.needsUpdate = true;

      // Subtle light oscillation following mouse
      cyanLight.position.x = 6 + mouseX * 8;
      cyanLight.position.y = 4 - mouseY * 6;

      renderer.render(scene, camera);
    };

    animate();

    // 13. Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      resizeObserver.disconnect();
      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      wireMat.dispose();
      ring1Geo.dispose();
      ring1Mat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      ring3Geo.dispose();
      ring3Mat.dispose();
      nodeGeo.dispose();
      nodeMatCyan.dispose();
      nodeMatIndigo.dispose();
      nodeMatEmerald.dispose();
      lineGeo.dispose();
      lineMaterial.dispose();
      particleGeo.dispose();
      particleMat.dispose();

      // Dispose HUD sprites, textures, and materials
      hudLabels.forEach((label) => {
        label.texture.dispose();
        label.material.dispose();
      });
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 w-full h-full pointer-events-none overflow-hidden select-none z-0 ${className}`}
      aria-hidden="true"
    />
  );
};
