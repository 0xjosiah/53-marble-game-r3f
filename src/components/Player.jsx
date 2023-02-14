import { useKeyboardControls } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { RigidBody, useRapier } from "@react-three/rapier"
import { useEffect, useRef, useState } from "react"
import * as THREE from 'three'

export default function Player({  }) {
    const player = useRef(null)
    const [ subscribeKeys, getKeys ] = useKeyboardControls()
    const { rapier, world } = useRapier()
    const rapierWorld = world.raw()

    const [ smoothCamPos ] = useState(() => new THREE.Vector3())
    const [ smoothCamTarget ] = useState(() => new THREE.Vector3())

    const jump = () => {
        // gets center of player obj
        const origin = player.current.translation()
        // need to move center down to be on bottom edge of player
        origin.y -= 0.31
        // cast a ray directly down thru floor
        const direction = { x: 0, y: -1, z: 0 }
        // fetches ray method from rapier lib
        const ray = new rapier.Ray(origin, direction)
        // uses cast ray method to report a 'hit', 10 is a max toi figure, true makes rapier consider all bodies as solid
        // this toi test might help for falling logic TODO
        const hit = rapierWorld.castRay(ray, 10, true)

        if(hit.toi < 0.15) player.current.applyImpulse({ x: 0, y: 0.5, z: 0 })
    }

    useEffect(() => {
        const unsubscribeJump = subscribeKeys(
            // selector fn, indicates what you want to listen to
            (state) => state.jump,
            // when above event happens, the below fn fires
            (value) => {
                if(value) jump()
            }
        )

        // subscribeKeys returns a fn to unsub, this is helpful to reduce bugs
        // prevents a double sub if module happens to reload w/o full page reload
        return () => unsubscribeJump()
    }, [])
    
    useFrame((state, delta) => {
        /**
         * Controls
         */
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

        /**
         * Camera
         */
        // retrieves player position
        const playerPos = player.current.translation()

        const camPos = new THREE.Vector3()
        // vec3 from rapier is compatible with vec3 from three.js (most vec3's are universal)
        camPos.copy(playerPos)
        camPos.z += 2.25
        camPos.y += 0.65

        // want target to be slightly ahead of player - to see rest of level
        const camTarget = new THREE.Vector3()
        camTarget.copy(playerPos)
        camTarget.y += 0.25

        // makes the cam movement much smoother
        smoothCamPos.lerp(camPos, 0.1)
        smoothCamTarget.lerp(camTarget, 0.1)

        // retrieves cam from state and copies position from declared cam pos based on player pos
        state.camera.position.copy(smoothCamPos)
        // tells cam to look at declared target
        state.camera.lookAt(smoothCamTarget)
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