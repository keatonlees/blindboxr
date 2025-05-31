/* eslint-disable @next/next/no-img-element */
"use client";

import BlindBox from "@/components/BlindBox";
import { Loader } from "@react-three/drei";
import { useState } from "react";

export default function App() {
  const [blindbox, setBlindbox] = useState("");

  const blindboxes = ["Chiikawa", "Labubu", "Smiski"];

  const chiikawa_prizes = {
    "chiikawa/hachiware.png": 1,
    "chiikawa/chiikawa.png": 2,
    "chiikawa/usagi.png": 3,
    "chiikawa/momonga.png": 4,
    "chiikawa/rakko.png": 5,
    "chiikawa/kurimanju.png": 5,
    "chiikawa/shisa.png": 5,
    "chiikawa/furuhonya.png": 5,
  };

  const labubu_prizes = {
    "labubu/chestnut_cocoa.png": 1,
    "labubu/green_grape.png": 4,
    "labubu/lychee_berry.png": 4,
    "labubu/sea_salt_coconut.png": 4,
    "labubu/seasame_bean.png": 4,
    "labubu/soymilk.png": 4,
    "labubu/toffee.png": 4,
  };

  const smiski_prizes = {
    "smiski/momkid.png": 1,
    "smiski/paint.png": 1,
    "smiski/pearl.png": 1,
    "smiski/sleep.png": 1,
    "smiski/spilt.png": 1,
    "smiski/sunmoon.png": 1,
  };

  if (blindbox === "chiikawa") {
    return (
      <>
        <Loader />
        <BlindBox prizes={chiikawa_prizes} setBlindbox={setBlindbox} />
      </>
    );
  } else if (blindbox === "labubu") {
    return (
      <>
        <Loader />
        <BlindBox prizes={labubu_prizes} setBlindbox={setBlindbox} />
      </>
    );
  } else if (blindbox === "smiski") {
    return (
      <>
        <Loader />
        <BlindBox prizes={smiski_prizes} setBlindbox={setBlindbox} />
      </>
    );
  }

  return (
    <div className="h-screen flex flex-col justify-center items-center gap-8">
      <h1 className="text-2xl font-bold">Choose a BlindBox</h1>

      <div className="flex gap-4">
        {blindboxes.map((name, i) => (
          <div
            key={i}
            onClick={() => setBlindbox(name.toLowerCase())}
            className="bg-neutral-100 shadow-xl p-4 rounded-xl flex flex-col items-center cursor-pointer"
          >
            <img
              src={`/images/${name.toLowerCase()}.png`}
              alt="logo"
              className="w-32"
            />
            <h1 className="font-bold">{name}</h1>
          </div>
        ))}
      </div>
    </div>
  );
}
