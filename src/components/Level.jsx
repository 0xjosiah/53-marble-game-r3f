import { Sphere, useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { MeshCollider, RigidBody, useSphericalJoint } from '@react-three/rapier'
import { useRef, useState } from 'react'
import * as THREE from 'three'

// this is required to normalize colors if created outside r3f
THREE.ColorManagement.legacyMode = false

// general geometry for all boxes in scene
const boxGeometry = new THREE.BoxGeometry(1, 1, 1)
const sphereGeometry = new THREE.SphereGeometry(.5, 16, 32)

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
    useFrame((state) => {
        const time = state.clock.getElapsedTime() + timeOffset

        box.current.setNextKinematicRotation(
            new THREE.Quaternion(0, 0, (Math.sin(time)))
          )
    })

    const anchor = useRef(null);
    const box = useRef(null);

    // useSphericalJoint(anchor, box, [
    //     [0, 0, 0],
    //     [0, 1.25, 0]
    // ])

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
            
            <RigidBody ref={anchor} type='kinematicPosition' position={[0, 3, 0]} >
                {/* <mesh
                    geometry={ sphereGeometry }
                    material={ obstacleMat }
                    scale={[ .1, .1, .1 ]}
                /> */}
            </RigidBody>
            <RigidBody
                ref={box}
                type='kinematicPosition'
                position={[0, 1.5, 0]}
            >
                <mesh
                    geometry={ boxGeometry }
                    material={ obstacleMat }
                    scale={[ .2, 2.5, .2 ]}
                />
                <mesh
                    geometry={ boxGeometry }
                    material={ obstacleMat }
                    scale={[ 1.5, .5, .2 ]}
                    position={[ 0, -1, 0 ]}
                />
            </RigidBody>
        </group>
    )
}

/** 
 * this is the initial start block of the game
 * @param position = vec3
*/
function EndBlock({ position = [ 0, 0, 0 ] }) {
    const { scene } = useGLTF('./hamburger.glb')
    scene.children.forEach(mesh => mesh.castShadow = true)
    const hamburger = useRef(null)

    useFrame((state, delta) => {
        // const time = state.clock.getElapsedTime()
        hamburger.current.rotation.y += delta
    })

    return (
        <group position={ position }>
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
                material={ floor1Mat }
                position={[ 0, 0, 0 ]}
                scale={[ 4, 0.2, 4 ]}
                receiveShadow
            />
            
        </group>
    )
}

export default function Level(props) {
    return (
        <>
            <StartBlock position={[ 0, 0, 20 ]} />
            <SpinnerTrapBlock position={[ 0, 0, 16 ]} />
            <LimboTrapBlock position={[ 0, 0, 12 ]} />
            <SlidingDoorTrapBlock position={[ 0, 0, 8 ]} />
            <AxeTrapBlock position={[ 0, 0, 4 ]} />
            <EndBlock position={[ 0, 0, 0 ]} />
        </>
    )
}