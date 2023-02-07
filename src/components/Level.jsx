function StartBlock({ position = [ 0, 0, 0 ] }) {
    return (
        <>
            <mesh position={ position } receiveShadow>
                <boxGeometry args={[ 4, 0.2, 4 ]} />
                <meshStandardMaterial color="limegreen" />
            </mesh>
        </>
    )
}

export default function Level(props) {
    return (
        <>
            <StartBlock />
        </>
    )
}