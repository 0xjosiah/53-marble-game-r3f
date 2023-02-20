import { useKeyboardControls } from "@react-three/drei"
import { addEffect, useFrame } from "@react-three/fiber"
import { useEffect, useRef } from "react"
import { EllipseCurve } from "three"
import useGame from "../stores/useGame"

export default function Interface() {
    const forward = useKeyboardControls((state) => state.forward)
    const reverse = useKeyboardControls((state) => state.reverse)
    const starboard = useKeyboardControls((state) => state.starboard)
    const port = useKeyboardControls((state) => state.port)
    const jump = useKeyboardControls((state) => state.jump)

    const restart = useGame(state => state.restart)
    // this returns a string denoting the phase of the game - ready, playing, or ended
    const phase = useGame(state => state.phase)
    const startTime = useGame(state => state.startTime)
    const endTime = useGame(state => state.endTime)

    const time = useRef()
    useEffect(() => {
        // can't use useFrame outside of canvas but r3f has addEffect
        const unsubscribeEffect = addEffect(() => {
            const state = useGame.getState()

            let elapsedTime = 0
            if(state.phase === 'playing') {
                elapsedTime = Date.now() - state.startTime
            }
            if(state.phase === 'ended') {
                elapsedTime = state.endTime - state.startTime
            }

            elapsedTime /= 1000
            elapsedTime = elapsedTime.toFixed(2)
            
            // guard clause to prevent bug if addEffect runs prior to ref being ready (rare but can happen)
            if(time.current) {
                time.current.textContent = elapsedTime
            }
        })

        return () => unsubscribeEffect()
    }, [])

    return (
        <div className="interface">
            {/* Time */}
            { phase !== 'ready' &&
                <div ref={ time } className="time">0.00</div>
            }

            {/* Restart */}
            { phase === 'ended' &&
                <div className="restart" onClick={ restart }>Restart</div>
            }

            {/* Controls */}
            <div className="controls">
                <div className="raw">
                    <div className={ `key ${forward ? 'active' : ''}` }></div>
                </div>
                <div className="raw">
                    <div className={ `key ${port ? 'active' : ''}` }></div>
                    <div className={ `key ${reverse ? 'active' : ''}` }></div>
                    <div className={ `key ${starboard ? 'active' : ''}` }></div>
                </div>
                <div className="raw">
                    <div className={`key large ${jump ? 'active' : ''}` }></div>
                </div>
            </div>
        </div>
    )
}