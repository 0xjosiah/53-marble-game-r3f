import { Float, MeshWobbleMaterial, Text } from '@react-three/drei'
import * as THREE from 'three'

/** 
 * this is the initial start block of the game
 * @param position = vec3
*/
const boxGeometry = new THREE.BoxGeometry(1, 1, 1)
const floor1Mat = new THREE.MeshStandardMaterial({ color: 'limegreen' })

export default function StartBlock({ position = [ 0, 0, 0 ], geometry = boxGeometry, material = floor1Mat }) {
    return (
        <group position={ position }>
            {/* Game title */}
            <Float
                floatIntensity={ .5 }
                rotationIntensity={ .5 }
            >
                <Text
                    scale={ .5 }
                    position={[ 0.95, 0.85, -0.75 ]}
                    font='./bebas-neue-v9-latin-regular.woff'
                    maxWidth={ .25 }
                    lineHeight={ .85 }
                    textAlign='right'
                    rotation-y={ -.25 }
                >
                    Marble Combine
                    <MeshWobbleMaterial
                        toneMapped={ false }
                    />
                </Text>
            </Float>

            {/* floor */}
            <mesh
                geometry={ geometry }
                material={ material }
                position={[ 0, -0.1, 0 ]}
                scale={[ 4, 0.2, 4 ]}
                receiveShadow
            />
            
        </group>
    )
}