/* eslint-disable @next/next/no-img-element */
"use client";

import Prize from "@/components/Prize";
import Chest from "@/components/three/Chest";
import Floor from "@/components/three/Floor";
import Lights from "@/components/three/Lights";
// import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import gsap from "gsap";
import React, { Suspense, useEffect, useState } from "react";

interface PropTypes {
  prizes: object;
  setBlindbox: (value: string) => void;
}

export default function BlindBox(props: PropTypes) {
  const { prizes, setBlindbox } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [weightTotal, setWeightTotal] = useState(0);

  useEffect(() => {
    const weights = Object.values(prizes);
    const total = weights.reduce((acc, cur) => {
      return acc + cur;
    }, 0);
    setWeightTotal(total);
  }, [prizes]);

  useEffect(() => {
    if (isOpen) {
      gsap.from("#resetBtn", {
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        delay: 1,
      });
    }
  }, [isOpen]);

  const handleBack = () => {
    setBlindbox("");
  };

  const resetBox = () => {
    if (isAnimating) return;
    setIsResetting(true);
  };

  return (
    <div className="h-screen flex flex-col items-center relative">
      <button
        onClick={handleBack}
        className="absolute left-4 top-4 bg-amber-200 py-2 px-4 rounded-xl z-1 cursor-pointer"
      >
        Back to All BlindBoxes
      </button>

      <Canvas camera={{ position: [0, 1, 5], fov: 80 }} shadows>
        <Lights />
        {/* <OrbitControls /> */}
        <Suspense fallback={null}>
          <Prize
            isOpen={isOpen}
            isAnimating={isAnimating}
            setIsAnimating={setIsAnimating}
            prizes={prizes}
          />
          <Chest
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            isAnimating={isAnimating}
            setIsAnimating={setIsAnimating}
            isResetting={isResetting}
            setIsResetting={setIsResetting}
          />
          <Floor />
        </Suspense>
      </Canvas>
      {isOpen && (
        <button
          id="resetBtn"
          onClick={resetBox}
          className="absolute bg-teal-200 bottom-[35%] w-24 p-2 rounded-xl cursor-pointer"
        >
          Roll again
        </button>
      )}

      <div className="absolute bottom-4 bg-neutral-100 shadow-xl flex gap-2 p-4 rounded-xl">
        {Object.keys(prizes).map((key, i) => (
          <div key={i} className="flex flex-col items-center">
            <img src={`/images/${key}`} alt="test" className="h-16" />
            <h1 className="font-bold">
              {(
                (prizes[key as keyof typeof prizes] / weightTotal) *
                100
              ).toFixed(0)}
              %
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
}
