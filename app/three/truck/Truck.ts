import * as THREE from "three";
import type { GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";
import { createCabin } from "./Cabin";
import { createChassis } from "./Chassis";
import { createDumpBody } from "./DumpBody";
import { splitTruckGeometry } from "./geometry";
import { HydraulicSystem } from "./HydraulicSystem";
import { createTruckMaterials, tuneImportedMaterial } from "./materials";
import { createWheels } from "./Wheels";

export interface TruckRig { group: THREE.Group; dumpBody: THREE.Group; hydraulic: HydraulicSystem; animate: (targetAngle: number, delta: number) => void; }

export function createTruck(gltf: GLTF): TruckRig {
  gltf.scene.updateMatrixWorld(true);
  let imported: THREE.Mesh | undefined;
  gltf.scene.traverse((object) => { if (!imported && object instanceof THREE.Mesh) imported = object; });
  if (!imported) throw new Error("O GLB não contém uma malha utilizável.");
  const sourceMesh = imported as THREE.Mesh<THREE.BufferGeometry, THREE.Material | THREE.Material[]>;
  const sourceGeometry = sourceMesh.geometry.clone();
  sourceGeometry.applyMatrix4(sourceMesh.matrixWorld);
  const { bounds, body, base } = splitTruckGeometry(sourceGeometry);
  const sourceMaterial = Array.isArray(sourceMesh.material) ? sourceMesh.material[0] : sourceMesh.material;
  const assetMaterial = tuneImportedMaterial(sourceMaterial);
  const baseModel = new THREE.Mesh(base, assetMaterial);
  const bodyModel = new THREE.Mesh(body, assetMaterial.clone());
  [baseModel, bodyModel].forEach((mesh) => { mesh.castShadow = true; mesh.receiveShadow = true; });
  const materials = createTruckMaterials();
  const group = new THREE.Group(); group.name = "Truck";
  const size = bounds.getSize(new THREE.Vector3());
  const scale = 7.8 / size.x;
  const center = bounds.getCenter(new THREE.Vector3());
  group.scale.setScalar(scale);
  group.position.set(-center.x * scale, 0.18 - bounds.min.y * scale, -center.z * scale);
  group.rotation.y = -0.12;
  const chassis = createChassis(baseModel, bounds, materials);
  const cabin = createCabin(bounds, materials);
  const wheels = createWheels(bounds, materials);
  const dump = createDumpBody(bodyModel, bounds, materials);
  const lowerMount = new THREE.Vector3(bounds.min.x + size.x * 0.52, bounds.min.y + size.y * 0.33, 0);
  const hydraulic = new HydraulicSystem(dump.group, dump.upperMount, lowerMount, materials);
  group.add(chassis, cabin, wheels, dump.group, hydraulic);
  return { group, dumpBody: dump.group, hydraulic, animate(targetAngle, delta) { dump.group.rotation.z = THREE.MathUtils.damp(dump.group.rotation.z, targetAngle, 4.2, delta); group.updateMatrixWorld(true); hydraulic.update(); } };
}
