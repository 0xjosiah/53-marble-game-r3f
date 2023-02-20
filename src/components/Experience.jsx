// import { OrbitControls } from '@react-three/drei'
import { Debug, Physics } from '@react-three/rapier'
import useGame from '../stores/useGame.js'
import { Level } from './Level.jsx'
import Lights from './Lights.jsx'
import Player from './Player.jsx'

export default function Experience()
{
    // if any of the below state values change, the full comp will rerender - best to select only the data you need
    const blocksCount = useGame((state) => state.blocksCount)
    const blocksSeed = useGame((state) => state.blocksSeed)
    
    return <>

        {/* <OrbitControls makeDefault /> */}

        <color args={[ '#bdedfc' ]} attach='background' />

        <Physics>
            {/* <Debug /> */}
            <Lights />
            <Level count={ blocksCount }/>
            <Player />
        </Physics>

    </>
}