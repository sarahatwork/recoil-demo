import { Suspense } from "react";
import { selector, useRecoilValue } from "recoil";
import { z } from "zod";

const Starship = z.object({
  name: z.string(),
});

const StartshipResults = z.object({
  results: z.array(Starship),
});

const starshipsState = selector({
  key: "starshipDataValidationZod",
  get: async () => {
    const res = await fetch("https://swapi.dev/api/starships");
    const data = await res.json();
    // No more typecasting - Zod will throw an error if the data is not of the expected structure
    return StartshipResults.parse(data).results;
  },
});

// 💪 Learn more about Zod at https://www.totaltypescript.com/tutorials/zod

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

const DataValidationZod = () => {
  return (
    <Suspense fallback={"Loading..."}>
      <MyComponent />
    </Suspense>
  );
};

export default DataValidationZod;
