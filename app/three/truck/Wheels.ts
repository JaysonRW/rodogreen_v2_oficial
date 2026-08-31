import * as THREE from "three";
import type { TruckMaterials } from "./materials";

export function createWheels(bounds: THREE.Box3, materials: TruckMaterials) {
  const wheels = new THREE.Group();
  wheels.name = "Wheels";
  wheels.userData.bounds = bounds.clone();
  wheels.userData.materials = materials;
  return wheels;
}
