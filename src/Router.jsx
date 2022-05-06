import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/index";
import Login from "./pages/login";
import Post from "./pages/post";

import { HeaderMiddle } from "./components/Header/Header";
import attributes from "./components/Header/attributes.json";

function Router() {
  return (
    <>
      <HeaderMiddle links={attributes} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/post" element={<Post />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default Router;
