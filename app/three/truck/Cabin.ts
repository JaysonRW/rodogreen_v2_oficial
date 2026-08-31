import * as THREE from "three";
import type { TruckMaterials } from "./materials";

export function createCabin(bounds: THREE.Box3, materials: TruckMaterials) {
  const cabin = new THREE.Group();
  cabin.name = "Cabin";
  cabin.userData.bounds = bounds.clone();
  cabin.userData.materials = materials;
  return cabin;
}
