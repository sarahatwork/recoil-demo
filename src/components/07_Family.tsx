import { Suspense, useState } from "react";
import { selectorFamily, useRecoilValue } from "recoil";

interface Starship {
  name: string;
  starship_class: string;
  hyperdrive_rating: string;
  crew: number;
}

// Like selectors, but accepting serializable params
// Read more at https://recoiljs.org/docs/api-reference/utils/selectorFamily
// There's also an atom version: https://recoiljs.org/docs/api-reference/utils/atomFamily
const starshipsState = selectorFamily({
  key: "starships",
  get: (id: number) => async () => {
    const res = await fetch(`https://swapi.dev/api/starships/${id}`);
    const data = await res.json();
    return data as Starship;
  },
});

const MyComponent = ({ id }: { id: number }) => {
  const starship = useRecoilValue(starshipsState(id));

  return (
    <>
      <div>
        <b>Class:</b> {starship.starship_class}
      </div>
      <div>
        <b>Hyperdrive Rating:</b> {starship.hyperdrive_rating}
      </div>
      <div>
        <b>Crew:</b> {starship.crew}
      </div>
    </>
  );
};

const Family = () => {
  const [id, setId] = useState(9); // the Death Star 💀
  return (
    <>
      <div>
        <b>Choose Your Ship:</b>{" "}
        {/* Recoil caches the result of each family member 
            so if you reselect an option you have previously selected,
            there will be no loading state */}
        <select value={id} onChange={(e) => setId(Number(e.target.value))}>
          <option value="9">Death Star</option>
          <option value="10">Millenium Falcon</option>
          <option value="17">Rebel Transport</option>
        </select>
      </div>
      <Suspense fallback={"Loading..."}>
        <MyComponent id={id} />
      </Suspense>
    </>
  );
};

export default Family;
