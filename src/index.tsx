import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import ThrowPromise from "./components/01_ThrowPromise";
import AsyncFetching from "./components/02_AsyncFetching";
import Atoms from "./components/03_Atoms";
import AtomsLocalStorage from "./components/09_AtomsLocalStorage";
import DataFlow from "./components/05_DataFlow";
import DataValidationRefine from "./components/10_DataValidationRefine";
import DataValidationZod from "./components/11_DataValidationZod";
import Debugging from "./components/12_Debugging";
import ErrorHandling from "./components/13_ErrorHandling";
import UseCallback from "./components/06_UseRecoilCallback";
import { RecoilRoot } from "recoil";
import Selectors from "./components/04_Selectors";
import Transitions from "./components/15_Transitions";
import RefetchingData from "./components/14_RefetchingData";
import Family from "./components/07_Family";
import Loadable from "./components/08_Loadable";

const LINKS = [
  {
    label: "Throwing promises",
    path: "/throw-promise",
    element: <ThrowPromise />,
  },
  {
    label: "Async fetching",
    path: "/async-fetching",
    element: <AsyncFetching />,
  },
  { label: "Atoms", path: "/atoms", element: <Atoms /> },
  { label: "Selectors", path: "/selectors", element: <Selectors /> },
  {
    label: "Atom/selector data flow",
    path: "/data-flow",
    element: <DataFlow />,
  },
  {
    label: "useRecoilCallback",
    path: "/use-callback",
    element: <UseCallback />,
  },
  {
    label: "Families",
    path: "/families",
    element: <Family />,
  },
  {
    label: "Loadables",
    path: "/loadables",
    element: <Loadable />,
  },
  {
    label: "Atom effects and local storage",
    path: "/atoms-local-storage",
    element: <AtomsLocalStorage />,
  },
  {
    label: "Data validation with Refine",
    path: "/data-validation-refine",
    element: <DataValidationRefine />,
  },
  {
    label: "Data validation with Zod",
    path: "/data-validation-zod",
    element: <DataValidationZod />,
  },
  { label: "Debugging", path: "/debugging", element: <Debugging /> },
  {
    label: "Error handling",
    path: "/error-handling",
    element: <ErrorHandling />,
  },
  {
    label: "Refetching data",
    path: "/refetching-data",
    element: <RefetchingData />,
  },
  {
    label: "Transitions",
    path: "/transitions",
    element: <Transitions />,
  },
];

const List = () => (
  <ol>
    {LINKS.map(({ path, label }) => (
      <li key={path}>
        <Link to={path}>{label}</Link>
      </li>
    ))}
  </ol>
);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <Router>
        <Routes>
          <Route path="/" element={<List />} />
          {LINKS.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Routes>
      </Router>
    </RecoilRoot>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
