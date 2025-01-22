import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import Skeleton from "./components/pages/Skeleton";
import NotFound from "./components/pages/NotFound";
import Profile from "./components/pages/profile";
import Feed from "./components/pages/Feed";
import ToDoList from "./components/pages/ToDoList";
import Leaderboard from "./components/pages/Leaderboard";
import CreateNewChallenge from "./components/pages/CreateNewChallenge";
import SignIn from "./components/pages/SignIn";
import SignUp from "./components/pages/SignUp";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  useNavigate,
} from "react-router-dom";

import { GoogleOAuthProvider } from "@react-oauth/google";

//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID =
  "868412125046-d7vkgkl4dml38m39rqjemrnjbb49dojm.apps.googleusercontent.com";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<NotFound />} element={<App />}>
      <Route path="/" element={<Feed />} />
      <Route path="/profile/:userId" element={<Profile />} />
      <Route path="/todo/" element={<ToDoList />} />
      <Route path="/leaderboard/" element={<Leaderboard />} />
      <Route path="/newchallenge/" element={<CreateNewChallenge />} />
      <Route path="/signin/" element={<SignIn />} />
      <Route path="/signup/" element={<SignUp />} />
    </Route>
  )
);

// renders React Component "Root" into the DOM element with ID "root"
ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    <RouterProvider router={router} />
  </GoogleOAuthProvider>
);
