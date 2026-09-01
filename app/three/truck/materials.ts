import * as THREE from "three";
import { createTruckMaterialOverrides } from "./truckMaterialOverrides";

export type TruckMaterials = ReturnType<typeof createTruckMaterials>;

export function createTruckMaterials() {
  const overrides = createTruckMaterialOverrides();
  return {
    ...overrides,
    yellow: overrides.rodogreenYellow,
    yellowDark: new THREE.MeshStandardMaterial({ color: 0xb48c05, metalness: 0.52, roughness: 0.42 }),
    chassis: overrides.chassisMetal,
    chrome: overrides.hydraulicChrome,
    glass: overrides.truckGlass,
    reflectorRed: new THREE.MeshStandardMaterial({ color: 0xad241d, roughness: 0.28, emissive: 0x3b0704 }),
    reflectorWhite: new THREE.MeshStandardMaterial({ color: 0xf0e5cf, roughness: 0.24, emissive: 0x312d25 }),
  };
}

export function tuneImportedMaterial(material: THREE.Material) {
  if (!(material instanceof THREE.MeshStandardMaterial)) return material;
  const tuned = material.clone();
  tuned.metalness = THREE.MathUtils.clamp(tuned.metalness * 0.78 + 0.18, 0.35, 0.55);
  tuned.roughness = THREE.MathUtils.clamp(tuned.roughness * 0.62 + 0.13, 0.3, 0.45);
  tuned.envMapIntensity = 1.15;
  tuned.side = THREE.DoubleSide;
  return tuned;
}
