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
import WishlistPage from "../pages/WishList/WishList";
import AddToCart from "../pages/AddToCart/AddToCart";
import UserOrders from "../pages/Dashboard/Users/UserOrders/UserOrders";
import DashboardOverview from "../pages/Dashboard/DashboardOverView/DashboardOverview";
import ErrorPage from "../components/ErrorPage/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "add-products", element: <AddProducts /> },
      { path: "products", element: <AllProducts /> },
      { path: "products/:productId", element: <ProductDetails /> },
      { path: "wish-list", element: <WishlistPage /> },
      { path: "add-to-cart", element: <AddToCart /> },
    ],
  },
  { path: "auth/login", element: <Login /> },
  { path: "auth/register", element: <Register /> },
  {
    path: "dashboard",
    element: <DashboardLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <DashboardOverview /> },
      { path: "add-products", element: <AddProducts /> },
      { path: "user-order", element: <UserOrders /> },
      { path: "settings", element: <Profile /> },
      { path: "customers", element: <Customers /> },
      { path: "my-products", element: <MyProduct /> },
    ],
  },
]);
