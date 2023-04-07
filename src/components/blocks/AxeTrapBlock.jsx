import { useFrame } from "@react-three/fiber"
import { useRef, useState } from "react"
import { boxGeometry } from "../../meshSources/geometries"
import { obstacleFloorMaterial, obstacleMaterial } from "../../meshSources/materials"
import { RigidBody } from "@react-three/rapier"
import * as THREE from "three"

export default function AxeTrapBlock({ position = [ 0, 0, 0 ] }) {
    const anchor = useRef(null)
    const box = useRef(null)

    // creates constant random value for each instance of this component
    const [ timeOffset ] = useState(() => (Math.random() * Math.PI * 2))

    // this creates rotation for the rigid body of spinner
    useFrame((state) => {
        const time = state.clock.getElapsedTime() + timeOffset

        box.current.setNextKinematicRotation(
            new THREE.Quaternion(0, 0, (Math.sin(time)))
          )
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
            
            {/* Axe hinge */}
            <RigidBody ref={anchor} type='kinematicPosition' position={[0, 3, 0]} />

            {/* Axe body */}
            <RigidBody
                ref={box}
                type='kinematicPosition'
                position={[0, 1.5, 0]}
            >
                <mesh
                    geometry={ boxGeometry }
                    material={ obstacleMaterial }
                    scale={[ .2, 2.5, .2 ]}
                />
                <mesh
                    geometry={ boxGeometry }
                    material={ obstacleMaterial }
                    scale={[ 1.5, .5, .2 ]}
                    position={[ 0, -1, 0 ]}
                />
            </RigidBody>
        </group>
    )
}