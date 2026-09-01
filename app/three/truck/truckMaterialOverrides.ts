import * as THREE from "three";

/** Nomes confirmados pelo inspector podem ser adicionados aqui sem editar o GLB. */
export const hiddenMeshes: string[] = [];

export function createTruckMaterialOverrides() {
  const rodogreenYellow = new THREE.MeshPhysicalMaterial({
    name: "rodogreenYellow", color: new THREE.Color("#E1C21A"), metalness: 0.42, roughness: 0.34,
    clearcoat: 0.15, clearcoatRoughness: 0.25, envMapIntensity: 1.2, side: THREE.DoubleSide,
  });
  const rodogreenInteriorYellow = rodogreenYellow.clone();
  rodogreenInteriorYellow.name = "rodogreenInteriorYellow";
  rodogreenInteriorYellow.roughness = 0.45;
  rodogreenInteriorYellow.clearcoat = 0.05;
  return {
    rodogreenYellow,
    rodogreenInteriorYellow,
    truckGlass: new THREE.MeshPhysicalMaterial({ name: "truckGlass", color: 0x182326, metalness: 0, roughness: 0.08, transmission: 0.35, transparent: true, opacity: 0.82, ior: 1.45, thickness: 0.02, envMapIntensity: 1.5, side: THREE.DoubleSide }),
    blackPlastic: new THREE.MeshStandardMaterial({ name: "blackPlastic", color: 0x101312, metalness: 0.02, roughness: 0.62 }),
    chassisMetal: new THREE.MeshStandardMaterial({ name: "chassisMetal", color: 0x17191a, roughness: 0.42, metalness: 0.7 }),
    tireRubber: new THREE.MeshStandardMaterial({ name: "tireRubber", color: 0x111111, roughness: 0.72, metalness: 0.02 }),
    wheelMetal: new THREE.MeshStandardMaterial({ name: "wheelMetal", color: 0xbfc2c4, roughness: 0.24, metalness: 0.85 }),
    hydraulicChrome: new THREE.MeshPhysicalMaterial({ name: "hydraulicChrome", color: 0xd6dddb, metalness: 1, roughness: 0.12, envMapIntensity: 1.5 }),
  };
}

export type TruckMaterialOverrides = ReturnType<typeof createTruckMaterialOverrides>;

export function applyHiddenMeshes(root: THREE.Object3D) {
  hiddenMeshes.forEach((name) => {
    const object = root.getObjectByName(name);
    if (object) object.visible = false;
  });
}

export function printModelHierarchy(root: THREE.Object3D) {
  console.groupCollapsed("[Rodogreen 3D] Hierarquia do GLB");
  root.traverse((object) => {
    const mesh = object instanceof THREE.Mesh ? object : undefined;
    const material = mesh && !Array.isArray(mesh.material) ? mesh.material : undefined;
    console.log({ name: object.name || "(sem nome)", type: object.type, material: material?.name || "(sem material)" });
  });
  console.groupEnd();
}
