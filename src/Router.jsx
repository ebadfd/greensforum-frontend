import React, { useEffect, useState } from "react";
import { useRoutes } from "react-router-dom";

import HomePage from "./pages/index";
import Login from "./pages/login";
import Post from "./pages/post";
import Register from "./pages/register";

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
import HomePagev2 from "./pages/v2/index";
import CreatePost from "./pages/v2/create";
import SearchPage from "./pages/search";
import Collectives from "./pages/collecives";

import { GetLoggedInUser } from "./services/user.logged";
import { isValidToken } from "./authtoken";
import { Skeleton } from "@mantine/core";
import CreateCollective from "./pages/v2/create.collective";
import ApplyForMod from "./pages/user.mod.apply"
import { LandingPage } from "./pages/landing"

function Router() {
  let routes = useRoutes([
    {
      path: "/old/",
      element: (
        <RequireAuth>
          <HomePage />
        </RequireAuth>
      ),
    },
    { path: "login", element: <Login /> },
    { path: "about", element: <LandingPage /> },
    { path: "register", element: <Register /> },
    {
      path: "search",
      element: <ApplicationLayout mainContent={<SearchPage />} />,
    },
    {
      path: "/",
      element: (
        <RequireAuth>
          <ApplicationLayout mainContent={<HomePagev2 />} />{" "}
        </RequireAuth>
      ),
    },

    {
      path: "collecives",
      element: <ApplicationLayout mainContent={<Collectives />} />,
    },

    {
      path: "create/collecives",
      element: <ApplicationLayout mainContent={<CreateCollective />} />,
    },

    {
      path: "collective/:slug",
      element: <ApplicationLayout mainContent={<CollectiveInformation />} />,
    },
    {
      path: "collective/:slug/unaproved",
      element: <ApplicationLayout mainContent={<UnaprovedPosts />} />,
    },
    {
      path: "collective/:slug/members",
      element: <ApplicationLayout mainContent={<MembersofCollective />} />,
    },
    {
      path: "collective/:slug/article/write",
      element: <CreateArticleOnCollective />,
    },

    {
      path: "post/:slug",
      element: <ApplicationLayout mainContent={<CollectivePost />} />,
    },
    { path: "create", element: <CreatePost /> },

    {
      path: "questions",
      element: (
        <ApplicationLayout
          mainContent={<DisplayAllQuestions />}
          displaySideBar={true}
          SideBarDisplayComponent={<NothingHereYet />}
        />
      ),
    },
    {
      path: "question/:slug",
      element: (
        <ApplicationLayout
          mainContent={<Post />}
          displaySideBar={true}
          SideBarDisplayComponent={<p> sudgest posts </p>}
        />
      ),
    },
    { path: "tag/:slug", element: <QuestionsTagged /> },

    {
      path: "profile",
      element: <ApplicationLayout mainContent={<UserProfile />} />,
    },
    {
      path: "user/unaproved",
      element: <ApplicationLayout mainContent={<UserUnaprovedPosts />} />,
    },

    {
      path: "settings",
      element: <ApplicationLayout mainContent={<Settings />} />,
    },
      {
          path:"user/mod/apply",
          element:<ApplicationLayout mainContent={<ApplyForMod />} />,

      },
  ]);

  return routes;
}

function RequireAuth({ children }) {
  const [user, setUser] = useState(null);
  const [waiting, setWaiting] = useState(true);

  let valid_token = isValidToken();

  if (!valid_token) {
    return (
            <LandingPage />
    );
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
        return(
            <LandingPage />
        )
    }
  }

  return children;
}

function NothingHereYet() {
  return <Skeleton height={400} />;
}

export default Router;
