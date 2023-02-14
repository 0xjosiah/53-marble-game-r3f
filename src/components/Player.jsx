export default function Player({  }) {
    return (
        <>
            <mesh castShadow>
                <icosahedronGeometry args={[ 0.3, 1 ]} />
                <meshStandardMaterial flatShading color={'mediumpurple'} />
            </mesh>
        </>
    )
}