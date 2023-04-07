import { MeshWobbleMaterial, Text, useGLTF } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { RigidBody } from "@react-three/rapier"
import { useRef } from "react"
import { boxGeometry } from "../../meshSources/geometries"
import { startEndFloorMaterial } from "../../meshSources/materials"

export default function EndBlock({ position = [ 0, 0, 0 ] }) {
    const { scene } = useGLTF('./hamburger.glb')
    scene.children.forEach(mesh => mesh.castShadow = true)

    const hamburger = useRef(null)

    useFrame((state, delta) => {
        // const time = state.clock.getElapsedTime()
        // hamburger.current.rotation.y += delta
    })

    return (
        <group position={ position }>
            {/* Finish title */}
            <Text
                scale={ .5 }
                position={[ 0, 1.75, 1.5 ]}
                font='./bebas-neue-v9-latin-regular.woff'
                maxWidth={ .25 }
                lineHeight={ .85 }
                textAlign='right'
                rotation-y={ -.25 }
            >
                Finish
                <MeshWobbleMaterial
                    speed={ .75 }
                    factor={ .75 }
                    toneMapped={ false }
                    color='red'
                />
            </Text>

            {/* reward object */}
            <RigidBody
                type='fixed'
                colliders='hull'
                position={[ 0, 0.25, 0 ]}
                restitution={ 0.2 }
                friction={ 0 }
            >
                <primitive
                    ref={ hamburger }
                    object={ scene }
                    position={[ 0, 0, 0 ]}
                    scale={ .2 }
                />
            </RigidBody>

            {/* floor */}
            <mesh
                geometry={ boxGeometry }
                material={ startEndFloorMaterial }
                scale={[ 4, 0.2, 4 ]}
                position={[ 0, 0, 0 ]}
                receiveShadow
            />
            
        </group>
    )
}