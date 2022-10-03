import { Suspense } from "react";
import { selector, useRecoilValue } from "recoil";

const starshipsState = selector({
  key: "starshipsAsyncFetching",
  get: async () => {
    const res = await fetch("https://swapi.dev/api/starships");
    const data = await res.json();
    return data.results;
  },
});

const MyComponent = () => {
  const starships = useRecoilValue(starshipsState);

  return (
    <ul>
      {/* @ts-ignore */}
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
