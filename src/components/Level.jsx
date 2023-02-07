import * as THREE from 'three'

// this is required to normalize colors if created outside r3f
THREE.ColorManagement.legacyMode = false

// general geometry for all boxes in scene
const boxGeometry = new THREE.BoxGeometry(1, 1, 1)

// Materials for scene
const floor1Mat = new THREE.MeshStandardMaterial({ color: 'limegreen' })
const floor2Mat = new THREE.MeshStandardMaterial({ color: 'greenyellow' })
const obstacleMat = new THREE.MeshStandardMaterial({ color: 'orangered' })
const wallMat = new THREE.MeshStandardMaterial({ color: 'slategrey' })

/** 
 * this is the initial start block of the game
 * @param position = vec3
*/
function StartBlock({ position = [ 0, 0, 0 ] }) {
    return (
        <group position={ position }>

            {/* floor */}
            <mesh
                geometry={ boxGeometry }
                material={ floor1Mat }
                position={[ 0, -0.1, 0 ]}
                scale={[ 4, 0.2, 4 ]}
                receiveShadow
            />
            
        </group>
    )
}

export default function Level(props) {
    return (
        <>
            <StartBlock />
        </>
    )
}