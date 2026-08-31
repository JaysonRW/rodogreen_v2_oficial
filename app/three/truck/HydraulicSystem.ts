import * as THREE from "three";
import type { TruckMaterials } from "./materials";

function segment(material: THREE.Material, radius: number) {
  const mesh = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, 1, 20), material);
  mesh.castShadow = true;
  return mesh;
}

export class HydraulicSystem extends THREE.Group {
  readonly outerCylinder: THREE.Mesh;
  readonly innerRod: THREE.Mesh;
  readonly upperPivot: THREE.Mesh;
  readonly lowerPivot: THREE.Mesh;
  private readonly up = new THREE.Vector3(0, 1, 0);
  private readonly upperWorld = new THREE.Vector3();
  private readonly direction = new THREE.Vector3();
  constructor(private readonly dumpBody: THREE.Group, private readonly upperMount: THREE.Vector3, private readonly lowerMount: THREE.Vector3, materials: TruckMaterials) {
    super();
    this.name = "HydraulicSystem";
    this.outerCylinder = segment(materials.chassis, 0.026); this.outerCylinder.name = "outerCylinder";
    this.innerRod = segment(materials.chrome, 0.014); this.innerRod.name = "innerRod";
    this.lowerPivot = new THREE.Mesh(new THREE.SphereGeometry(0.045, 18, 12), materials.chassis); this.lowerPivot.name = "lowerPivot";
    this.upperPivot = new THREE.Mesh(new THREE.SphereGeometry(0.034, 18, 12), materials.chrome); this.upperPivot.name = "upperPivot";
    this.add(this.outerCylinder, this.innerRod, this.lowerPivot, this.upperPivot);
  }
  update() {
    this.upperWorld.copy(this.upperMount);
    this.dumpBody.localToWorld(this.upperWorld);
    this.parent?.worldToLocal(this.upperWorld);
    this.direction.subVectors(this.upperWorld, this.lowerMount);
    const length = this.direction.length();
    const outerLength = length * 0.58;
    const normal = this.direction.clone().normalize();
    this.outerCylinder.position.copy(this.lowerMount).addScaledVector(normal, outerLength * 0.5);
    this.outerCylinder.scale.y = outerLength;
    this.outerCylinder.quaternion.setFromUnitVectors(this.up, normal);
    this.innerRod.position.copy(this.lowerMount).addScaledVector(normal, outerLength + (length - outerLength) * 0.5);
    this.innerRod.scale.y = length - outerLength;
    this.innerRod.quaternion.setFromUnitVectors(this.up, normal);
    this.lowerPivot.position.copy(this.lowerMount);
    this.upperPivot.position.copy(this.upperWorld);
  }
}
