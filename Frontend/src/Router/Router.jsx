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
import UserDMain from "../dashboard/user/dashboard/UserDMain";
import OrderDetails from "../dashboard/user/OrderDetail";
import UserReviews from "../dashboard/user/UserReviews";
import UserProfile from "../dashboard/user/UserProfile";
import ManageUser from "../dashboard/admin/Users/ManageUser";
import AddProduct from "../dashboard/admin/AddProduct/AddProduct";
import ManageProducts from "../dashboard/admin/ManageProduct/ManageProduct";
import UpdateProduct from "../dashboard/admin/ManageProduct/UpdateProduct";
import AdminDMain from "../dashboard/admin/Dashboard/AdminDMain";
import Deals from "../dashboard/admin/Deals_&_Banners/Deals";
import Gifts from "../pages/Gifts/Gifts";
import Collection from "../pages/Collection/Collection";
import Thanks from "../pages/Thanks/Thanks";
import AddCoupon from "../dashboard/admin/AddCoupon/AddCoupon";
import CODSuccess from "../components/CodSucess";
import PaymentSuccess from "../components/PaymentSucess";
import UserOrders from "../dashboard/user/UserOrders";
import ManageOrders from "../dashboard/admin/ManageOrders/ManageOrder";
import GenderPage from "../pages/category/GenderCategory";
import DeliveryInformation from "../pages/footer/DeliveryInformation";
import CancellationPolicy from "../pages/footer/CancellationPolicy";
import LegalPolicy from "../pages/footer/LegalPolicies";
import ContactUs from "../pages/footer/ContactUs";
import HelpFAQ from "../pages/footer/Help";
import ReturnExchange from "../pages/footer/ReturnAndExchange";
import GenderCategoryPage from "../pages/category/GenderCategorypage";








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
       path:"/shop/category/:categoryName", element:<CategoryPage />
      },

      {
        path:"/gender/:gender", element:<GenderPage/>
       },

       {
        path:"/gender/:gender/category/:categoryName",
         element:<GenderCategoryPage/>
       },




      {
        path:"/collection", element:<Collection/>
       },
       {
        path:"/gifts", element:<Gifts />
       },
       {
        path:"/thanks", element:<Thanks />
       },


       {
        path:"/payment-success", element:<PaymentSuccess />
       },
       {
        path:"/cod-success", element:<CODSuccess />
       },


       {
        path:"/delivery-information", element:<DeliveryInformation />
       },


       {
        path:"/cancellation-policy", element:<CancellationPolicy />
       },


       {
        path:"/legal-policy", element:<LegalPolicy />
       },

       {
        path:"/contact-us", element:<ContactUs />
       },
       {
        path:"/help", element:<HelpFAQ />
       },
       {
        path:"/return-exchange", element:<ReturnExchange />
       },

       {
        path: "/dashboard",
        element: <DashboardLayout />,
        children: [
          { path: '', element: <UserDMain /> },
          { path: 'orders', element: <UserOrders /> },
          { path: "orders/:orderId", element: <OrderDetails /> },
          { path: 'payments', element: <div>User Payments</div> },
          { path: 'profile', element: <div><UserProfile /></div> },
          { path: 'reviews', element: <UserReviews /> },
      
          // Admin Routes with Role Restriction
          { 
            path: 'admin', 
            element: <PrivateRoute requiredRole="admin"><AdminDMain /></PrivateRoute> 
          },
          { 
            path: 'add-new-post', 
            element: <PrivateRoute requiredRole="admin"><AddProduct /></PrivateRoute> 
          },
          { 
            path: 'manage-products', 
            element: <PrivateRoute requiredRole="admin"><ManageProducts /></PrivateRoute> 
          },
          { 
            path: 'update-product/:id', 
            element: <PrivateRoute requiredRole="admin"><UpdateProduct /></PrivateRoute> 
          },
          { 
            path: 'users', 
            element: <PrivateRoute requiredRole="admin"><ManageUser /></PrivateRoute> 
          },
          { 
            path: 'manage-orders', 
            element: <PrivateRoute requiredRole="admin"><ManageOrders /></PrivateRoute> 
          },
          { 
            path: 'deals-banners', 
            element: <PrivateRoute requiredRole="admin"><Deals /></PrivateRoute> 
          },
          { 
            path: 'add-coupon', 
            element: <PrivateRoute requiredRole="admin"><AddCoupon /></PrivateRoute> 
          },
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
