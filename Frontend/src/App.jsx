import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Product from "./pages/homepage/Product";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";

import Home from "./pages/homepage/Home";
import Productdet from "./pages/Productdet";
import Order from "./Admin/Order";
import Add from "./Admin/Add";
import List from "./Admin/List";
import ProtectedRoute from "./Components/ProtectedRoute";
import OrderDet from "./Admin/OrderDet";
import AdminProductdet from "./Admin/AdminProductdet";
import PlaceOrderStatus from "./pages/PlaceOrderStatus";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/products",
      element: <Product />,
    },
    {
      path: "/productdet/:id",
      element: <Productdet />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/cart",
      element: (
        <ProtectedRoute role="user">
          <Cart />
        </ProtectedRoute>
      ),
    },

    {
      path: "/checkout",
      element: (
        <ProtectedRoute role="user">
          <Checkout />,
        </ProtectedRoute>
      ),
    },
    {
      path:'/placeorderitem/:userid',
      element:(
        <ProtectedRoute role="user">
          <PlaceOrderStatus/>
        </ProtectedRoute>
      )
    },

    {
      path: "/admin/Order",
      element: (
        <ProtectedRoute role="admin">
          <Order />
        </ProtectedRoute>
      ),
    },
    {
      path: "/admin/Orderdetail/:id",
      element: (
        <ProtectedRoute role="admin">
          <OrderDet />
        </ProtectedRoute>
      ),
    },
    {
      path: "/admin/productdetail/:id",
      element: (
        <ProtectedRoute role="admin">
          <AdminProductdet />
        </ProtectedRoute>
      ),
    },
    {
      path: "/admin/add-product",
      element: (
        <ProtectedRoute role="admin">
          <Add />
        </ProtectedRoute>
      ),
    },
    {
      path: "/admin/add-product/:id",
      element: (
        <ProtectedRoute role="admin">
          <Add />
        </ProtectedRoute>
      ),
    },
    {
      path: "/admin/list",
      element: (
        <ProtectedRoute role="admin">
          <List />
        </ProtectedRoute>
      ),
    },
  ]);

  return (
    <div className="app">
      <RouterProvider router={router} />
   
    </div>
  );
}

export default App;
