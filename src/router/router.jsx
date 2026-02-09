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
import Admin from "../PraiviteRoute/Admin";
import Users from "../PraiviteRoute/User";
import Seller from "../PraiviteRoute/Seller";
import PrivateRoute from "../PraiviteRoute/PrariviteRoute";
import Laptop from "../pages/Laptop/Laptop";
import SmartPhone from "../pages/SmartPhone/SmartPhone";
import Electronic from "../pages/Electronic/Electronic";
import SmartWatch from "../pages/SmartWatch/SmartWatch";
import NewProducts from "../pages/NewProducts/NewProducts";
import BestProducts from "../pages/BestProducts/BestProducts";
import FlashSale from "../pages/FlashSale/FlashSale";
import MyProductsOrder from "../pages/Dashboard/Sellers/MyProductsOrder/MyProductsOrder";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "laptops", element: <Laptop /> },
      { path: "smartphones", element: <SmartPhone /> },
      { path: "electronics", element: <Electronic /> },
      { path: "smartwatch", element: <SmartWatch /> },
      { path: "products", element: <AllProducts /> },
      { path: "products/:productId", element: <ProductDetails /> },
      { path: "wish-list", element: <WishlistPage /> },
      { path: "newProducts", element: <NewProducts /> },
      { path: "best-products", element: <BestProducts /> },
      {
        path: "flash-sale",
        element: (
          <Admin>
            <FlashSale />
          </Admin>
        ),
      },
      {
        path: "add-to-cart",
        element: (
          <PrivateRoute>
            <AddToCart />
          </PrivateRoute>
        ),
      },
    ],
  },
  { path: "auth/login", element: <Login /> },
  { path: "auth/register", element: <Register /> },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <DashboardOverview /> },
      {
        path: "add-products",
        element: (
          <Seller>
            <AddProducts />
          </Seller>
        ),
      },
      {
        path: "user-order",
        element: (
          <Users>
            <UserOrders />
          </Users>
        ),
      },
      {
        path: "settings",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "customers",
        element: (
          <Admin>
            <Customers />
          </Admin>
        ),
      },
      {
        path: "my-products",
        element: (
          <Seller>
            <MyProduct />
          </Seller>
        ),
      },
      {
        path: "my-products-order",
        element: (
          <Seller>
            <MyProductsOrder />
          </Seller>
        ),
      },
    ],
  },
]);
