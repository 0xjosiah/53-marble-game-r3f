import { Sphere } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { MeshCollider, RigidBody, useSphericalJoint } from '@react-three/rapier'
import { useRef, useState } from 'react'
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
                material={ floor2Mat }
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
                    material={ obstacleMat }
                    scale={[ 3.5, .3, .3 ]}
                    castShadow
                    receiveShadow
                />
            </RigidBody>
        </group>
    )
}

/**
 * Trap block with limbo style obstacle
 * @param position = vec3
 */
function LimboTrapBlock({ position = [ 0, 0, 0 ] }) {
    const obstacle = useRef(null)

    // creates constant random value for each instance of this component
    const [ timeOffset ] = useState(() => (Math.random() * Math.PI * 2))

    // this creates rotation for the rigid body of spinner
    useFrame((state) => {
        const time = state.clock.getElapsedTime() + timeOffset

        // ensures limbo trap stays consistent with component position
        const x = position[0]
        const y = position[1] + (Math.sin(time) + 1.15)
        const z = position[2]

        obstacle.current.setNextKinematicTranslation({ x, y, z })
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
                    material={ obstacleMat }
                    scale={[ 3.5, .3, .3 ]}
                    castShadow
                    receiveShadow
                />
            </RigidBody>
        </group>
    )
}

/**
 * Trap block with sliding door style obstacle
 * @param position = vec3
 */
function SlidingDoorTrapBlock({ position = [ 0, 0, 0 ] }) {
    const obstacle = useRef(null)

    // creates constant random value for each instance of this component
    const [ timeOffset ] = useState(() => (Math.random() * Math.PI * 2))

    // this creates rotation for the rigid body of spinner
    useFrame((state) => {
        const time = state.clock.getElapsedTime() + timeOffset

        // ensures limbo trap stays consistent with component position
        const x = position[0] + (Math.sin(time))
        const y = position[1] + .75
        const z = position[2]

        obstacle.current.setNextKinematicTranslation({ x, y, z })
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
                    material={ obstacleMat }
                    scale={[ 1.5, 1.5, .3 ]}
                    castShadow
                    receiveShadow
                />
            </RigidBody>
        </group>
    )
}

/**
 * Trap block with axe style obstacle
 * @param position = vec3
 */
function AxeTrapBlock({ position = [ 0, 0, 0 ] }) {
    const obstacle = useRef(null)

    // creates constant random value for each instance of this component
    const [ timeOffset ] = useState(() => (Math.random() * Math.PI * 2))

    // this creates rotation for the rigid body of spinner
    // useFrame((state) => {
    //     const time = state.clock.getElapsedTime() + timeOffset

    //     // ensures limbo trap stays consistent with component position
    //     const x = position[0] + (Math.sin(time))
    //     const y = position[1] + .75
    //     const z = position[2]

    //     obstacle.current.setNextKinematicTranslation({ x, y, z })
    // })

    const anchor = useRef(null);
    const box = useRef(null);

    useSphericalJoint(anchor, box, [
        [0, 0, 0],
        [0, 2, 0]
    ])

    return (
        <group>
            {/* floor */}
            <mesh
                geometry={ boxGeometry }
                material={ floor2Mat }
                position={[ 0, -0.1, 0 ]}
                scale={[ 4, 0.2, 4]}
                receiveShadow
            />
            
            {/**
            * We can use an empty RigidBody is created to act
            * as a non-moving anchor
            */}
            <RigidBody ref={anchor} />
            <RigidBody ref={box} position={[0, -2, 0]}>
                <mesh
                    geometry={ boxGeometry }
                    material={ obstacleMat }
                    scale={[ .2, 3, .2 ]}
                />
                <mesh
                    geometry={ boxGeometry }
                    material={ obstacleMat }
                    scale={[ 1, .5, .2 ]}
                />
                {/* <MeshCollider type="ball">
                    <Sphere args={[0.5]} position={[0, -2, 0]}>
                        <meshPhysicalMaterial />
                    </Sphere>
                </MeshCollider> */}
            </RigidBody>
        </group>
    )
}

export default function Level(props) {
    return (
        <>
            <StartBlock position={[ 0, 0, 16 ]} />
            <SpinnerTrapBlock position={[ 0, 0, 12 ]} />
            <LimboTrapBlock position={[ 0, 0, 8 ]} />
            <SlidingDoorTrapBlock position={[ 0, 0, 4 ]} />
            <AxeTrapBlock position={[ 0, 0, 0 ]} />
        </>
    )
}