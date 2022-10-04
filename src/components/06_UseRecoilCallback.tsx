import { useEffect, useRef } from "react";
import {
  atom,
  useRecoilCallback,
  useRecoilState,
  useRecoilValue,
} from "recoil";

const countState = atom({
  key: "count",
  default: 0,
});

const CountManager = () => {
  const [count, setCount] = useRecoilState(countState);
  const interval = useRef<NodeJS.Timer | undefined>();

  useEffect(() => {
    if (!interval.current) {
      interval.current = setInterval(() => setCount((c) => c + 1), 1000);
    }
  }, [setCount]);

  return (
    <>The count is {count}</>
  )
}

const UseRecoilValue = () => {
  const count = useRecoilValue(countState);
  const renders = useRef(0);

  renders.current = renders.current + 1;

  console.log(`useRecoilValue renders: ${renders.current}`);

  return (
    <button
      onClick={() =>
        alert(
          `The count is ${count} and the component's render count is ${renders.current}`
        )
      }
    >
      Announce the count with useRecoilValue
    </button>
  );
};

const UseRecoilCallback = () => {
  const getCount = useRecoilCallback(
    ({ snapshot }) =>
      () => {
        // Learn more about loadables in 08_Loadable
        const count = snapshot.getLoadable(countState);
        return count.getValue()
      },
    []
  );
  const renders = useRef(0);

  renders.current = renders.current + 1;

  console.log(`useRecoilCallback renders: ${renders.current}`);

  return (
    <button onClick={() => {
      const count = getCount()
      alert(
        `The count is ${count} and the component's render count is ${renders.current}`
      );
    }}>
      Announce the count with useRecoilCallback
    </button>
  );
};

const UseCallback = () => {
  return (
    <>
      <CountManager />
      <hr />
      <UseRecoilValue />
      <UseRecoilCallback />
    </>
  );
};

export default UseCallback;
