import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home/Home";
import Login from "../auth/Login/Login";
import Register from "../auth/Register/Register";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [{ index: true, element: <Home /> }],
  },
  { path: "auth/login", element: <Login /> },
  { path: "auth/register", element: <Register /> },
]);
