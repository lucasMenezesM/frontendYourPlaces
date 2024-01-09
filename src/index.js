import React, { useContext } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Users from "./user/pages/Users";
import NewPlace from "./places/pages/NewPlace";
import Error from "./error/pages/Error";

import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import UserPlaces from "./places/pages/UserPlaces";
import UpdatePlace from "./places/pages/UpdatePlace";
import Auth from "./user/pages/Auth";
import { AuthContext } from "./shared/context/auth-context";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "/home",
        element: <Users />,
      },
      {
        path: "/",
        element: <Navigate to={"/home"} />,
      },
      {
        path: "places/new",
        element: <NewPlace />,
      },
      {
        path: "/auth",
        element: <Auth />,
      },
      {
        path: "/:userId/places",
        element: <UserPlaces />,
      },
      {
        path: "/places/:placeId",
        element: <UpdatePlace />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
