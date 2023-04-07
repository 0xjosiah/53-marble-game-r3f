import { useMemo } from 'react'
import StartBlock from './blocks/StartBlock'
import SpinnerTrapBlock from './blocks/SpinnerTrapBlock'
import LimboTrapBlock from './blocks/LimboTrapBlock'
import SlidingDoorTrapBlock from './blocks/SlidingDoorTrapBlock'
import AxeTrapBlock from './blocks/AxeTrapBlock'
import EndBlock from './blocks/EndBlock'
import Bounds from './blocks/Bounds'

function Level({
    count = 5, // this decides the number of trap blocks
    types = [ SpinnerTrapBlock, LimboTrapBlock, SlidingDoorTrapBlock, AxeTrapBlock ], // trap block types available for use
    seed = 0
}) {
    
    const blocks = useMemo(() => {
        const blocks = []

        for(let i = 0; i < count; i++) {
            const type = types[ Math.floor(Math.random() * types.length) ]
            blocks.push(type)
        }

        return blocks
    }, [ count, types, seed ])
    
    return (
        <>
            <StartBlock position={[ 0, 0, 0 ]} />

            {/* times 4 due to block size being 4x4 */}
            { blocks.map((Block, index) => <Block key={ index } position={[ 0, 0, -(index + 1) * 4 ]} />) }

            <EndBlock position={[ 0, 0, -(count + 1) * 4 ]} />
            <Bounds length={ count + 2 } />
        </>
    )
}

export { Level }