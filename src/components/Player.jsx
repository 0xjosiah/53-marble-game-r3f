import { RigidBody } from "@react-three/rapier";

export default function Player({  }) {
    return (
        <>
            <RigidBody
                colliders='ball'
            >
                <mesh castShadow>
                    <icosahedronGeometry args={[ 0.3, 1 ]} />
                    <meshStandardMaterial flatShading color={'mediumpurple'} />
                </mesh>
            </RigidBody>
        </>
    )
}