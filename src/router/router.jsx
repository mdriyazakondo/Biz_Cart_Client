import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home/Home";
import Login from "../auth/Login/Login";
import Register from "../auth/Register/Register";
import DashboardLayout from "../layout/DashboardLayout/DashboardLayout";
import AddProducts from "../pages/Dashboard/AddProducts/AddProducts";
import Profile from "../pages/Dashboard/Profile/Profile";
import Customers from "../pages/Dashboard/Admin/Customers/Customers";
import MyProduct from "../pages/Dashboard/MyProduct/MyProduct";
import ProductDetails from "../pages/ProductDetails/ProductDetails";
import AllProducts from "../pages/AllProducts/AllProducts";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "add-products", element: <AddProducts /> },
      { path: "products", element: <AllProducts /> },
      { path: "products/:productId", element: <ProductDetails /> },
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
      { path: "customers", element: <Customers /> },
      { path: "my-products", element: <MyProduct /> },
    ],
  },
]);
