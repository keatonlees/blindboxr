import { useAnimations, useGLTF, useTexture } from '@react-three/drei';
import gsap from 'gsap';
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Chest(props) {
  const { cameraRef, isOpen, setIsOpen, isAnimating, setIsAnimating, isResetting, setIsResetting } = props;

  const group = useRef(null)
  const boxLid = useRef(null)

  const pitch1 = useRef(new Audio("/audio/magical-pitch-1.mp3"))
  const pitch2 = useRef(new Audio("/audio/magical-pitch-2.mp3"))
  const pitchOpen = useRef(new Audio("/audio/magical-open.mp3"))
  const chestOpen = useRef(new Audio("/audio/chest-open.mp3"))
  
  const { nodes, materials, animations } = useGLTF('/models/scene.gltf')
  const { actions } = useAnimations(animations, group)

  const woodTexture = useTexture('/models/textures/ChestWood2_specularGlossiness.jpeg')
  const metalTexture = useTexture('/models/textures/ChestMetal2_specularGlossiness.jpeg')

  useEffect(() => {
    if (materials.ChestWood1 instanceof THREE.MeshStandardMaterial) {
      materials.ChestWood1.map = woodTexture
      materials.ChestWood1.needsUpdate = true
    }
    if (materials.ChestWood2 instanceof THREE.MeshStandardMaterial) {
      materials.ChestWood2.map = woodTexture
      materials.ChestWood2.needsUpdate = true
    }
    if (materials.ChestMetal1 instanceof THREE.MeshStandardMaterial) {
      materials.ChestMetal1.map = metalTexture
      materials.ChestMetal1.needsUpdate = true
    }
    if (materials.ChestMetal2 instanceof THREE.MeshStandardMaterial) {
      materials.ChestMetal2.map = metalTexture
      materials.ChestMetal2.needsUpdate = true
    }
  }, [materials, woodTexture, metalTexture])

  useEffect(() => {
    const lid = boxLid.current;
    if (!lid) return;

    if (isResetting) {
      setIsOpen(false);

      chestOpen.current.volume = 0.3;

      gsap.timeline()
      .to(lid.rotation, {
        x: 0,
        duration: 1,
        ease: "bounce.out",
        delay: 0.5
      })
      .call(() => chestOpen.current.play(), [], 0.7)
      .call(() => setIsResetting(false), [], 1.5)
    }

  }, [isResetting])

  const handleHover = (state) => {
    if (isOpen || isAnimating || isResetting) return;

    const chest = group.current;
    if (!chest) return;

    if (state === "enter") {
      gsap.to(chest.scale, {
        x: 1.05,
        y: 1.05,
        z: 1.05,
        duration: 0.3,
        ease: "power2.out"
      })
    } else {
      gsap.to(chest.scale, {
        x: 1,
        y: 1,
        z: 1,
        duration: 0.3,
        ease: "power2.out"
      })
    }
  }

  const handleOpen = () => {
    if (isOpen || isAnimating || isResetting) return;

    // const camera = cameraRef.current;
    const chest = group.current;
    const lid = boxLid.current;
    if (!chest || !lid) return;

    setIsAnimating(true);
    pitch1.current.volume = 0.1;
    pitch2.current.volume = 0.1;
    pitchOpen.current.volume = 0.8;
    chestOpen.current.volume = 0.3;

    gsap.to(chest.scale, {
      x: 1,
      y: 1,
      z: 1,
      duration: 0,
      ease: "power2.out"
    })

    gsap.timeline()
    .to(chest.position, {
      y: -0.5,
      duration: 0.3,
      ease: "power2.out"
    })
    .call(() => pitch1.current.play(), [], 0.1)
    .to(chest.position, {
      y: -1,
      duration: 0.5,
      ease: "bounce.out"
    })
    .to(chest.position, {
      y: 0,
      duration: 0.3,
      ease: "power2.out",
      delay: 0.3
    })
    .call(() => pitch2.current.play(), [], 1.2)
    .to(chest.position, {
      y: -1,
      duration: 0.5,
      ease: "bounce.out"
    })
    .call(() => chestOpen.current.play(), [], 2.4)
    .call(() => pitchOpen.current.play(), [], 2.4)

    gsap.timeline()
    .to(chest.rotation, {
      y: 0.1,
      duration: 0.1,
      ease: "power2.out"
    })
    .to(chest.rotation, {
      y: -0.1,
      duration: 0.1,
      ease: "power2.out"
    })
    .to(chest.rotation, {
      y: 0,
      duration: 0.1,
      ease: "power2.out"
    })
    .to(chest.rotation, {
      y: 0.2,
      duration: 0.1,
      ease: "power2.out",
      delay: 0.8
    })
    .to(chest.rotation, {
      y: -0.2,
      duration: 0.1,
      ease: "power2.out"
    })
    .to(chest.rotation, {
      y: 0,
      duration: 0.1,
      ease: "power2.out"
    })
    .to(lid.rotation, {
      x: -2.5,
      duration: 0.5,
      ease: "bounce.out",
      delay: 1
    })
    .call(() => setIsOpen(true))
  }

  return (
    <group onPointerEnter={() => handleHover("enter")} onPointerLeave={() => handleHover("leave")} onClick={handleOpen} ref={group} {...props} dispose={null} position={[0, -1, 0]}>
      <group name="model" rotation={[-Math.PI / 2, 0, 0]} scale={200}>
        <group name="box" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <group name="box_lid" ref={boxLid} position={[0, 0.86, -0.498]} rotation={[0, 0, 0]} >
            <mesh 
              name="polySurface19_ChestWood1_0" 
              geometry={nodes.polySurface19_ChestWood1_0.geometry} 
              material={materials.ChestWood1}
              castShadow
              receiveShadow
            />
            <mesh 
              name="polySurface19_ChestMetal2_0" 
              geometry={nodes.polySurface19_ChestMetal2_0.geometry} 
              material={materials.ChestMetal2}
              castShadow
              receiveShadow
            />
            <mesh 
              name="polySurface19_ChestWood2_0" 
              geometry={nodes.polySurface19_ChestWood2_0.geometry} 
              material={materials.ChestWood2}
              castShadow
              receiveShadow
            />
            <mesh 
              name="polySurface19_ChestMetal1_0" 
              geometry={nodes.polySurface19_ChestMetal1_0.geometry} 
              material={materials.ChestMetal1}
              castShadow
              receiveShadow
            />
          </group>
          <group name="box_container" position={[15.495, 14.554, 0]}>
            <group name="polySurface18" position={[-15.495, -14.011, 0]}>
              <mesh 
                name="polySurface18_ChestWood2_0" 
                geometry={nodes.polySurface18_ChestWood2_0.geometry} 
                material={materials.ChestWood2}
                castShadow
                receiveShadow
              />
              <mesh 
                name="polySurface18_ChestWood1_0" 
                geometry={nodes.polySurface18_ChestWood1_0.geometry} 
                material={materials.ChestWood1}
                castShadow
                receiveShadow
              />
              <mesh 
                name="polySurface18_ChestMetal2_0" 
                geometry={nodes.polySurface18_ChestMetal2_0.geometry} 
                material={materials.ChestMetal2}
                castShadow
                receiveShadow
              />
              <mesh 
                name="polySurface18_ChestMetal1_0" 
                geometry={nodes.polySurface18_ChestMetal1_0.geometry} 
                material={materials.ChestMetal1}
                castShadow
                receiveShadow
              />
            </group>
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/models/scene.gltf')
