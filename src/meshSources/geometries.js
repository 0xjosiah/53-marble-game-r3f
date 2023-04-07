import * as THREE from "three"

// general geometry for all boxes in scene
const boxGeometry = new THREE.BoxGeometry(1, 1, 1)
const sphereGeometry = new THREE.SphereGeometry(.5, 16, 32)

export { boxGeometry, sphereGeometry }