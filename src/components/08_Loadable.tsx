import { useState } from "react";
import { selectorFamily, useRecoilValueLoadable } from "recoil";

interface Starship {
  name: string;
  starship_class: string;
}

const starshipsState = selectorFamily({
  key: "starships",
  get: (id: number) => async () => {
    const res = await fetch(`https://swapi.dev/api/starships/${id}`);
    if (res.status === 404) {
      throw new Error("Not found!");
    }

    const data = await res.json();
    return data as Starship;
  },
});

const Loadable = () => {
  const [currentStarship, setCurrentStarship] = useState(9); // the Death Star 💀

  // Use useRecoilValueLoadable to fetch the loadable version of an atom or selector
  // It does not throw a promise (so no React Suspense)
  // Useful for more complex behaviors like paginated lists
  // Read more at https://recoiljs.org/docs/api-reference/core/Loadable
  const starship = useRecoilValueLoadable(starshipsState(currentStarship));

  if (starship.state === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>
        <b>ID:</b>{" "}
        <input
          type="number"
          value={currentStarship}
          onChange={(e) => setCurrentStarship(Number(e.target.value))}
        />
      </div>
      {starship.state === "hasValue" ? (
        <>
          <div>
            <b>Name:</b> {starship.contents.name}
          </div>
          <div>
            <b>Class:</b> {starship.contents.starship_class}
          </div>
        </>
      ) : (
        <div>
          <b>Error:</b> {starship.contents.message}
        </div>
      )}
    </>
  );
};

export default Loadable;
