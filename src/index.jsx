import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Experience from './components/Experience.jsx'
import { KeyboardControls } from '@react-three/drei'

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
    <KeyboardControls
        map={[
            { name: 'forward', keys: [ 'ArrowUp', 'KeyW' ]},
            { name: 'reverse', keys: [ 'ArrowDown', 'KeyS' ]},
            { name: 'starboard', keys: [ 'ArrowRight', 'KeyD' ]},
            { name: 'port', keys: [ 'ArrowLeft', 'KeyA' ]}
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
        </Canvas>
    </KeyboardControls>
)