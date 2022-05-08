import React, { useEffect, useState } from "react";
import { useRoutes } from "react-router-dom";

import HomePage from "./pages/index";
import Login from "./pages/login";
import Post from "./pages/post";
import Register from "./pages/register";
import SearchPage from "./pages/search";
import CreatePost from "./pages/create";
import Collectives from "./pages/collecives";
import CollectiveInformation from "./pages/collective.info";
import QuestionsTagged from "./pages/questiontags";

import { GetLoggedInUser } from "./services/user.logged";
import { isValidToken } from "./authtoken";

function Router() {
  let routes = useRoutes([
    {
      path: "/",
      element: (
        <RequireAuth>
          <HomePage />
        </RequireAuth>
      ),
    },
    { path: "login", element: <Login /> },
    { path: "register", element: <Register /> },
    { path: "search", element: <SearchPage /> },

    { path: "create", element: <CreatePost /> },
    { path: "collecives", element: <Collectives /> },
    { path: "question/:slug", element: <Post /> },
    { path: "tag/:slug", element: <QuestionsTagged /> },
    { path: "collective/:slug", element: <CollectiveInformation /> },
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

  if (!waiting) {
    if (!user) {
      return <h1> invalid token </h1>;
    }
  }

  return children;
}

export default Router;
