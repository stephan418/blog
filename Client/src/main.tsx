import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import "./index.css";
import {
  createBrowserRouter,
  Link,
  RouterProvider,
  Routes,
  BrowserRouter as Router,
} from "react-router-dom";
import RouterRoot from "./app/RouterRoot";
import Navbar from "./components/navbar/Navbar";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <Router>
      <Navbar />
      <div className="pageRoot">
        <RouterRoot />
      </div>
    </Router>
  </Provider>,
);
