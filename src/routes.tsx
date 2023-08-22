import React from "react";

// Admin Imports
import MainDashboard from "views/admin/default";
import NFTMarketplace from "views/admin/marketplace";
import Profile from "views/user/profile";
import DataTables from "views/admin/tables";
import RTLDefault from "views/rtl/default";
import Finace from "views/admin/finace";
import Sell from "views/admin/sell";
import Selllist from "views/admin/selllist";
import Stockphama from "views/admin/stockphama";
import Product from "views/admin/product";
import SignUp from "views/auth/Signup";
import Category from "views/admin/category"

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
  MdStore
} from "react-icons/md";

const routes = [
  {
    name: "Main Dashboard",
    layout: "/admin",
    path: "default",
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboard />,
  },
  {
    name: "Main Dashboard",
    layout: "/user",
    path: "default",
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboard />,
  },
  {
    name: "คลังยา",
    layout: "/admin",
    path: "product",
    icon: <MdHome className="h-6 w-6" />,
    component: <Product />,
  },
  // {
  //   name: "NFT Marketplace",
  //   layout: "/admin",
  //   path: "nft-marketplace",
  //   icon: <MdOutlineShoppingCart className="h-6 w-6" />,
  //   component: <NFTMarketplace />,
  //   secondary: true,
  // },
  // {
  //   name: "Data Tables",
  //   layout: "/admin",
  //   icon: <MdBarChart className="h-6 w-6" />,
  //   path: "data-tables",
  //   component: <DataTables />,
  // },
  {
    name: "การเงิน",
    layout: "/admin",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "finace",
    component: <Finace />,
  },{
    name: "การขาย",
    layout: "/admin",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "sell",
    component: <Sell />,
  },{
    name: "รายการสั่งซื้อ",
    layout: "/admin",
    icon:  <MdOutlineShoppingCart className="h-6 w-6" />,
    path: "selllist",
    component: <Selllist />,
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
  // {
  //   name: "NFT Marketplace",
  //   layout: "/admin",
  //   path: "nft-marketplace",
  //   icon: <MdOutlineShoppingCart className="h-6 w-6" />,
  //   component: <NFTMarketplace />,
  // },
  {
    name: "Profile",
    layout: "/admin",
    path: "profile",
    icon: <MdPerson className="h-6 w-6" />,
    component: <Profile />,
  },
  {
    name: "Profile",
    layout: "/user",
    path: "profile",
    icon: <MdPerson className="h-6 w-6" />,
    component: <Profile />,
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
  }
  // {
  //   name: "RTL Admin",
  //   layout: "/rtl",
  //   path: "rtl",
  //   icon: <MdHome className="h-6 w-6" />,
  //   component: <RTLDefault />,
  // },
];
export default routes;
