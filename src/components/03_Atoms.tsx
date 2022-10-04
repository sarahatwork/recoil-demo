import { useState } from "react";
import { atom, useRecoilState } from "recoil";

const magentaState = atom({
  key: "magenta_example03",
  default: 0,
});

const Atoms = () => {
  // Same API!
  const [numCyanClicks, setNumCyanClicks] = useState(0);
  const [numMagentaClicks, setNumMagentaClicks] = useRecoilState(magentaState);

  return (
    <>
      <div>Clicks: {numCyanClicks}</div>
      <button
        style={{ backgroundColor: "cyan" }}
        onClick={() => setNumCyanClicks((n) => n + 1)}
      >
        React useState
      </button>
      <hr />
      <div>Clicks: {numMagentaClicks}</div>
      <button
        style={{ backgroundColor: "magenta" }}
        onClick={() => setNumMagentaClicks((n) => n + 1)}
      >
        Recoil Atom
      </button>
    </>
  );
};

export default Atoms;
