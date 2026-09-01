import * as THREE from "three";

export interface InspectedMesh { name: string; uuid: string; material: string; materialType: string; parent: string; }

export function inspectModelAtPointer(event: PointerEvent, canvas: HTMLCanvasElement, camera: THREE.Camera, root: THREE.Object3D): InspectedMesh | null {
  const bounds = canvas.getBoundingClientRect();
  const pointer = new THREE.Vector2(((event.clientX - bounds.left) / bounds.width) * 2 - 1, -((event.clientY - bounds.top) / bounds.height) * 2 + 1);
  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(pointer, camera);
  const hit = raycaster.intersectObject(root, true).find(({ object }) => object instanceof THREE.Mesh);
  if (!hit || !(hit.object instanceof THREE.Mesh)) return null;
  const material = Array.isArray(hit.object.material) ? hit.object.material[0] : hit.object.material;
  const result = { name: hit.object.name || "(sem nome)", uuid: hit.object.uuid, material: material?.name || "(sem nome)", materialType: material?.type || "(sem material)", parent: hit.object.parent?.name || "(sem nome)" };
  console.table(result);
  return result;
}
