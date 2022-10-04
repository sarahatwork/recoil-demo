import { Suspense } from "react";
import {
  atom,
  selector,
  useRecoilRefresher_UNSTABLE,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";

type Subscription = (time: string) => void;

// An API for getting the current time
class MyApi {
  subscribers: Subscription[] = [];

  constructor() {
    // Emit an update to subscribers every second
    setInterval(() => {
      const newDate = this.getTimeString();
      this.subscribers.forEach((fn) => fn(newDate));
    }, 1000);
  }

  private getTimeString() {
    return new Date().toLocaleTimeString();
  }

  // Get the current time (with a three-second delay)
  async get(): Promise<string> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(this.getTimeString()), 3000);
    });
  }

  // Subscribe for time updates
  subscribe(callback: Subscription) {
    this.subscribers.push(callback);
  }
}

const api = new MyApi();

/* Technique 1 - Selector with dependency

   Example use case: Refetch listening history when the logged in user changes */

const requestCountState = atom({
  key: "requestCount",
  default: 0,
});

const selectorWithDependencyState = selector({
  key: "selectorWithDependency",
  get: async ({ get }) => {
    // Even though the selector does not use the value of `requestCountState`,
    // putting `get(requestCountState)` here makes this selector dependent on the value of `requestCountState`
    // When `requestCountState` changes, we will refetch api.get()
    get(requestCountState);
    return api.get();
  },
});

const SelectorWithDependecy = () => {
  const value = useRecoilValue(selectorWithDependencyState);
  const setRequestCount = useSetRecoilState(requestCountState);

  return (
    <>
      <div>{value}</div>
      <button onClick={() => setRequestCount((s) => s + 1)}>Refresh</button>
    </>
  );
};

const selectorThatGetsRefreshedState = selector({
  key: "selectorThatGetsRefreshed",
  get: async () => {
    return api.get();
  },
});

/* Technique 2 - Selector that gets refreshed

   Selectors are supposed to be pure functions that always return the same value, 
   so the concept of refreshing data is a bit at odds with that concept. Use with caution.
   
   Example use case: Retry after an error. */

const SelectorThatGetsRefreshed = () => {
  const value = useRecoilValue(selectorThatGetsRefreshedState);
  const refresh = useRecoilRefresher_UNSTABLE(selectorThatGetsRefreshedState);

  return (
    <>
      <div>{value}</div>
      <button onClick={refresh}>Refresh</button>
    </>
  );
};

/* Technique 3 - Atom effect that subscribes to the API

   If you have an API that publishes updates, atom effects are a natural fit. */

const atomWithSubscriptionEffectState = atom<string | undefined>({
  key: "atomWithSubscriptionEffect",
  effects: [
    ({ setSelf }) => {
      api.subscribe((time) => setSelf(time));
    },
  ],
});

const AtomWithSubscriptionEffect = () => {
  const value = useRecoilValue(atomWithSubscriptionEffectState);

  return <div>{value}</div>;
};

const RefetchingData = () => {
  return (
    <>
      <Suspense fallback={"Loading..."}>
        <SelectorWithDependecy />
      </Suspense>
      <hr />
      <Suspense fallback={"Loading..."}>
        <SelectorThatGetsRefreshed />
      </Suspense>
      <hr />
      <Suspense fallback={"Loading..."}>
        <AtomWithSubscriptionEffect />
      </Suspense>
    </>
  );
};

export default RefetchingData;
