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
import DisplayAllQuestions from "./pages/allquestions";
import UserProfile from "./pages/userProfile";
import CollectivePost from "./pages/collective.post";
import MembersofCollective from "./pages/collective.members";
import CreateArticleOnCollective from "./pages/collective.article.write";
import UnaprovedPosts from "./pages/collective.unaproved.post";
import UserUnaprovedPosts from "./pages/user.unaproved.post";
import Settings from "./pages/settings";

// new components for v2
import ApplicationLayout from "./layouts/index";
import HomePagev2 from "./pages/v2/index"

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
    { path: "beta/home", element: <ApplicationLayout mainContent={<HomePagev2/>} /> },

    { path: "create", element: <CreatePost /> },
    { path: "collecives", element: <Collectives /> },
    { path: "questions", element: <DisplayAllQuestions /> },
    { path: "question/:slug", element: <Post /> },
    { path: "post/:slug", element: <CollectivePost /> },

    { path: "tag/:slug", element: <QuestionsTagged /> },
    { path: "profile", element: <UserProfile /> },
    { path: "user/unaproved", element: <UserUnaprovedPosts /> },

    { path: "settings", element: <Settings /> },

    { path: "collective/:slug", element: <CollectiveInformation /> },
    { path: "collective/:slug/unaproved", element: <UnaprovedPosts /> },

    {
      path: "collective/:slug/article/write",
      element: <CreateArticleOnCollective />,
    },
    { path: "collective/:slug/members", element: <MembersofCollective /> },
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
