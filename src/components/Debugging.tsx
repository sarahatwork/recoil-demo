import { Suspense, useMemo } from "react";
import { selector, useRecoilSnapshot, useRecoilValue } from "recoil";

const setTimeoutPromise = (timeout: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });

const oneSecondState = selector({
  key: "oneSecond",
  get: async () => {
    await setTimeoutPromise(1_000);
  },
});

const fiveSecondState = selector({
  key: "fiveSecond",
  get: async () => {
    await setTimeoutPromise(5_000);
  },
});

const tenSecondState = selector({
  key: "tenSecond",
  get: async () => {
    await setTimeoutPromise(10_000);
  },
});

const MyComponent = () => {
  useRecoilValue(oneSecondState);
  useRecoilValue(fiveSecondState);
  useRecoilValue(tenSecondState);

  return <>done!</>;
};

const Debugging = () => {
  const snapshot = useRecoilSnapshot();
  const loading = useMemo(() => {
    const out: string[] = [];
    for (const node of snapshot.getNodes_UNSTABLE()) {
      const loadable = snapshot.getLoadable(node);
      if (loadable.state === "loading") {
        out.push(node.key);
      }
    }
    return out;
  }, [snapshot]);

  return (
    <>
      {loading.length > 0 && (
        <>
          <p>The following atoms/selectors are loading:</p>
          <ul>
            {loading.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </>
      )}
      <Suspense fallback={"Loading..."}>
        <MyComponent />
      </Suspense>
    </>
  );
};

export default Debugging;
