import { useFrame } from '@react-three/fiber'
import { RigidBody } from '@react-three/rapier'
import { useRef } from 'react'
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

/**
 * Trap block with spinner
 * @param position = vec3
 */
function SpinnerTrapBlock({ position = [ 0, 0, 0 ] }) {
    const spinner = useRef(null)
    useFrame((state, delta) => {
        const time = state.clock.elapsedTime
        spinner.current.rotation.y += delta * 1.5
    })

    return (
        <group position={ position }>
            
            {/* floor */}
            <mesh
                geometry={ boxGeometry }
                material={ floor2Mat }
                position={[ 0, -0.1, 0 ]}
                scale={[ 4, 0.2, 4]}
                receiveShadow
            />

            {/* spinner */}
            <RigidBody type='kinematicPosition'>
                <mesh
                    ref={ spinner }
                    geometry={ boxGeometry }
                    material={ obstacleMat }
                    position={[ 0, .1, 0 ]}
                    scale={[ 3.5, .3, .3 ]}
                    castShadow
                    receiveShadow
                />
            </RigidBody>
        </group>
    )
}

export default function Level(props) {
    return (
        <>
            <StartBlock position={[ 0, 0, 4 ]} />
            <SpinnerTrapBlock position={[ 0, 0, 0 ]} />
        </>
    )
}