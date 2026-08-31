import * as THREE from "three";

export type TruckMaterials = ReturnType<typeof createTruckMaterials>;

export function createTruckMaterials() {
  return {
    yellow: new THREE.MeshPhysicalMaterial({ color: 0xe5bd0a, metalness: 0.46, roughness: 0.36, clearcoat: 0.18, clearcoatRoughness: 0.3 }),
    yellowDark: new THREE.MeshStandardMaterial({ color: 0xb48c05, metalness: 0.52, roughness: 0.42 }),
    chassis: new THREE.MeshStandardMaterial({ color: 0x101412, metalness: 0.72, roughness: 0.46 }),
    chrome: new THREE.MeshPhysicalMaterial({ color: 0xd5dcda, metalness: 1, roughness: 0.13 }),
    glass: new THREE.MeshPhysicalMaterial({ color: 0x17282d, metalness: 0.15, roughness: 0.08, transmission: 0.18, transparent: true, opacity: 0.82 }),
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
