import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home/Home";
import Login from "../auth/Login/Login";
import Register from "../auth/Register/Register";
import DashboardLayout from "../layout/DashboardLayout/DashboardLayout";
import AddProducts from "../pages/Dashboard/AddProducts/AddProducts";
import Profile from "../pages/Dashboard/Profile/Profile";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "add-products", element: <AddProducts /> },
    ],
  },
  { path: "auth/login", element: <Login /> },
  { path: "auth/register", element: <Register /> },
  {
    path: "dashboard", // ✅ main dashboard route
    element: <DashboardLayout />,
    children: [
      { index: true, element: <h3>Dashboard Overview</h3> },
      { path: "overview", element: <h3>Dashboard layout</h3> },
      { path: "add-products", element: <AddProducts /> },
      { path: "settings", element: <Profile /> },
    ],
  },
]);
