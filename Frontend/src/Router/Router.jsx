import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";
import CategoryPage from "../pages/category/CategoryPage";
import Search from "../pages/search/Search";
import ShopPage from "../pages/shop/ShopPage";
import SingleProduct from "../pages/shop/ProductDetails/SingleProduct";
import Login from "../components/Login";
import Register from "../components/Register";
import DashboardLayout from "../dashboard/DashboardLayout";
import PrivateRoute from "./PrivateRoute";
import UserDMain from "../dashboard/user/dashboard/userDMain";
import OrderDetails from "../dashboard/user/OrderDetail";

import UserReviews from "../dashboard/user/UserReviews";
import UserProfile from "../dashboard/user/UserProfile";
import ManageUser from "../dashboard/admin/Users/ManageUser";
import AddProduct from "../dashboard/admin/AddProduct/AddProduct";
import ManageProducts from "../dashboard/admin/ManageProduct/ManageProduct";
import UpdateProduct from "../dashboard/admin/ManageProduct/UpdateProduct";
import AdminDMain from "../dashboard/admin/Dashboard/AdminDmain";






const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children:[
        {
            path: "/",
            element:<Home/>

        },
        {
          path: "/categories/:categoryName",
          element:<CategoryPage/>
        },
        {
          path:"/search",
          element:<Search/>
        },
        {
          path:"/shop" , element:<ShopPage/>
        },
      {
        path:"/shop/:id" , element:<SingleProduct/>
      },

      {
        path:"/dashboard",
        element:<DashboardLayout/>,
        children:[

          { path: '', element: <UserDMain/>},
          { path: 'orders', element: <OrderDetails/>},
          { path: 'payments', element: <div>User Payments</div>},
          { path: 'profile', element: <div><UserProfile/></div>},
          { path: 'reviews', element: <UserReviews/>},



          { path: 'admin', element: <PrivateRoute><AdminDMain/> </PrivateRoute>},

          { path: 'add-new-post', element: <PrivateRoute><AddProduct/></PrivateRoute>},

          { path: 'manage-products', element: <PrivateRoute><ManageProducts/></PrivateRoute>},

          { path: 'update-product/:id', element: <PrivateRoute><UpdateProduct/></PrivateRoute>},

          { path: 'users', element: <PrivateRoute><ManageUser/></PrivateRoute>},

          { path: 'manage-orders', element: <PrivateRoute>Admin Main</PrivateRoute>},
        ]
      }
    ] 
  },

{
     path:"/login",
     element:<Login/>


},
{
  path:"/register",
  element:<Register/>


}





]);
export default router;
