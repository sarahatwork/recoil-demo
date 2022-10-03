import { useState } from "react";
import { atom, useRecoilState } from "recoil";

const magentaState = atom({
  key: "magentaAtoms",
  default: 0,
});

const Atoms = () => {
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

export default Atoms;
