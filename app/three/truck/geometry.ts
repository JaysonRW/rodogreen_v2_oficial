import * as THREE from "three";

export function industrialBox(size: [number, number, number], material: THREE.Material, position: [number, number, number]) {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(...size, 2, 2, 2), material);
  mesh.position.set(...position);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

function subsetGeometry(source: THREE.BufferGeometry, indices: number[]) {
  const geometry = source.clone();
  geometry.setIndex(new THREE.Uint32BufferAttribute(indices, 1));
  geometry.computeBoundingBox();
  geometry.computeBoundingSphere();
  return geometry;
}

export function splitTruckGeometry(source: THREE.BufferGeometry) {
  const bounds = new THREE.Box3().setFromBufferAttribute(source.getAttribute("position") as THREE.BufferAttribute);
  const size = bounds.getSize(new THREE.Vector3());
  const cutoffX = bounds.min.x + size.x * 0.34;
  const cutoffY = bounds.min.y + size.y * 0.49;
  const position = source.getAttribute("position");
  const sourceIndex = source.index;
  const bodyIndices: number[] = [];
  const baseIndices: number[] = [];
  const count = sourceIndex ? sourceIndex.count : position.count;
  for (let offset = 0; offset < count; offset += 3) {
    const a = sourceIndex ? sourceIndex.getX(offset) : offset;
    const b = sourceIndex ? sourceIndex.getX(offset + 1) : offset + 1;
    const c = sourceIndex ? sourceIndex.getX(offset + 2) : offset + 2;
    const x = (position.getX(a) + position.getX(b) + position.getX(c)) / 3;
    const y = (position.getY(a) + position.getY(b) + position.getY(c)) / 3;
    const target = x > cutoffX && y > cutoffY ? bodyIndices : baseIndices;
    target.push(a, b, c);
  }
  return { bounds, body: subsetGeometry(source, bodyIndices), base: subsetGeometry(source, baseIndices) };
}
