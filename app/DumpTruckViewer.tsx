"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

function box(
  size: [number, number, number],
  material: THREE.Material,
  position: [number, number, number],
) {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(...size), material);
  mesh.position.set(...position);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

function wheel(materials: { tire: THREE.Material; rim: THREE.Material }) {
  const group = new THREE.Group();
  const tire = new THREE.Mesh(new THREE.CylinderGeometry(0.61, 0.61, 0.38, 32), materials.tire);
  tire.rotation.x = Math.PI / 2;
  tire.castShadow = true;
  group.add(tire);

  const rim = new THREE.Mesh(new THREE.CylinderGeometry(0.31, 0.31, 0.405, 24), materials.rim);
  rim.rotation.x = Math.PI / 2;
  rim.castShadow = true;
  group.add(rim);

  const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.105, 0.105, 0.425, 20), materials.tire);
  hub.rotation.x = Math.PI / 2;
  group.add(hub);
  return group;
}

export default function DumpTruckViewer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const targetAngle = useRef(0);
  const [raised, setRaised] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
    camera.position.set(10.5, 5.7, 11.5);

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.08;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    const controls = new OrbitControls(camera, canvas);
    controls.target.set(0, 1.65, 0);
    controls.enableDamping = true;
    controls.dampingFactor = 0.055;
    controls.enablePan = false;
    controls.minDistance = 8;
    controls.maxDistance = 19;
    controls.minPolarAngle = 0.55;
    controls.maxPolarAngle = 1.48;
    controls.autoRotate = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    controls.autoRotateSpeed = 0.55;
    canvas.addEventListener("pointerdown", () => { controls.autoRotate = false; });

    scene.add(new THREE.HemisphereLight(0xe9f4ff, 0x26322d, 2.5));
    const key = new THREE.DirectionalLight(0xffffff, 4.2);
    key.position.set(6, 10, 8);
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    key.shadow.camera.left = -10;
    key.shadow.camera.right = 10;
    key.shadow.camera.top = 8;
    key.shadow.camera.bottom = -5;
    scene.add(key);
    const rimLight = new THREE.DirectionalLight(0x74d6a0, 1.5);
    rimLight.position.set(-8, 4, -6);
    scene.add(rimLight);

    const yellow = new THREE.MeshStandardMaterial({ color: 0xf0cb12, metalness: 0.52, roughness: 0.31 });
    const yellowDark = new THREE.MeshStandardMaterial({ color: 0xc9a900, metalness: 0.58, roughness: 0.35 });
    const graphite = new THREE.MeshStandardMaterial({ color: 0x111715, metalness: 0.7, roughness: 0.28 });
    const rubber = new THREE.MeshStandardMaterial({ color: 0x0b0d0c, roughness: 0.82 });
    const chrome = new THREE.MeshStandardMaterial({ color: 0xb7bfbc, metalness: 0.92, roughness: 0.18 });
    const glass = new THREE.MeshPhysicalMaterial({ color: 0x162c34, metalness: 0.2, roughness: 0.08, transmission: 0.12, transparent: true, opacity: 0.9 });
    const red = new THREE.MeshStandardMaterial({ color: 0xc72d25, emissive: 0x440000, emissiveIntensity: 0.35 });
    const white = new THREE.MeshStandardMaterial({ color: 0xe7ece9, metalness: 0.25, roughness: 0.35 });

    const truck = new THREE.Group();
    truck.rotation.y = -0.18;
    scene.add(truck);

    truck.add(box([7.4, 0.27, 1.55], graphite, [0.15, 1.22, 0]));
    truck.add(box([5.2, 0.18, 0.2], chrome, [-0.55, 1.46, 0.67]));
    truck.add(box([5.2, 0.18, 0.2], chrome, [-0.55, 1.46, -0.67]));
    truck.add(box([1.45, 0.65, 1.45], graphite, [0.65, 1.02, 0]));

    const cabinShape = new THREE.Shape();
    cabinShape.moveTo(1.8, 1.33);
    cabinShape.lineTo(4.18, 1.33);
    cabinShape.lineTo(4.12, 3.15);
    cabinShape.lineTo(3.67, 3.75);
    cabinShape.lineTo(2.25, 3.75);
    cabinShape.lineTo(1.86, 3.18);
    cabinShape.closePath();
    const cabinGeometry = new THREE.ExtrudeGeometry(cabinShape, { depth: 1.72, bevelEnabled: true, bevelSize: 0.06, bevelThickness: 0.06, bevelSegments: 2 });
    cabinGeometry.translate(0, 0, -0.86);
    const cabin = new THREE.Mesh(cabinGeometry, yellow);
    cabin.castShadow = true;
    truck.add(cabin);

    [-0.875, 0.875].forEach((z, side) => {
      const windowMesh = box([1.08, 0.86, 0.035], glass, [3.15, 3.08, z]);
      windowMesh.rotation.z = side === 0 ? -0.035 : 0.035;
      truck.add(windowMesh);
      truck.add(box([0.36, 0.18, 0.13], graphite, [3.95, 2.64, z * 1.04]));
    });
    truck.add(box([0.16, 1.22, 1.42], graphite, [4.19, 2.19, 0]));
    truck.add(box([0.2, 0.35, 1.66], chrome, [4.23, 1.32, 0]));

    const wheels: THREE.Group[] = [];
    [3.12, -0.65, -2.43].forEach((x) => {
      [-0.91, 0.91].forEach((z) => {
        const item = wheel({ tire: rubber, rim: chrome });
        item.position.set(x, 0.76, z);
        truck.add(item);
        wheels.push(item);
      });
    });

    const bedPivot = new THREE.Group();
    bedPivot.position.set(-3.45, 1.58, 0);
    truck.add(bedPivot);
    bedPivot.add(box([5.18, 0.24, 2.02], yellowDark, [2.56, 0.06, 0]));

    const panelShape = new THREE.Shape();
    panelShape.moveTo(0.02, 0.12);
    panelShape.lineTo(5.1, 0.12);
    panelShape.lineTo(4.78, 1.72);
    panelShape.lineTo(0.16, 1.72);
    panelShape.closePath();
    const panelGeometry = new THREE.ExtrudeGeometry(panelShape, { depth: 0.095, bevelEnabled: true, bevelSize: 0.025, bevelThickness: 0.025, bevelSegments: 1 });
    [-1.06, 0.965].forEach((z) => {
      const panel = new THREE.Mesh(panelGeometry, yellow);
      panel.position.z = z;
      panel.castShadow = true;
      bedPivot.add(panel);
      [0.35, 1.65, 2.95, 4.25].forEach((x) => bedPivot.add(box([0.1, 1.62, 0.13], yellowDark, [x, 0.9, z + 0.045])));
      bedPivot.add(box([4.95, 0.12, 0.14], yellowDark, [2.55, 1.73, z + 0.045]));
      [0.65, 1.15, 1.65, 2.15, 2.65, 3.15, 3.65, 4.15].forEach((x, index) => {
        bedPivot.add(box([0.25, 0.055, 0.025], index % 2 ? white : red, [x, 0.3, z + (z > 0 ? 0.14 : -0.02)]));
      });
    });
    bedPivot.add(box([0.18, 1.62, 2.04], yellowDark, [0.12, 0.88, 0]));
    bedPivot.add(box([0.16, 1.62, 2.04], yellowDark, [4.92, 0.88, 0]));

    const hydraulic = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.16, 1, 18), chrome);
    hydraulic.castShadow = true;
    truck.add(hydraulic);
    const hydraulicBase = new THREE.Vector3(0.35, 1.43, 0);
    const hydraulicTarget = new THREE.Vector3();
    const bedMount = new THREE.Vector3(3.2, 0.03, 0);

    const spare = wheel({ tire: rubber, rim: chrome });
    spare.scale.setScalar(0.72);
    spare.rotation.x = Math.PI / 2;
    spare.position.set(1.42, 2.03, 0);
    truck.add(spare);

    const ground = new THREE.Mesh(
      new THREE.CircleGeometry(8.5, 64),
      new THREE.MeshStandardMaterial({ color: 0xdfe4df, roughness: 0.9, metalness: 0 }),
    );
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = 0.14;
    ground.receiveShadow = true;
    scene.add(ground);
    const ring = new THREE.Mesh(
      new THREE.RingGeometry(6.2, 6.24, 96),
      new THREE.MeshBasicMaterial({ color: 0x7e8a84, transparent: true, opacity: 0.26, side: THREE.DoubleSide }),
    );
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = 0.15;
    scene.add(ring);

    const clock = new THREE.Clock();
    let frame = 0;
    const up = new THREE.Vector3(0, 1, 0);
    const direction = new THREE.Vector3();

    function resize() {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      renderer.setSize(width, height, false);
      camera.aspect = width / Math.max(height, 1);
      camera.updateProjectionMatrix();
    }

    function render() {
      const delta = Math.min(clock.getDelta(), 0.05);
      bedPivot.rotation.z = THREE.MathUtils.damp(bedPivot.rotation.z, targetAngle.current, 4.8, delta);
      bedPivot.updateMatrixWorld();
      hydraulicTarget.copy(bedMount);
      bedPivot.localToWorld(hydraulicTarget);
      truck.worldToLocal(hydraulicTarget);
      direction.subVectors(hydraulicTarget, hydraulicBase);
      hydraulic.position.copy(hydraulicBase).addScaledVector(direction, 0.5);
      hydraulic.scale.y = direction.length();
      hydraulic.quaternion.setFromUnitVectors(up, direction.clone().normalize());
      controls.update(delta);
      renderer.render(scene, camera);
      frame = requestAnimationFrame(render);
    }

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    resize();
    render();
    setReady(true);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      controls.dispose();
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          const materials = Array.isArray(object.material) ? object.material : [object.material];
          materials.forEach((material) => material.dispose());
        }
      });
      renderer.dispose();
    };
  }, []);

  function toggleBed() {
    const next = !raised;
    setRaised(next);
    targetAngle.current = next ? 0.53 : 0;
  }

  return (
    <div className="truck-viewer">
      <canvas ref={canvasRef} aria-label="Modelo 3D interativo de caminhão com caçamba basculante Rodogreen" />
      {!ready && <div className="truck-loading">Preparando modelo 3D...</div>}
      <div className="truck-viewer-top">
        <span>Modelo digital · Forza</span>
        <strong>Arraste para girar 360°</strong>
      </div>
      <div className="truck-specs" aria-label="Especificações do modelo representado">
        <span><i>01</i> Estrutura reforçada</span>
        <span><i>02</i> Hidráulica articulada</span>
        <span><i>03</i> Chassi 6×4</span>
      </div>
      <button className={raised ? "truck-action active" : "truck-action"} type="button" onClick={toggleBed}>
        <span><small>Demonstração</small>{raised ? "Baixar caçamba" : "Elevar caçamba"}</span>
        <i aria-hidden="true">{raised ? "↓" : "↑"}</i>
      </button>
      <p className="truck-hint">Arraste para orbitar · Role para aproximar</p>
    </div>
  );
}
