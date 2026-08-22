import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface Props {
  activePhase?: number;
  interactive?: boolean;
}

export const ResumeIntelligence3DCanvas: React.FC<Props> = ({
  activePhase = 3,
  interactive = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeBranch, setActiveBranch] = useState<string | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationFrameId: number;
    let width = container.clientWidth || 800;
    let height = container.clientHeight || 500;

    // 1. Scene, Camera & WebGL Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 1.5, 23);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    // Root Transformation Group
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // Matrix Grid Floor Plane
    const gridHelper = new THREE.GridHelper(34, 34, 0x06b6d4, 0x1e293b);
    gridHelper.position.y = -6.2;
    gridHelper.material.opacity = 0.2;
    gridHelper.material.transparent = true;
    scene.add(gridHelper);

    // Helper: Canvas Texture for Document / Node Labels in 3D
    const createTextCanvasTexture = (header: string, sub: string, tag: string, colorHex: string) => {
      const cvs = document.createElement('canvas');
      cvs.width = 300;
      cvs.height = 180;
      const ctx = cvs.getContext('2d');
      if (ctx) {
        // Card Background
        ctx.fillStyle = '#090d16';
        ctx.strokeStyle = colorHex;
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.roundRect(6, 6, 288, 168, 12);
        ctx.fill();
        ctx.stroke();

        // Tag pill
        ctx.fillStyle = colorHex + '33';
        ctx.beginPath();
        ctx.roundRect(16, 18, 120, 26, 6);
        ctx.fill();
        ctx.fillStyle = colorHex;
        ctx.font = 'bold 13px monospace';
        ctx.fillText(tag, 24, 36);

        // Header Title
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 18px sans-serif';
        ctx.fillText(header, 16, 80);

        // Subtitle/Weight
        ctx.fillStyle = '#94a3b8';
        ctx.font = '14px monospace';
        ctx.fillText(sub, 16, 114);

        // Progress bar simulation
        ctx.fillStyle = '#1e293b';
        ctx.beginPath();
        ctx.roundRect(16, 136, 266, 12, 4);
        ctx.fill();
        ctx.fillStyle = colorHex;
        ctx.beginPath();
        ctx.roundRect(16, 136, 190, 12, 4);
        ctx.fill();
      }
      const tex = new THREE.CanvasTexture(cvs);
      tex.minFilter = THREE.LinearFilter;
      return tex;
    };

    // 2. CENTRAL "MATCHING CORE" NODE (The Dual-Stage Intelligence Hub)
    const coreGroup = new THREE.Group();
    rootGroup.add(coreGroup);

    // Core Solid Body
    const coreGeometry = new THREE.IcosahedronGeometry(2.4, 2);
    const coreMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x07111e,
      emissive: 0x083344,
      roughness: 0.12,
      metalness: 0.9,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    coreGroup.add(coreMesh);

    // Core Hologram Wireframe Shell
    const coreWireMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4, // Cyan Accent
      wireframe: true,
      transparent: true,
      opacity: 0.75,
    });
    const coreWireMesh = new THREE.Mesh(coreGeometry, coreWireMat);
    coreWireMesh.scale.set(1.06, 1.06, 1.06);
    coreGroup.add(coreWireMesh);

    // Inner Pulsing Core Fusion Sphere
    const innerFusionGeo = new THREE.SphereGeometry(1.5, 24, 24);
    const innerFusionMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const innerFusionMesh = new THREE.Mesh(innerFusionGeo, innerFusionMat);
    coreGroup.add(innerFusionMesh);

    // Core Orbit Rings (Tensor Harmonic Gyros)
    const ringMatCyan = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      wireframe: true,
      transparent: true,
      opacity: 0.4,
    });
    const ringMatEmerald = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const ringMatIndigo = new THREE.MeshBasicMaterial({
      color: 0x818cf8,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });

    const ring1 = new THREE.Mesh(new THREE.TorusGeometry(3.6, 0.04, 16, 64), ringMatCyan);
    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(4.3, 0.03, 16, 64), ringMatEmerald);
    const ring3 = new THREE.Mesh(new THREE.TorusGeometry(4.9, 0.03, 16, 64), ringMatIndigo);
    ring2.rotation.x = Math.PI / 3;
    ring2.rotation.y = Math.PI / 4;
    ring3.rotation.x = -Math.PI / 4;
    ring3.rotation.z = Math.PI / 3;
    coreGroup.add(ring1);
    coreGroup.add(ring2);
    coreGroup.add(ring3);

    // 3. INFLOW DOCUMENT NODES (Uploaded Resumes & Job Specs entering from Left)
    const inputDocumentsData = [
      {
        id: 'doc-resume-pdf',
        name: 'Candidate Resume',
        sub: 'PDF/DOCX Extraction',
        tag: 'DOC INGEST',
        pos: new THREE.Vector3(-10.5, 3.8, 0.5),
        colorHex: '#38bdf8',
        color: 0x38bdf8,
      },
      {
        id: 'doc-job-spec',
        name: 'Job Description',
        sub: 'Target Competencies',
        tag: 'SPEC SCHEMA',
        pos: new THREE.Vector3(-11.5, -0.2, 2.0),
        colorHex: '#06b6d4',
        color: 0x06b6d4,
      },
      {
        id: 'doc-dense-vector',
        name: 'Sentence-Transformers',
        sub: '384-D Dense Vectors',
        tag: 'EMBEDDINGS',
        pos: new THREE.Vector3(-9.8, -4.2, -1.0),
        colorHex: '#818cf8',
        color: 0x818cf8,
      },
    ];

    const inputDocObjects: THREE.Group[] = [];

    inputDocumentsData.forEach((doc) => {
      const docGroup = new THREE.Group();
      docGroup.position.copy(doc.pos);

      // 3D Document Slab Mesh
      const slabGeo = new THREE.BoxGeometry(2.2, 2.8, 0.2);
      const slabMat = new THREE.MeshStandardMaterial({
        color: 0x040813,
        emissive: doc.color,
        emissiveIntensity: 0.25,
        roughness: 0.25,
        metalness: 0.8,
      });
      const slabMesh = new THREE.Mesh(slabGeo, slabMat);
      docGroup.add(slabMesh);

      // Slab Wireframe Outline
      const slabWire = new THREE.Mesh(
        slabGeo,
        new THREE.MeshBasicMaterial({ color: doc.color, wireframe: true, transparent: true, opacity: 0.85 })
      );
      slabWire.scale.set(1.05, 1.05, 1.05);
      docGroup.add(slabWire);

      // Front Textured Label Display
      const tex = createTextCanvasTexture(doc.name, doc.sub, doc.tag, doc.colorHex);
      const labelMat = new THREE.MeshBasicMaterial({ map: tex, transparent: true });
      const labelPlane = new THREE.Mesh(new THREE.PlaneGeometry(2.0, 1.3), labelMat);
      labelPlane.position.z = 0.12;
      docGroup.add(labelPlane);

      rootGroup.add(docGroup);
      inputDocObjects.push(docGroup);
    });

    // 4. BRANCHING WEIGHTED SCORING OUTPUT PATHS (Skill/Keyword Alignment Branches to Right)
    // Reflects 5-Pillar Deterministic Scoring + Dense Vector Similarity Breakdown
    const branchOutputsData = [
      {
        id: 'branch-skills',
        title: 'Skill Overlap (35%)',
        sub: 'Core Stack Alignment',
        tag: 'WEIGHT: 35%',
        pos: new THREE.Vector3(9.5, 4.8, 0.5),
        colorHex: '#10b981', // Emerald
        color: 0x10b981,
        weightVal: 0.35,
        baseScore: 96.4,
        keySkills: 'PyTorch • Transformers • FastAPI • RAG',
      },
      {
        id: 'branch-experience',
        title: 'Experience Depth (25%)',
        sub: 'Tenure & Research Complexity',
        tag: 'WEIGHT: 25%',
        pos: new THREE.Vector3(11.2, 2.0, 2.0),
        colorHex: '#06b6d4', // Cyan
        color: 0x06b6d4,
        weightVal: 0.25,
        baseScore: 90.8,
        keySkills: 'IIIT-H LTRC Research • Speech Classification',
      },
      {
        id: 'branch-projects',
        title: 'Projects & Systems (20%)',
        sub: 'End-to-End Scale & Delivery',
        tag: 'WEIGHT: 20%',
        pos: new THREE.Vector3(11.0, -1.0, -1.0),
        colorHex: '#6366f1', // Indigo
        color: 0x6366f1,
        weightVal: 0.20,
        baseScore: 93.5,
        keySkills: 'Resume Intelligence • Multi-Agent Pipeline',
      },
      {
        id: 'branch-keywords',
        title: 'Dense & Keyword Fit (20%)',
        sub: 'pgvector Cosine (40%)',
        tag: 'HYBRID FUSION',
        pos: new THREE.Vector3(9.2, -4.2, 1.2),
        colorHex: '#a855f7', // Purple
        color: 0xa855f7,
        weightVal: 0.20,
        baseScore: 97.2,
        keySkills: 'Cosine Sim: 0.894 • TF-IDF Re-Rank',
      },
    ];

    const branchDocObjects: THREE.Group[] = [];

    branchOutputsData.forEach((branch) => {
      const branchGroup = new THREE.Group();
      branchGroup.position.copy(branch.pos);

      // Hex Prism / Octahedron Output Node
      const nodeGeo = new THREE.OctahedronGeometry(1.3, 0);
      const nodeMat = new THREE.MeshStandardMaterial({
        color: 0x030712,
        emissive: branch.color,
        emissiveIntensity: 0.35,
        roughness: 0.2,
        metalness: 0.85,
      });
      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
      branchGroup.add(nodeMesh);

      const nodeWire = new THREE.Mesh(
        nodeGeo,
        new THREE.MeshBasicMaterial({ color: branch.color, wireframe: true, transparent: true, opacity: 0.9 })
      );
      nodeWire.scale.set(1.08, 1.08, 1.08);
      branchGroup.add(nodeWire);

      // Floating Score Label Tag Card
      const tex = createTextCanvasTexture(branch.title, branch.sub, branch.tag, branch.colorHex);
      const labelMat = new THREE.MeshBasicMaterial({ map: tex, transparent: true, side: THREE.DoubleSide });
      const labelPlane = new THREE.Mesh(new THREE.PlaneGeometry(2.2, 1.3), labelMat);
      labelPlane.position.set(0, -1.5, 0.2);
      branchGroup.add(labelPlane);

      rootGroup.add(branchGroup);
      branchDocObjects.push(branchGroup);
    });

    // 5. BEZIER STREAM PIPELINES & PARTICLE FLOW GENERATORS
    // A. Inflow Curves: Document Nodes -> Central Matching Core
    const inCurves: THREE.CubicBezierCurve3[] = [];
    inputDocumentsData.forEach((inDoc) => {
      const mid1 = new THREE.Vector3(
        inDoc.pos.x * 0.55,
        inDoc.pos.y * 0.7 + 0.5,
        inDoc.pos.z * 0.5 + 1.2
      );
      const mid2 = new THREE.Vector3(
        inDoc.pos.x * 0.2,
        inDoc.pos.y * 0.2,
        0
      );
      const curve = new THREE.CubicBezierCurve3(inDoc.pos, mid1, mid2, new THREE.Vector3(0, 0, 0));
      inCurves.push(curve);

      // Glowing Pipeline Ribbon
      const points = curve.getPoints(50);
      const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
      const lineMat = new THREE.LineBasicMaterial({
        color: inDoc.color,
        transparent: true,
        opacity: 0.4,
      });
      const line = new THREE.Line(lineGeo, lineMat);
      rootGroup.add(line);
    });

    // B. Outflow Branching Curves: Central Matching Core -> Weighted Scoring Nodes
    const outCurves: THREE.CubicBezierCurve3[] = [];
    branchOutputsData.forEach((branch) => {
      const mid1 = new THREE.Vector3(
        branch.pos.x * 0.2,
        branch.pos.y * 0.25,
        0
      );
      const mid2 = new THREE.Vector3(
        branch.pos.x * 0.6,
        branch.pos.y * 0.75 + 0.5,
        branch.pos.z * 0.6
      );
      const curve = new THREE.CubicBezierCurve3(new THREE.Vector3(0, 0, 0), mid1, mid2, branch.pos);
      outCurves.push(curve);

      // Glowing Pipeline Ribbon
      const points = curve.getPoints(50);
      const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
      const lineMat = new THREE.LineBasicMaterial({
        color: branch.color,
        transparent: true,
        opacity: 0.45,
      });
      const line = new THREE.Line(lineGeo, lineMat);
      rootGroup.add(line);
    });

    // Custom Easing Functions for High-Performance Continuous Data Streaming
    const easeInIngestionStream = (t: number): number => {
      return Math.pow(t, 2.2);
    };

    const easeOutBranchStream = (t: number): number => {
      return 1 - Math.pow(1 - t, 3.0);
    };

    // 6. HIGH-DENSITY CONTINUOUS STREAMING PARTICLES
    const inParticleCount = 420;
    const inPositions = new Float32Array(inParticleCount * 3);
    const inParticleProgress: {
      curveIdx: number;
      t: number;
      speed: number;
      offset: number;
      radialPhase: number;
      driftSpeed: number;
    }[] = [];

    for (let i = 0; i < inParticleCount; i++) {
      const curveIdx = i % inCurves.length;
      const t = (i / inParticleCount) % 1.0;
      const speed = 0.0042 + (i % 7) * 0.00035;
      const radialPhase = Math.random() * Math.PI * 2;
      const driftSpeed = 2.0 + Math.random() * 2.5;
      
      inParticleProgress.push({
        curveIdx,
        t,
        speed,
        offset: (i % 24) / 24,
        radialPhase,
        driftSpeed,
      });

      const easedT = easeInIngestionStream(t);
      const pt = inCurves[curveIdx].getPoint(easedT);
      inPositions[i * 3] = pt.x;
      inPositions[i * 3 + 1] = pt.y;
      inPositions[i * 3 + 2] = pt.z;
    }

    const inParticlesGeo = new THREE.BufferGeometry();
    inParticlesGeo.setAttribute('position', new THREE.BufferAttribute(inPositions, 3));
    const inParticlesMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.22,
      transparent: true,
      opacity: 0.94,
      blending: THREE.AdditiveBlending,
    });
    const inParticleSystem = new THREE.Points(inParticlesGeo, inParticlesMat);
    rootGroup.add(inParticleSystem);

    // Outflow Particles
    const outParticleCount = 440;
    const outPositions = new Float32Array(outParticleCount * 3);
    const outColors = new Float32Array(outParticleCount * 3);
    const outParticleProgress: {
      curveIdx: number;
      t: number;
      speed: number;
      radialPhase: number;
      driftSpeed: number;
    }[] = [];

    for (let i = 0; i < outParticleCount; i++) {
      const curveIdx = i % outCurves.length;
      const t = (i / outParticleCount) % 1.0;
      const speed = 0.0046 + (i % 5) * 0.0004;
      const radialPhase = Math.random() * Math.PI * 2;
      const driftSpeed = 2.5 + Math.random() * 3.0;

      outParticleProgress.push({
        curveIdx,
        t,
        speed,
        radialPhase,
        driftSpeed,
      });

      const easedT = easeOutBranchStream(t);
      const pt = outCurves[curveIdx].getPoint(easedT);
      outPositions[i * 3] = pt.x;
      outPositions[i * 3 + 1] = pt.y;
      outPositions[i * 3 + 2] = pt.z;

      const bColor = new THREE.Color(branchOutputsData[curveIdx].color);
      outColors[i * 3] = bColor.r;
      outColors[i * 3 + 1] = bColor.g;
      outColors[i * 3 + 2] = bColor.b;
    }

    const outParticlesGeo = new THREE.BufferGeometry();
    outParticlesGeo.setAttribute('position', new THREE.BufferAttribute(outPositions, 3));
    outParticlesGeo.setAttribute('color', new THREE.BufferAttribute(outColors, 3));
    const outParticlesMat = new THREE.PointsMaterial({
      vertexColors: true,
      size: 0.24,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
    });
    const outParticleSystem = new THREE.Points(outParticlesGeo, outParticlesMat);
    rootGroup.add(outParticleSystem);

    // 7. AMBIENT BACKGROUND TENSOR FIELD
    const ambientCount = 320;
    const ambientGeo = new THREE.BufferGeometry();
    const ambientPos = new Float32Array(ambientCount * 3);
    for (let i = 0; i < ambientCount * 3; i += 3) {
      ambientPos[i] = (Math.random() - 0.5) * 40;
      ambientPos[i + 1] = (Math.random() - 0.5) * 22;
      ambientPos[i + 2] = (Math.random() - 0.5) * 18;
    }
    ambientGeo.setAttribute('position', new THREE.BufferAttribute(ambientPos, 3));
    const ambientMat = new THREE.PointsMaterial({
      color: 0x334155,
      size: 0.09,
      transparent: true,
      opacity: 0.45,
    });
    const ambientSystem = new THREE.Points(ambientGeo, ambientMat);
    scene.add(ambientSystem);

    // 8. SCENE LIGHTING
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.75);
    scene.add(ambientLight);

    const coreLightCyan = new THREE.PointLight(0x06b6d4, 4.0, 24);
    coreLightCyan.position.set(0, 0, 4);
    scene.add(coreLightCyan);

    const branchLightEmerald = new THREE.PointLight(0x10b981, 2.5, 26);
    branchLightEmerald.position.set(9, 3, 5);
    scene.add(branchLightEmerald);

    const branchLightPurple = new THREE.PointLight(0xa855f7, 2.5, 26);
    branchLightPurple.position.set(9, -3, 5);
    scene.add(branchLightPurple);

    // 9. MOUSE TRACKING & PARALLAX DAMPING
    let targetRotationX = 0;
    let targetRotationY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive) return;
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetRotationY = x * 0.28;
      targetRotationX = -y * 0.16;
    };

    container.addEventListener('mousemove', handleMouseMove);

    // 10. ANIMATION & 60 FPS THROTTLED TICK LOOP
    const TARGET_FPS = 60;
    const FRAME_INTERVAL_MS = 1000 / TARGET_FPS;
    let lastFrameTime = performance.now();
    let clock = new THREE.Clock();
    let isVisible = true;

    // Viewport Visibility Observer
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    const animate = (currentTime: number = performance.now()) => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisible) return;

      const elapsedMs = currentTime - lastFrameTime;
      if (elapsedMs < FRAME_INTERVAL_MS - 0.75) {
        return;
      }

      lastFrameTime = currentTime - (elapsedMs % FRAME_INTERVAL_MS);

      const deltaSec = Math.min(elapsedMs / 1000, 0.05);
      const deltaScale = deltaSec * 60;
      const elapsedTime = clock.getElapsedTime();

      // Smooth Rotation Damping
      rootGroup.rotation.y += (targetRotationY - rootGroup.rotation.y) * 0.05 * deltaScale;
      rootGroup.rotation.x += (targetRotationX - rootGroup.rotation.x) * 0.05 * deltaScale;

      // Compute Staggered Resume Ingestion Rhythm & Core Data-Crunching State
      const crunchRhythm = (elapsedTime * 3.2) % (Math.PI * 2);
      const rawAbsorption = Math.pow(Math.max(0, Math.sin(crunchRhythm)), 4);
      const crunchIntensity = rawAbsorption;

      // Data-crunching micro-oscillation
      const crunchJitterX = Math.sin(elapsedTime * 34) * crunchIntensity * 0.035;
      const crunchJitterY = Math.cos(elapsedTime * 38) * crunchIntensity * 0.045;
      const crunchJitterZ = Math.sin(elapsedTime * 26) * crunchIntensity * 0.03;
      coreGroup.position.set(crunchJitterX, crunchJitterY, crunchJitterZ);

      // Rotate Central Core
      coreMesh.rotation.y += (0.009 + crunchIntensity * 0.022) * deltaScale;
      coreMesh.rotation.x += (0.004 + Math.sin(elapsedTime * 28) * crunchIntensity * 0.015) * deltaScale;
      coreWireMesh.rotation.y -= (0.007 + crunchIntensity * 0.018) * deltaScale;
      coreWireMesh.rotation.z += (0.005 + Math.cos(elapsedTime * 24) * crunchIntensity * 0.012) * deltaScale;

      // Core Energy Pulse
      const basePulse = 1 + Math.sin(elapsedTime * 3.0) * 0.05;
      const crunchPop = crunchIntensity * 0.16;
      const currentScale = basePulse + crunchPop;
      innerFusionMesh.scale.set(currentScale, currentScale, currentScale);
      
      coreWireMesh.scale.set(
        1.06 + crunchIntensity * 0.06,
        1.06 + crunchIntensity * 0.06,
        1.06 + crunchIntensity * 0.06
      );

      coreLightCyan.intensity = 3.2 + Math.sin(elapsedTime * 4) * 0.8 + crunchIntensity * 3.5;

      // Rotate Orbit Rings
      ring1.rotation.z += (0.012 + crunchIntensity * 0.02) * deltaScale;
      ring2.rotation.y += (0.009 + crunchIntensity * 0.018) * deltaScale;
      ring3.rotation.x += (0.007 + crunchIntensity * 0.015) * deltaScale;

      // Document nodes pulse
      inputDocObjects.forEach((grp, idx) => {
        const dispatchPhase = (elapsedTime * 3.2 + idx * 1.8) % (Math.PI * 2);
        const dispatchPulse = Math.pow(Math.max(0, Math.sin(dispatchPhase)), 3) * 0.08;
        grp.position.y = inputDocumentsData[idx].pos.y + Math.sin(elapsedTime * 1.8 + idx) * 0.12 + dispatchPulse;
        grp.scale.set(1 + dispatchPulse * 0.5, 1 + dispatchPulse * 0.5, 1 + dispatchPulse * 0.5);
        grp.rotation.y = Math.sin(elapsedTime * 1.2 + idx) * 0.08;
      });

      // Branch scoring nodes pulse
      branchDocObjects.forEach((grp, idx) => {
        const arrivalPhase = (elapsedTime * 3.2 - (idx * 0.4 + 1.2)) % (Math.PI * 2);
        const scorePulse = Math.pow(Math.max(0, Math.sin(arrivalPhase)), 3) * 0.09;
        grp.position.y = branchOutputsData[idx].pos.y + Math.sin(elapsedTime * 2.0 + idx) * 0.14 + scorePulse;
        grp.scale.set(1 + scorePulse * 0.6, 1 + scorePulse * 0.6, 1 + scorePulse * 0.6);
        grp.rotation.y += (0.012 * (idx % 2 === 0 ? 1 : -1) + scorePulse * 0.02) * deltaScale;
      });

      // Update Inflow Particles
      const inPosAttr = inParticlesGeo.attributes.position as THREE.BufferAttribute;
      const inArray = inPosAttr.array as Float32Array;

      for (let i = 0; i < inParticleCount; i++) {
        const p = inParticleProgress[i];
        p.t += p.speed * deltaScale;
        if (p.t >= 1) {
          p.t -= 1;
          p.curveIdx = (p.curveIdx + 1) % inCurves.length;
        }

        const easedT = easeInIngestionStream(p.t);
        const point = inCurves[p.curveIdx].getPoint(easedT);

        const beamFocus = (1 - easedT * 0.88) * 0.15;
        const oscillation = Math.sin(elapsedTime * p.driftSpeed + p.radialPhase);
        const crossOscillation = Math.cos(elapsedTime * p.driftSpeed + p.radialPhase);

        inArray[i * 3] = point.x + oscillation * beamFocus;
        inArray[i * 3 + 1] = point.y + crossOscillation * beamFocus;
        inArray[i * 3 + 2] = point.z + Math.sin(elapsedTime * 4 + p.radialPhase) * (beamFocus * 0.5);
      }
      inPosAttr.needsUpdate = true;

      // Update Outflow Particles
      const outPosAttr = outParticlesGeo.attributes.position as THREE.BufferAttribute;
      const outArray = outPosAttr.array as Float32Array;

      for (let i = 0; i < outParticleCount; i++) {
        const p = outParticleProgress[i];
        p.t += p.speed * deltaScale;
        if (p.t >= 1) {
          p.t -= 1;
          p.curveIdx = (p.curveIdx + 1) % outCurves.length;
        }

        const easedT = easeOutBranchStream(p.t);
        const point = outCurves[p.curveIdx].getPoint(easedT);

        const branchSpread = Math.sin(p.t * Math.PI) * 0.22;
        const oscillation = Math.sin(elapsedTime * p.driftSpeed + p.radialPhase);
        const crossOscillation = Math.cos(elapsedTime * p.driftSpeed + p.radialPhase);

        outArray[i * 3] = point.x + oscillation * branchSpread;
        outArray[i * 3 + 1] = point.y + crossOscillation * branchSpread;
        outArray[i * 3 + 2] = point.z;
      }
      outPosAttr.needsUpdate = true;

      // Rotate Ambient Particles
      ambientSystem.rotation.y = elapsedTime * 0.012;

      renderer.render(scene, camera);
    };

    animate(performance.now());

    // Resize Handling
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', handleMouseMove);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [interactive]);

  return (
    <div className="relative w-full h-[480px] sm:h-[560px] rounded-2xl overflow-hidden bg-slate-950/95 border border-cyan-500/20 shadow-2xl select-none">
      {/* Three.js Rendering Viewport */}
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Top HUD Telemetry Bar */}
      <div className="absolute top-4 left-4 right-4 flex flex-wrap items-center justify-between gap-3 pointer-events-none font-mono text-[11px]">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-cyan-500/40 text-cyan-300 backdrop-blur-md shadow-lg">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span className="font-bold tracking-wider">RESUME INTELLIGENCE ENGINE: ARCHITECTURAL FLOW</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-2.5 py-1 rounded-md bg-slate-900/80 border border-slate-800 text-slate-400 backdrop-blur-md">
            GPU WEBGL 2.0 • 60 FPS
          </div>
          <div className="px-2.5 py-1 rounded-md bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 font-bold backdrop-blur-md">
            PEARSON r = 0.932
          </div>
        </div>
      </div>

      {/* Interactive Architecture Flow Legend & Weight Pillars */}
      <div className="absolute bottom-4 left-4 right-4 grid grid-cols-1 md:grid-cols-3 gap-2.5 pointer-events-none font-mono text-xs">
        {/* 1. Left Inflow Indicator */}
        <div className="p-3 rounded-xl bg-slate-900/90 border border-sky-500/30 text-slate-300 backdrop-blur-md">
          <div className="flex items-center gap-2 text-sky-400 font-bold text-[11px] mb-1">
            <span className="w-2 h-2 rounded-full bg-sky-400" />
            <span>1. DOCUMENT INGEST & DENSE STREAM</span>
          </div>
          <p className="text-[11px] text-slate-400 font-sans">
            Multi-column PDF/DOCX resumes & 384-D Sentence-Transformer embeddings entering pipeline.
          </p>
        </div>

        {/* 2. Center Core Indicator */}
        <div className="p-3 rounded-xl bg-slate-900/90 border border-cyan-400/60 text-slate-200 backdrop-blur-md ring-1 ring-cyan-500/20">
          <div className="flex items-center gap-2 text-cyan-300 font-bold text-[11px] mb-1">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>2. DUAL-STAGE MATCHING CORE</span>
          </div>
          <p className="text-[11px] text-slate-400 font-sans">
            Fuses 60% deterministic multi-factor rules + 40% pgvector cosine semantic similarity.
          </p>
        </div>

        {/* 3. Right Outflow Indicator */}
        <div className="p-3 rounded-xl bg-slate-900/90 border border-emerald-500/30 text-slate-300 backdrop-blur-md">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-[11px] mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>3. WEIGHTED SCORING BRANCHES</span>
          </div>
          <p className="text-[11px] text-slate-400 font-sans">
            Skills (35%) • Experience (25%) • Projects (20%) • Keywords & pgvector (20%).
          </p>
        </div>
      </div>
    </div>
  );
};

