import { Image } from "@react-three/drei";
import gsap from 'gsap';
import React, { useEffect, useRef, useState } from "react";

export default function Prize(props) {
  const { isOpen, isAnimating, setIsAnimating, prizes } = props;
  const [imageURL, setImageURL] = useState("chiikawa/chiikawa.png")

  const prize = useRef(null);

  useEffect(() => {
    if (isAnimating) {
      const weights = Object.values(prizes)
      const total = weights.reduce((acc, cur) => {
        return acc + cur;
      }, 0);

      let index = Math.random() * total;
      let res = null;
      for (const prop in prizes) {
        const val = prizes[prop];
        if (index < val) {
          res = prop;
          break; 
        } else {
          index -= val;
        }
      }

      setImageURL(res);
    }
  }, [isAnimating])

  useEffect(() => {
    const object = prize.current;
    if (!object) return;

    if (isOpen) {
      gsap.timeline()
      .to(object.position, {
        y: 2,
        z: 1,
        duration: 0.5,
        ease: "power2.out"
      })
      .to(object.position, {
        y: 1,
        z: 2,
        duration: 1,
        ease: "bounce.out"
      })
      .call(() => setIsAnimating(false))

      gsap.timeline()
      .to(object.scale, {
        x: 1.5,
        y: 1.5,
        duration: 1,
        ease: "power2.out"
      })
    } else {
      gsap.timeline()
      .to(object.scale, {
        x: 0.01,
        y: 0.01,
        duration: 0.5,
        ease: "power2.out"
      })
      .to(object.position, {
        x: 0,
        y: 0,
        z: 0,
        duration: 0.5,
        ease: "power2.out",
      })
    }
  }, [isOpen]);

  return (
    // eslint-disable-next-line jsx-a11y/alt-text
    <Image
      ref={prize}
      url={`/images/${imageURL}`}
      position={[0, 0, 0]}
      scale={0.01}
      transparent
      opacity={1}
    />
  );
}
