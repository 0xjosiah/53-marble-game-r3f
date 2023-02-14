import { useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { useRef } from "react";

export default function Player({  }) {
    const [ subscribeKeys, getKeys ] = useKeyboardControls()
    const player = useRef(null)
    
    useFrame((state, delta) => {
        const { forward, reverse, starboard, port } = getKeys()

        const impulse = { x: 0, y: 0, z: 0 }
        const torque = { x: 0, y: 0, z: 0 }

        const impulseStrength = delta * 1
        const torqueStrength = delta * 1

        if(forward) impulse.z -= impulseStrength
        if(reverse) impulse.z += impulseStrength
        if(starboard) impulse.x += impulseStrength
        if(port) impulse.x -= impulseStrength

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
        >
            <mesh castShadow>
                <icosahedronGeometry args={[ 0.3, 1 ]} />
                <meshStandardMaterial flatShading color={'mediumpurple'} />
            </mesh>
        </RigidBody>
    )
}