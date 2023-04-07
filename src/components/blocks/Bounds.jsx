import { CuboidCollider, RigidBody } from "@react-three/rapier";
import { boxGeometry } from "../../meshSources/geometries";
import { wallMaterial } from "../../meshSources/materials";

export default function Bounds({ length = 1 }) {
    return (
        <>
            <RigidBody
                type='fixed'
                restitution={ 0.2 }
                friction={ 0 }
            >
                {/* right wall */}
                <mesh
                    geometry={ boxGeometry }
                    material={ wallMaterial }
                    scale={[ .3, 2, length * 4 ]}
                    position={[ 2.15, 0.8, -(length * 2) + 2 ]}
                    castShadow
                />

                {/* left wall */}
                <mesh
                    geometry={ boxGeometry }
                    material={ wallMaterial }
                    scale={[ .3, 2, length * 4 ]}
                    position={[ -2.15, 0.8, -(length * 2) + 2 ]}
                    // no castshadow due to sun pos
                    receiveShadow
                />

                {/* back wall */}
                <mesh
                    geometry={ boxGeometry }
                    material={ wallMaterial }
                    scale={[ 4.6, 2, .3 ]}
                    position={[ 0, 0.8, -(length * 4) + 1.85 ]}
                    // no castshadow due to sun pos
                    receiveShadow
                />

                {/* floor */}
                <CuboidCollider
                    args={[ 2, .1, 2 * length ]}
                    position={[ 0, -0.1, -(length * 2) + 2 ]}
                    restitution={ 0.2 }
                    friction={ 1 } // don't want infinite rotation, movement on floor
                />
            </RigidBody>
        </>
    )
}