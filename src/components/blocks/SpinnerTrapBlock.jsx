import * as THREE from "three"
import { RigidBody } from "@react-three/rapier"
import { boxGeometry } from "../../meshSources/geometries"
import { obstacleFloorMaterial, obstacleMaterial } from "../../meshSources/materials"
import { useFrame } from "@react-three/fiber"
import { useRef, useState } from "react"

export default function SpinnerTrapBlock({ position = [ 0, 0, 0 ] }) {
    const spinner = useRef(null)

    // creates constant random value for each instance of this component
    const [ speed ] = useState(() => (Math.random() + 0.2) * (Math.random() < .5 ? 1 : -1))

    // this creates rotation for the rigid body of spinner
    useFrame((state) => {
        const time = state.clock.getElapsedTime()
        const eulerRotation = new THREE.Euler(0, time * speed, 0)
        const quaternionRotation = new THREE.Quaternion()
        quaternionRotation.setFromEuler(eulerRotation)
        // this method only takes quaternion, thus the above conversion
        spinner.current.setNextKinematicRotation(quaternionRotation)
    })

    return (
        <group position={ position }>
            
            {/* floor */}
            <mesh
                geometry={ boxGeometry }
                material={ obstacleFloorMaterial }
                position={[ 0, -0.1, 0 ]}
                scale={[ 4, 0.2, 4]}
                receiveShadow
            />

            {/* spinner */}
            <RigidBody
                ref={ spinner }
                type='kinematicPosition'
                position={[ 0, .3, 0 ]}
                restitution={ 0.2 }
                friction={ 0 }
            >
                <mesh
                    geometry={ boxGeometry }
                    material={ obstacleMaterial }
                    scale={[ 3.5, .3, .3 ]}
                    castShadow
                    receiveShadow
                />
            </RigidBody>
        </group>
    )
}