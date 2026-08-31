import * as THREE from "three";
import type { TruckMaterials } from "./materials";

export function createChassis(baseModel: THREE.Mesh, bounds: THREE.Box3, materials: TruckMaterials) {
  const chassis = new THREE.Group();
  chassis.name = "Chassis";
  chassis.add(baseModel);
  chassis.userData.bounds = bounds.clone();
  chassis.userData.materials = materials;
  return chassis;
}
