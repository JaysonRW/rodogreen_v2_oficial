"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";
import { createTruck, type TruckRig } from "./three/truck/Truck";

export default function DumpTruckViewer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const targetAngle = useRef(0);
  const [raised, setRaised] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let disposed = false;
    let truck: TruckRig | undefined;
    let frame = 0;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
    camera.position.set(10.2, 4.7, 10.8);
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.08;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;

    const environmentScene = new RoomEnvironment();
    const pmrem = new THREE.PMREMGenerator(renderer);
    const environment = pmrem.fromScene(environmentScene, 0.04).texture;
    scene.environment = environment;
    environmentScene.dispose();
    pmrem.dispose();

    const controls = new OrbitControls(camera, canvas);
    controls.target.set(0, 1.75, 0);
    controls.enableDamping = true;
    controls.dampingFactor = 0.055;
    controls.enablePan = false;
    controls.minDistance = 7.3;
    controls.maxDistance = 17;
    controls.minPolarAngle = 0.55;
    controls.maxPolarAngle = 1.48;
    controls.autoRotate = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    controls.autoRotateSpeed = 0.42;
    const stopAutoRotate = () => { controls.autoRotate = false; };
    canvas.addEventListener("pointerdown", stopAutoRotate);

    scene.add(new THREE.HemisphereLight(0xe8f3f4, 0x27302d, 1.8));
    const key = new THREE.DirectionalLight(0xfff7e8, 4.3);
    key.position.set(7, 10, 7);
    key.castShadow = true;
    key.shadow.mapSize.set(2048, 2048);
    key.shadow.camera.left = -9;
    key.shadow.camera.right = 9;
    key.shadow.camera.top = 7;
    key.shadow.camera.bottom = -4;
    key.shadow.bias = -0.00035;
    key.shadow.radius = 2.5;
    scene.add(key);
    const fill = new THREE.DirectionalLight(0xc9e1ff, 1.65);
    fill.position.set(-7, 4, 5);
    scene.add(fill);
    const rim = new THREE.DirectionalLight(0x72d39b, 2.05);
    rim.position.set(-6, 6, -7);
    scene.add(rim);

    const ground = new THREE.Mesh(new THREE.CircleGeometry(9, 96), new THREE.MeshStandardMaterial({ color: 0xdce2dd, roughness: 0.92, metalness: 0 }));
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = 0.12;
    ground.receiveShadow = true;
    scene.add(ground);
    const contact = new THREE.Mesh(new THREE.CircleGeometry(4.9, 64), new THREE.MeshBasicMaterial({ color: 0x101715, transparent: true, opacity: 0.12, depthWrite: false }));
    contact.rotation.x = -Math.PI / 2;
    contact.scale.set(1, 0.34, 1);
    contact.position.y = 0.135;
    scene.add(contact);

    const loader = new GLTFLoader();
    loader.setMeshoptDecoder(MeshoptDecoder);
    loader.load(
      "/models/rodogreen-dump-truck.glb",
      (gltf) => {
        if (disposed) return;
        try {
          truck = createTruck(gltf);
          scene.add(truck.group);
          setProgress(100);
        } catch (loadError) {
          console.error(loadError);
          setError(true);
        }
      },
      (event) => setProgress(event.total ? Math.round((event.loaded / event.total) * 100) : 38),
      (loadError) => { console.error(loadError); setError(true); },
    );

    const clock = new THREE.Clock();
    function resize() {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      renderer.setSize(width, height, false);
      camera.aspect = width / Math.max(height, 1);
      camera.updateProjectionMatrix();
    }
    function render() {
      const delta = Math.min(clock.getDelta(), 0.05);
      truck?.animate(targetAngle.current, delta);
      controls.update(delta);
      renderer.render(scene, camera);
      frame = requestAnimationFrame(render);
    }
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    resize();
    render();

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      canvas.removeEventListener("pointerdown", stopAutoRotate);
      controls.dispose();
      scene.traverse((object) => {
        if (!(object instanceof THREE.Mesh)) return;
        object.geometry.dispose();
        const materials = Array.isArray(object.material) ? object.material : [object.material];
        materials.forEach((material) => material.dispose());
      });
      environment.dispose();
      renderer.dispose();
    };
  }, []);

  function toggleBed() {
    const next = !raised;
    setRaised(next);
    targetAngle.current = next ? -0.58 : 0;
  }

  return (
    <div className="truck-viewer">
      <canvas ref={canvasRef} aria-label="Modelo 3D realista e interativo da caçamba basculante Rodogreen" />
      {progress < 100 && !error && <div className="truck-loading"><span>Carregando engenharia 3D</span><strong>{progress}%</strong><i style={{ width: `${progress}%` }} /></div>}
      {error && <div className="truck-loading truck-error">Não foi possível carregar o modelo 3D.</div>}
      <div className="truck-viewer-top"><span>Gêmeo digital · Rodogreen</span><strong>Caçamba basculante industrial</strong></div>
      <div className="truck-specs" aria-label="Especificações do modelo representado">
        <span><i>01</i> Estrutura reforçada</span><span><i>02</i> Hidráulica proporcional</span><span><i>03</i> Visualização 360°</span>
      </div>
      <button className={raised ? "truck-action active" : "truck-action"} type="button" onClick={toggleBed} disabled={progress < 100 || error}>
        <span><small>Demonstração mecânica</small>{raised ? "Retornar à posição" : "Bascular caçamba"}</span><i aria-hidden="true">{raised ? "↓" : "↑"}</i>
      </button>
      <p className="truck-hint">Arraste para girar · Role para aproximar</p>
    </div>
  );
}
