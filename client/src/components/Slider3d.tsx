import React, { Suspense, useState, useEffect } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls, Html, Loader } from '@react-three/drei';
import model1 from "../assets/miel-blanc.glb";
import model2 from "../assets/miel-jujubier-simple.glb";
import model3 from "../assets/Miel-de-niglz.glb";
import model4 from "../assets/miel-euro.glb";

const models: string[] = [
    model1,
    model2,
    model3,
    model4
];

interface ModelProps {
    url: string;
}

function Model({ url }: ModelProps): JSX.Element {
    const gltf = useLoader(GLTFLoader, url);
    return <primitive object={gltf.scene} />;
}

export default function Slider3D(): JSX.Element {
    const [current, setCurrent] = useState<number>(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((current) => (current + 1) % models.length);
        }, 3000); 

        return () => clearInterval(timer); 
    }, []);

    return (
        <div style={{ width: '100%', height: '100vh', maxWidth: '100%', overflow: 'hidden', position: 'relative' }}>
            <Canvas camera={{ position: [-5, 0, 5], fov: 45 }} style={{ height: '100%', width: '100%' }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />
                <directionalLight position={[-10, -10, -10]} />
                <OrbitControls enableZoom={false} enablePan={false} />
                <Suspense fallback={<Html><Loader /></Html>}>
                    <Model url={models[current]} />
                </Suspense>
            </Canvas>

            {/* Navigation Buttons */}
            <div style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', width: '100%', display: 'flex', justifyContent: 'space-between', pointerEvents: 'none' }}>
                <button
                    style={{ pointerEvents: 'auto', background: 'rgba(0, 0, 0, 0.5)', color: 'white', border: 'none', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}
                    onClick={() => setCurrent((current - 1 + models.length) % models.length)}
                >
                    &lt;
                </button>
                <button
                    style={{ pointerEvents: 'auto', background: 'rgba(0, 0, 0, 0.5)', color: 'white', border: 'none', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}
                    onClick={() => setCurrent((current + 1) % models.length)}
                >
                    &gt;
                </button>
            </div>
        </div>
    );
}
