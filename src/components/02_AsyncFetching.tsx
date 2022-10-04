import { Suspense } from "react";
import { selector, useRecoilValue } from "recoil";

interface Starship {
  name: string;
}

const starshipsState = selector({
  key: "starships_example02",
  get: async () => {
    const res = await fetch("https://swapi.dev/api/starships");
    const data = await res.json();
    return data.results as Starship[];
  },
});

const MyComponent = () => {
  // We don't have to check that this value exists -
  // the fact we are inside MyComponent means the fetch is complete!
  const starships = useRecoilValue(starshipsState);

  return (
    <ul>
      {starships.map((starship) => (
        <li key={starship.name}>{starship.name}</li>
      ))}
    </ul>
  );
};

const AsyncFetching = () => {
  return (
    <Suspense fallback={"Loading..."}>
      <MyComponent />
    </Suspense>
  );
};

export default AsyncFetching;
