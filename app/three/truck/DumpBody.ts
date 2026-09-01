import * as THREE from "three";

export interface DumpBodyRig { group: THREE.Group; upperMount: THREE.Vector3; }

export function createDumpBody(bodyModel: THREE.Mesh, bounds: THREE.Box3): DumpBodyRig {
  const size = bounds.getSize(new THREE.Vector3());
  const hinge = new THREE.Vector3(bounds.max.x - size.x * 0.055, bounds.min.y + size.y * 0.42, 0);
  const group = new THREE.Group();
  group.name = "DumpBody";
  group.position.copy(hinge);
  bodyModel.name = "DumpBodySurface";
  bodyModel.position.copy(hinge).multiplyScalar(-1);
  group.add(bodyModel);

  ["sidePanels", "structuralRibs", "frontPanel", "rearGate", "lowerFrame", "ladder", "reflectiveStripes"].forEach((name) => {
    const semanticGroup = new THREE.Group();
    semanticGroup.name = name;
    group.add(semanticGroup);
  });

  const frontX = bounds.min.x + size.x * 0.42;
  const lowY = bounds.min.y + size.y * 0.49;
  return { group, upperMount: new THREE.Vector3(frontX - hinge.x, lowY - hinge.y, 0) };
}
