import { Suspense, useTransition } from "react";
import {
  atom,
  selector,
  useRecoilState_TRANSITION_SUPPORT_UNSTABLE,
  useRecoilValue_TRANSITION_SUPPORT_UNSTABLE,
} from "recoil";

interface Starship {
  name: string;
  starship_class: string;
  hyperdrive_rating: string;
  crew: number;
}

const currentStarshipState = atom({
  key: "currentStarship",
  default: 9, // the Death Star 💀
});

const starshipDataState = selector({
  key: "starshipData",
  get: async ({ get }) => {
    const id = get(currentStarshipState);
    const res = await fetch(`https://swapi.dev/api/starships/${id}`);
    const data = await res.json();
    return data as Starship;
  },
});

const MyComponent = () => {
  const starship =
    useRecoilValue_TRANSITION_SUPPORT_UNSTABLE(starshipDataState);

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

// Experimental support for React Transitions!

// Allows the user to see the old data while new data is being fetched,
// rather than bubbling up to the Suspense fallback.

// Read more at https://recoiljs.org/docs/guides/transitions

const Transitions = () => {
  const [currentStarship, setCurrentStarship] =
    useRecoilState_TRANSITION_SUPPORT_UNSTABLE(currentStarshipState);
  const [isPending, startTransition] = useTransition();

  return (
    <>
      <div>
        <b>Choose Your Ship:</b>{" "}
        <select
          value={currentStarship}
          onChange={(e) =>
            startTransition(() => setCurrentStarship(Number(e.target.value)))
          }
        >
          <option value="9">Death Star</option>
          <option value="10">Millenium Falcon</option>
          <option value="17">Rebel Transport</option>
        </select>
      </div>
      <Suspense fallback={"You will never see me after the first load!"}>
        <MyComponent />
      </Suspense>
      {isPending && (
        <div>Loading new data - but old data is still visible above</div>
      )}
    </>
  );
};

export default Transitions;
