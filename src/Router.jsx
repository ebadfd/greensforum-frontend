import {
  BrowserRouter,
  Routes,
  Route,
  useRoutes,
  Navigate,
} from "react-router-dom";

import HomePage from "./pages/index";
import Login from "./pages/login";
import Post from "./pages/post";

import { GetLoggedInUser } from "./services/user.logged";
import { isValidToken } from "./authtoken";
import React, { useEffect, useState } from "react";

function Router() {
  let routes = useRoutes([
    {
      path: "/",
      element: (
        <RequireAuth>
          <HomePage />
        </RequireAuth>
      ),
      children: [
        {
          path: "post",
          element: <Post />,
        },
      ],
    },
    { path: "login", element: <Login /> },
  ]);

  return routes;
}

function RequireAuth({ children }) {
  const [user, setUser] = useState(null);
  const [waiting, setWaiting] = useState(true);

  let valid_token = isValidToken();

  if (!valid_token) {
    return <h1> please login </h1>;
  }

  const getUser = async () => {
    let u = await GetLoggedInUser();
    setUser(u);
    setWaiting(false);
  };

  useEffect(() => {
    getUser();
  }, []);

  console.log(user);

  if (!waiting) {
    if (!user) {
      return <h1> invalid token </h1>;
    }
  }

  return children;
}

export default Router;
