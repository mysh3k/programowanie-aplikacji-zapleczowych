import "./input.css";
import Login from "./pages/Login";

import Categories from "./pages/Categories";
import Products from "./pages/Products";
import Homepage from "./pages/Homepage";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./pages/Register";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProductItem from "./pages/ProductItem";
import Cart from "./pages/Cart";
import Header from "./comp/Header";
import OrderSuccess from "./pages/OrderSuccess";
import Orders from "./pages/Orders";
import Order from "./pages/Order";
import Payment from "./pages/Payment";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "register",
    element: <Register />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "categories",
    element: (
      <>
        <Header />
        <Categories />
      </>
    ),
  },
  {
    path: "categories/:categoryName",
    element: (
      <>
        <Header />
        <Products />
      </>
    ),
  },

  {
    path: "categories/:categoryName/:productId/",
    element: (
      <>
        <Header />
        <ProductItem />
      </>
    ),
  },
  {
    path: "cart",
    element: (
      <>
        <Header />
        <Cart />
      </>
    ),
  },
  {
    path: "order-success",
    element: (
      <>
        <Header />
        <OrderSuccess />
      </>
    ),
  },
  {
    path: "orders",
    element: (
      <>
        <Header />
        <Orders />
      </>
    ),
  },
  {
    path: "order/:orderId",
    element: (
      <>
        <Header />
        <Order />
      </>
    ),
  },
  {
    path: "payment",
    element: (
      <>
        <Header />
        <Payment />
      </>
    ),
  },
]);
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
