import { useFrame } from "@react-three/fiber"
import { RigidBody } from "@react-three/rapier"
import { useRef, useState } from "react"
import { boxGeometry } from "../../meshSources/geometries"
import { obstacleFloorMaterial, obstacleMaterial } from "../../meshSources/materials"

export default function SlidingDoorTrapBlock({ position = [ 0, 0, 0 ] }) {
    const obstacle = useRef(null)

    // creates constant random value for each instance of this component
    const [ timeOffset ] = useState(() => (Math.random() * Math.PI * 2))

    // this creates rotation for the rigid body of spinner
    useFrame((state) => {
        const time = state.clock.getElapsedTime() + timeOffset

        // ensures limbo trap stays consistent with component position
        const x = position[0] + (Math.sin(time) * 1.25)
        const y = position[1] + .75
        const z = position[2]

        obstacle.current.setNextKinematicTranslation({ x, y, z })
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

            {/* obstacle */}
            <RigidBody
                ref={ obstacle }
                type='kinematicPosition'
                position={[ 0, .3, 0 ]}
                restitution={ 0.2 }
                friction={ 0 }
            >
                <mesh
                    geometry={ boxGeometry }
                    material={ obstacleMaterial }
                    scale={[ 1.5, 1.5, .3 ]}
                    castShadow
                    receiveShadow
                />
            </RigidBody>
        </group>
    )
}