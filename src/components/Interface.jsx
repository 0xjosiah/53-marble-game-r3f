import { useKeyboardControls } from "@react-three/drei"
import { useEffect, useRef } from "react"

export default function Interface() {
    const forward = useKeyboardControls((state) => state.forward)
    const reverse = useKeyboardControls((state) => state.reverse)
    const starboard = useKeyboardControls((state) => state.starboard)
    const port = useKeyboardControls((state) => state.port)
    const jump = useKeyboardControls((state) => state.jump)

    return (
        <div className="interface">
            {/* Time */}
            <div className="time">0.00</div>

            {/* Restart */}
            <div className="restart">Restart</div>

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