import { Suspense } from "react";
import { selector, useRecoilValue } from "recoil";
import { ErrorBoundary } from "react-error-boundary";

const testState = selector({
  key: "test",
  get: async () => {
    throw new Error("An error inside of a selector");
  },
});

const FetchingComponent = () => {
  useRecoilValue(testState);

  return null;
};

const ErrorComponent = () => {
  throw new Error("An error inside of a component");
};

const FallbackComponent = ({ error }: { error: Error }) => {
  return (
    <div>
      <b>Error message:</b> {error.message}
    </div>
  );
};

// Selectors don't need any special error handling -
// they can be handled with error boundaries just like components

const ErrorHandling = () => {
  return (
    <>
      <ErrorBoundary FallbackComponent={FallbackComponent}>
        <Suspense fallback={"Loading..."}>
          <FetchingComponent />
        </Suspense>
      </ErrorBoundary>
      <ErrorBoundary FallbackComponent={FallbackComponent}>
        <ErrorComponent />
      </ErrorBoundary>
    </>
  );
};

export default ErrorHandling;
