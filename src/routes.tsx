import React from "react";

// Admin Imports
import MainDashboard from "views/admin/default";
import NFTMarketplace from "views/admin/marketplace";
import Profile from "views/users/profile";
import DataTables from "views/admin/tables";
import RTLDefault from "views/rtl/default";
import Finace from "views/admin/finace";
import Sell from "views/admin/sell";
import Selllist from "views/admin/selllist";
import Stockphama from "views/admin/stockphama";
import Product from "views/admin/product";
import SignUp from "views/auth/Signup";
import Category from "views/admin/category"

import About from "views/admin/about.tsx";
import Order from "views/admin/Order";
import Shipping from "views/admin/Shipping";
import AllPayment from "views/admin/AllPayment";
import Track from "views/admin/Track";

// Auth Imports
import SignIn from "views/auth/SignIn";

// Icon Imports
import {
  MdHome,
  MdOutlineShoppingCart,
  MdBarChart,
  MdPerson,
  MdLock,
  MdCategory,
  MdStore,
} from "react-icons/md";
import Address from "views/users/Address";
import ChangePassword from "views/auth/ChangePassword";
import CheckOut from "views/users/Checkout";
import EditAddress from "views/users/EditAddress";
//import Forgot from "views/users/ChangePassword.tsx";
import OrderIDUser from "views/users/OrderIdUser";
import Cart from "views/users/cart";
import Home from "views/users/Home";
import Register from "views/auth/Register";
import History from "views/users/History"
import LongdoMap from "views/users/LongdoMap"
import FollowShipping from "views/users/FollowShippin";
import Forgot from "views/auth/forgot";
import OrderID from "views/admin/OrderID/OrderID";
//import ForgotPassword from "views/admin/ForgotPassword.tsx";


export const routes : RoutesType[] = [
  {
    name: "คลังสินค้า",
    layout: "/admin",
    path: "product",
    icon: <MdHome className="h-6 w-6" />,
    component: <Product />,
  },
  {
    name: "ประเภทยาและสินต้า",
    layout: "/admin",
    icon:  <MdCategory className="h-6 w-6" />,
    path:"category",
    component: <Category/>
  },
  {
    name: "คลังยา",
    layout: "/admin",
    icon:  <MdStore className="h-6 w-6" />,
    path: "stockphama",
    component: <Stockphama />,
  },
  {
    name: "ใบสั่งซื้อ",
    layout: "/admin",
    icon:  <MdStore className="h-6 w-6" />,
    path: "order-id",
    component: <OrderID />,
    showSidebar: false,
  },
  {
    name: "ตรวจสอบการสั่งซื้อ",
    layout: "/admin",
    icon:  <MdStore className="h-6 w-6" />,
    path: "order",
    component: <Order />,
  },
  {
    name: "ตรวจสอบการส่งสินค้า",
    layout: "/admin",
    icon:  <MdStore className="h-6 w-6" />,
    path: "Shipping",
    component: <Shipping />,
  },
  {
    name: "ส่งข้อมูลขนส่ง",
    layout: "/admin",
    icon:  <MdStore className="h-6 w-6" />,
    path: "Track",
    component: <Track />,
    showSidebar: false,
  },
  {
    name: "ยอดขายรายเดือน",
    layout: "/admin",
    icon:  <MdStore className="h-6 w-6" />,
    path: "AllPayment",
    component: <AllPayment />,
  },
  {
    name: "เกี่ยวกับฉัน",
    layout: "/admin",
    icon:  <MdStore className="h-6 w-6" />,
    path: "about",
    component: <About />,
  },
  {
    name: "Sign In",
    layout: "/auth",
    path: "sign-in",
    icon: <MdLock className="h-6 w-6" />,
    component: <SignIn />,
  },
  {
    name: "Sign Up",
    layout: "/auth",
    path: "sign-up",
    icon: <MdLock className="h-6 w-6" />,
    component: <SignUp />,
  },
  {
    name: "ลืมรหัสผ่าน",
    layout: "/auth",
    path: "forgot",
    icon: <MdLock className="h-6 w-6" />,
    component: <Forgot />,
  },
  {
    name: "หน้าแรก",
    layout: "/users",
    path: "home",
    icon: <MdLock className="h-6 w-6" />,
    component: <Home />,
  },
  {
    name: "จัดการที่อยู่",
    layout: "/users",
    path: "address",
    icon: <MdLock className="h-6 w-6" />,
    component: <Address />,
  },
  {
    name: "เปลี่ยนรหัสผ่าน",
    layout: "/user",
    path: "change-password",
    icon: <MdLock className="h-6 w-6" />,
    component: <ChangePassword />,
    showSidebar: false,
  },
  {
    name: "ชำระเงิน",
    layout: "/users",
    path: "checkout",
    icon: <MdLock className="h-6 w-6" />,
    component: <CheckOut />,
    showSidebar: false,
  },
  {
    name: "แก้ไขที่อยู่",
    layout: "/users",
    path: "edit-address",
    icon: <MdLock className="h-6 w-6" />,
    component: <EditAddress />,
    showSidebar: false,
  },
  {
    name: "เปลี่ยนรหัสผ่าน",
    layout: "/users",
    path: "change-password",
    icon: <MdLock className="h-6 w-6" />,
    component: <ChangePassword />,
  },
  {
    name: "ประวัติ",
    layout: "/users",
    path: "history",
    icon: <MdLock className="h-6 w-6" />,
    component: <History />,
  },
  // {
  //   name: "แผนที่",
  //   layout: "/users",
  //   path: "longdo-map",
  //   icon: <MdLock className="h-6 w-6" />,
  //   component: <LongdoMap />,
  // },
  {
    name: "ใบสั่งซื้อ",
    layout: "/users",
    path: "order-id-user",
    icon: <MdLock className="h-6 w-6" />,
   component: <OrderIDUser />,
   showSidebar: false,
  },
  {
    name: "Profile",
    layout: "/users",
    path: "profile",
    icon: <MdLock className="h-6 w-6" />,
   component: <Profile />,
  },
  {
    name: "ตระกร้า",
    layout: "/users",
    path: "cart",
    icon: <MdLock className="h-6 w-6" />,
   component: <Cart />,
  },
  {
    name: "ติดตามสินค้า",
    layout: "/users",
    path: "follow-shiping",
    icon: <MdLock className="h-6 w-6" />,
   component: <FollowShipping />,
   showSidebar: false,
  },
];
export default routes;
