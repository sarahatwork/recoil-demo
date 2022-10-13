import { Suspense, useMemo } from "react";
import { selector, useRecoilSnapshot, useRecoilValue } from "recoil";

const setTimeoutPromise = (timeout: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });

const oneSecondState = selector({
  key: "debugging__oneSecond",
  get: async () => {
    await setTimeoutPromise(1_000);
  },
});

const fiveSecondState = selector({
  key: "debugging__fiveSecond",
  get: async () => {
    await setTimeoutPromise(5_000);
  },
});

const tenSecondState = selector({
  key: "debugging__tenSecond",
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
  // A snapshot of the entire Recoil state
  const snapshot = useRecoilSnapshot();
  const loading = useMemo(() => {
    const out: string[] = [];

    // Interate over each snapshot node and collect the nodes that are currently loading in this example
    for (const node of snapshot.getNodes_UNSTABLE()) {
      const info = snapshot.getInfo_UNSTABLE(node);
      if (info.loadable?.state !== "hasValue" && node.key.startsWith('debugging__')) {
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
