import { useFrame } from "@react-three/fiber"
import { useRef } from "react"

export default function Lights()
{
    const light = useRef()

    useFrame((state) => {
        const lightPos = light.current.position
        const camPos = state.camera.position
        // much easier to get cam pos than player pos, also if move cam away from player, still want shadows
        lightPos.z = camPos.z + 1
    })
    return <>
        <directionalLight
            ref={ light }
            castShadow
            position={ [ 4, 4, 1 ] }
            intensity={ 1.5 }
            shadow-mapSize={ [ 1024, 1024 ] }
            shadow-camera-near={ 1 }
            shadow-camera-far={ 10 }
            shadow-camera-top={ 10 }
            shadow-camera-right={ 10 }
            shadow-camera-bottom={ - 10 }
            shadow-camera-left={ - 10 }
        />
        <ambientLight intensity={ 0.5 } />
    </>
}