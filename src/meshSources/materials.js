import * as THREE from "three"

// this is required to normalize colors if created outside r3f
THREE.ColorManagement.legacyMode = false

// Materials for scene
const startEndFloorMaterial = new THREE.MeshStandardMaterial({ color: 'limegreen' })
const obstacleFloorMaterial = new THREE.MeshStandardMaterial({ color: 'greenyellow' })
const obstacleMaterial = new THREE.MeshStandardMaterial({ color: 'orangered' })
const wallMaterial = new THREE.MeshStandardMaterial({ color: 'slategrey' })
// const floor1Mat = new THREE.MeshStandardMaterial({ color: '#111111', metalness: 0, roughness: 0 })
// const floor2Mat = new THREE.MeshStandardMaterial({ color: '#222222', metalness: 0, roughness: 0 })
// const obstacleMat = new THREE.MeshStandardMaterial({ color: '#ff0000', metalness: 0, roughness: 1 })
// const wallMat = new THREE.MeshStandardMaterial({ color: '#887777', metalness: 0, roughness: 0 })

export { startEndFloorMaterial, obstacleMaterial, obstacleFloorMaterial, wallMaterial }