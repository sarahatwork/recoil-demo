import { useState } from "react";
import { atom, useRecoilState } from "recoil";

const magentaState = atom({
  key: "magentaAtomsLocalStorage",
  default: 0,
  effects: [
    ({ onSet, setSelf }) => {
      // Set the initial value from localStorage
      const localStorageCount = localStorage.getItem("magentaCount");
      setSelf(localStorageCount ? JSON.parse(localStorageCount) : 0);

      // When the value changes, update localStorage
      onSet((newVal) =>
        localStorage.setItem("magentaCount", JSON.stringify(newVal))
      );
    },
  ],
});

// 💁🏻‍♀️ See the Recoil Sync package for more advanced state synchronization
// to URLs or localStorage: https://recoiljs.org/docs/recoil-sync/introduction

const AtomsLocalStorage = () => {
  const [numCyanClicks, setNumCyanClicks] = useState(0);
  const [numMagentaClicks, setNumMagentaClicks] = useRecoilState(magentaState);

  return (
    <>
      <div>Clicks: {numCyanClicks}</div>
      <button
        style={{ backgroundColor: "cyan" }}
        onClick={() => setNumCyanClicks((n) => n + 1)}
      >
        Click
      </button>
      <hr />
      <div>Clicks: {numMagentaClicks}</div>
      <button
        style={{ backgroundColor: "magenta" }}
        onClick={() => setNumMagentaClicks((n) => n + 1)}
      >
        Click
      </button>
    </>
  );
};

export default AtomsLocalStorage;
