import { selector, useRecoilValueLoadable } from "recoil";

const starshipsState = selector({
  key: "starshipsAsyncFetchingLoadable",
  get: async () => {
    const res = await fetch("https://swapi.dev/api/starships");
    const data = await res.json();
    return data.results;
  },
});

const AsyncFetchingLoadable = () => {
  const starships = useRecoilValueLoadable(starshipsState);

  if (starships.state === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <ul>
      {/* @ts-ignore */}
      {starships.contents.map((starship) => (
        <li key={starship.name}>{starship.name}</li>
      ))}
    </ul>
  );
};

export default AsyncFetchingLoadable;
