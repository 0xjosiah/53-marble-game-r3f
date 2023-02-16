import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Experience from './components/Experience.jsx'
import { KeyboardControls } from '@react-three/drei'
import Interface from './components/Interface'

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
    <KeyboardControls
        // uses 'KeyW' etc. to account for non-qwerty keyboards, maps a key not its symbol
        map={[
            { name: 'forward', keys: [ 'ArrowUp', 'KeyW' ]},
            { name: 'reverse', keys: [ 'ArrowDown', 'KeyS' ]},
            { name: 'starboard', keys: [ 'ArrowRight', 'KeyD' ]},
            { name: 'port', keys: [ 'ArrowLeft', 'KeyA' ]},
            { name: 'jump', keys: [ 'Space' ]}
        ]}
    >
        <Canvas
            shadows
            camera={ {
                fov: 45,
                near: 0.1,
                far: 200,
                position: [ 2.5, 4, 6 ]
            } }
        >
            <Experience />
            <Interface />
        </Canvas>
    </KeyboardControls>
)