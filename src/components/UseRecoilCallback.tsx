import { useEffect, useRef } from "react";
import {
  atom,
  useRecoilCallback,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";

const countState = atom({
  key: "count",
  default: 0,
});

const UseRecoilValue = () => {
  const count = useRecoilValue(countState);
  const renders = useRef(0);

  renders.current = renders.current + 1;

  console.log(`useRecoilValue renders: ${renders.current}`);

  return (
    <button
      onClick={() =>
        alert(
          `The count is ${count} and the component rerendered ${renders.current} times`
        )
      }
    >
      Get the count with useRecoilValue
    </button>
  );
};

const UseRecoilCallback = () => {
  const getCount = useRecoilCallback(
    ({ snapshot }) =>
      () => {
        const count = snapshot.getLoadable(countState);
        alert(
          `The count is ${count.getValue()} and the component rerendered ${
            renders.current
          } times`
        );
      },
    []
  );
  const renders = useRef(0);

  renders.current = renders.current + 1;

  console.log(`useRecoilCallback renders: ${renders.current}`);

  return (
    <button onClick={() => getCount()}>
      Get the count with useRecoilCallback
    </button>
  );
};

const UseCallback = () => {
  const setCount = useSetRecoilState(countState);
  const interval = useRef<NodeJS.Timer | undefined>();

  useEffect(() => {
    if (!interval.current) {
      interval.current = setInterval(() => setCount((c) => c + 1), 1000);
    }
  }, [setCount]);

  return (
    <>
      <UseRecoilValue />
      <UseRecoilCallback />
    </>
  );
};

export default UseCallback;
