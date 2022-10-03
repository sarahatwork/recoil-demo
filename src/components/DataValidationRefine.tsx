import { Suspense } from "react";
import { selector, useRecoilValue } from "recoil";
import refine from "@recoiljs/refine";

const Starship = refine.object({
  name: refine.string(),
});

const StartshipResults = refine.object({
  results: refine.array(Starship),
});

const starshipsState = selector({
  key: "starshipsDataValidationRefine",
  get: async () => {
    const res = await fetch("https://swapi.dev/api/starships");
    const data = await res.json();
    return refine.assertion(StartshipResults)(data).results;
  },
});

const MyComponent = () => {
  const starships = useRecoilValue(starshipsState);

  return (
    <ul>
      {starships.map((starship) => (
        <li key={starship.name}>{starship.name}</li>
      ))}
    </ul>
  );
};

const DataValidationRefine = () => {
  return (
    <Suspense fallback={"Loading..."}>
      <MyComponent />
    </Suspense>
  );
};

export default DataValidationRefine;
