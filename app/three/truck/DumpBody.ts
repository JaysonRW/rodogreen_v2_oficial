import * as THREE from "three";
import { industrialBox } from "./geometry";
import type { TruckMaterials } from "./materials";

export interface DumpBodyRig { group: THREE.Group; upperMount: THREE.Vector3; }

export function createDumpBody(bodyModel: THREE.Mesh, bounds: THREE.Box3, materials: TruckMaterials): DumpBodyRig {
  const size = bounds.getSize(new THREE.Vector3());
  const hinge = new THREE.Vector3(bounds.max.x - size.x * 0.055, bounds.min.y + size.y * 0.42, 0);
  const group = new THREE.Group();
  group.name = "DumpBody";
  group.position.copy(hinge);
  bodyModel.position.copy(hinge).multiplyScalar(-1);
  group.add(bodyModel);
  const local = (x: number, y: number, z: number): [number, number, number] => [x - hinge.x, y - hinge.y, z];
  const start = bounds.min.x + size.x * 0.34;
  const end = bounds.max.x - size.x * 0.05;
  const length = end - start;
  const sideZ = size.z * 0.47;
  const lowY = bounds.min.y + size.y * 0.49;
  const topY = bounds.max.y - size.y * 0.025;
  const sidePanels = new THREE.Group(); sidePanels.name = "sidePanels";
  const structuralRibs = new THREE.Group(); structuralRibs.name = "structuralRibs";
  const frontPanel = new THREE.Group(); frontPanel.name = "frontPanel";
  const rearGate = new THREE.Group(); rearGate.name = "rearGate";
  const lowerFrame = new THREE.Group(); lowerFrame.name = "lowerFrame";
  const ladder = new THREE.Group(); ladder.name = "ladder";
  const reflectiveStripes = new THREE.Group(); reflectiveStripes.name = "reflectiveStripes";
  [-sideZ, sideZ].forEach((z) => {
    sidePanels.add(industrialBox([length, size.y * 0.032, size.z * 0.045], materials.yellowDark, local((start + end) / 2, topY, z)));
    [0.15, 0.38, 0.61, 0.84].forEach((ratio) => structuralRibs.add(industrialBox([size.x * 0.018, topY - lowY, size.z * 0.045], materials.yellowDark, local(start + length * ratio, (topY + lowY) / 2, z))));
    for (let index = 0; index < 7; index += 1) {
      const material = index % 2 ? materials.reflectorWhite : materials.reflectorRed;
      reflectiveStripes.add(industrialBox([size.x * 0.043, size.y * 0.017, size.z * 0.018], material, local(start + length * (0.11 + index * 0.13), lowY + size.y * 0.04, z * 1.045)));
    }
  });
  [-sideZ, sideZ].forEach((z) => frontPanel.add(industrialBox([size.x * 0.024, topY - lowY, size.z * 0.045], materials.yellowDark, local(end, (topY + lowY) / 2, z))));
  frontPanel.add(industrialBox([size.x * 0.035, size.y * 0.035, size.z * 0.92], materials.yellowDark, local(start, topY, 0)));
  rearGate.add(industrialBox([size.x * 0.035, topY - lowY, size.z * 0.92], materials.yellowDark, local(end, (topY + lowY) / 2, 0)));
  lowerFrame.add(industrialBox([length * 0.9, size.y * 0.045, size.z * 0.62], materials.chassis, local((start + end) / 2, lowY - size.y * 0.045, 0)));
  const ladderX = end - size.x * 0.045;
  [-size.z * 0.42, -size.z * 0.31].forEach((z) => ladder.add(industrialBox([size.x * 0.018, topY - lowY, size.z * 0.018], materials.yellowDark, local(ladderX, (topY + lowY) / 2, z))));
  for (let index = 0; index < 5; index += 1) ladder.add(industrialBox([size.x * 0.022, size.y * 0.018, size.z * 0.12], materials.yellowDark, local(ladderX, lowY + (topY - lowY) * (0.14 + index * 0.18), -size.z * 0.365)));
  group.add(sidePanels, structuralRibs, frontPanel, rearGate, lowerFrame, ladder, reflectiveStripes);
  return { group, upperMount: new THREE.Vector3(start - hinge.x + size.x * 0.08, lowY - hinge.y, 0) };
}
