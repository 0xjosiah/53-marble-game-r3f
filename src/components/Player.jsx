import { useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { useEffect, useRef } from "react";

export default function Player({  }) {
    const [ subscribeKeys, getKeys ] = useKeyboardControls()
    const player = useRef(null)

    useEffect(() => {
        subscribeKeys(
            // selector fn, indicates what you want to listen to
            (state) => state.jump,
            // when above event happens, the below fn fires
            (value) => {
                const impulse = { x: 0, y: 0, z: 0 }

                if(value) impulse.y += .5
                
                player.current.applyImpulse(impulse)
            }
        )
    }, [])
    
    useFrame((state, delta) => {
        const { forward, reverse, starboard, port } = getKeys()

        const impulse = { x: 0, y: 0, z: 0 }
        const torque = { x: 0, y: 0, z: 0 }

        const impulseStrength = delta * 0.6
        const torqueStrength = delta * 0.2

        if(forward) {
            impulse.z -= impulseStrength
            torque.x -= torqueStrength
        }
    
        if(starboard) {
            impulse.x += impulseStrength
            torque.z -= torqueStrength
        }

        if(reverse) {
            impulse.z += impulseStrength
            torque.x += torqueStrength
        }

        if(port) {
            impulse.x -= impulseStrength
            torque.z += torqueStrength
        }

        player.current.applyImpulse(impulse)
        player.current.applyTorqueImpulse(torque)
    })

    return (
        <RigidBody
            ref={ player }
            colliders='ball'
            position={[ 0, 1, 0 ]}
            restitution={ 0.2 }
            friction={ 1 }
            linearDamping={ 0.5 }
            angularDamping={ 0.5 }
        >
            <mesh castShadow>
                <icosahedronGeometry args={[ 0.3, 1 ]} />
                <meshStandardMaterial flatShading color={'mediumpurple'} />
            </mesh>
        </RigidBody>
    )
}