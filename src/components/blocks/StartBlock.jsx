import { Float, MeshWobbleMaterial, Text } from '@react-three/drei'
import { startEndFloorMaterial } from '../../meshSources/materials'
import { boxGeometry } from '../../meshSources/geometries'

/** 
 * this is the initial start block of the game
 * @param position = vec3
*/

export default function StartBlock({ position = [ 0, 0, 0 ] }) {
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
                geometry={ boxGeometry }
                material={ startEndFloorMaterial }
                position={[ 0, -0.1, 0 ]}
                scale={[ 4, 0.2, 4 ]}
                receiveShadow
            />
            
        </group>
    )
}