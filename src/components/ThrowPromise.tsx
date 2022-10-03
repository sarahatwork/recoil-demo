import { Suspense } from "react";

let didThrow = false;

const MyComponent = () => {
  if (!didThrow) {
    didThrow = true;
    const threeSecondPromise = new Promise<void>((resolve) => {
      setTimeout(resolve, 3000);
    });
    throw threeSecondPromise;
  }

  return <>Not loading!</>;
};

const ThrowPromise = () => {
  return (
    <Suspense fallback={"Loading..."}>
      <MyComponent />
    </Suspense>
  );
};

export default ThrowPromise;
