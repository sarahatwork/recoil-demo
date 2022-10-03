import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import ThrowPromise from "./components/ThrowPromise";
import AsyncFetching from "./components/AsyncFetching";
import AsyncFetchingLoadable from "./components/AsyncFetchingLoadable";
import Atoms from "./components/Atoms";
import AtomsLocalStorage from "./components/AtomsLocalStorage";
import DataFlow from "./components/DataFlow";
import DataValidationRefine from "./components/DataValidationRefine";
import DataValidationZod from "./components/DataValidationZod";
import Debugging from "./components/Debugging";
import ErrorHandling from "./components/ErrorHandling";
import UseCallback from "./components/UseRecoilCallback";
import { RecoilRoot } from "recoil";

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
  {
    label: "Async fetching with loadables",
    path: "/async-fetching-loadable",
    element: <AsyncFetchingLoadable />,
  },
  { label: "Atoms", path: "/atoms", element: <Atoms /> },
  {
    label: "Atom effects and local storage",
    path: "/atoms-local-storage",
    element: <AtomsLocalStorage />,
  },
  {
    label: "Atom/selector data flow",
    path: "/data-flow",
    element: <DataFlow />,
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
    label: "useRecoilCallback",
    path: "/use-callback",
    element: <UseCallback />,
  },
];

const List = () => (
  <ul>
    {LINKS.map(({ path, label }) => (
      <li key={path}>
        <Link to={path}>{label}</Link>
      </li>
    ))}
  </ul>
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
