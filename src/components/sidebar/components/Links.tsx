/* eslint-disable */
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import DashIcon from "components/icons/DashIcon";
import axios from "axios";
import { baseURL } from "lib/url";
// chakra imports

export const SidebarLinks = (props: { routes: RoutesType[] }): JSX.Element => {
  // Chakra color mode
  let location = useLocation();

  const [order, setOrder] = useState(0);
  const [orderPay, setOrderPay] = useState(0);

  const [cart, setCart] = useState(0);

  const { routes } = props;

  useEffect(() => {
    document.title = "จัดการสินค้า";
    const formData = new FormData();
    formData.append('id', "1");
    axios.post(`${baseURL}/all-order`, formData).then((response: any) => {
      let new_rows:any = [];
      let data = JSON.parse(response.data);
      setOrder(data.length);

    });
    }
  , []);

  useEffect(() => {
    document.title = "จัดการสินค้า";
    const formData = new FormData();
    formData.append('id', "1");
    axios.post(`${baseURL}/all-order-pay-success`, formData).then((response: any) => {
      let new_rows:any = [];
      let data = JSON.parse(response.data);
      data = data.filter((f: any) => f.status == 'ชำระแล้ว');

      setOrderPay(data.length);
    });
    }
  , []);

  useEffect(() => {
    getCart();
  }
  , []);

  useEffect(() => {
    console.log("Action")
  }, [props.routes])
  
  const getCart = async () => {
    let e: any = localStorage.getItem("email");
    const formData = new FormData();
    formData.append("email", atob(e));
    axios.post(`${baseURL}/get-cart`, formData).then((response: any) => {
      let data = JSON.parse(response.data);
      setCart(data.length);
    })
  }

  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName: string) => {
    return location.pathname.includes(routeName);
  };

  const createLinks = (routes: RoutesType[]) => {
    routes = routes.filter((route) => route.name !== "Sign In" && route.path !== "product" && route.path !== "sign-up");
    const User = JSON.parse(localStorage.getItem("user"));
    const UserRole = User?.token;
    const UserRoute = routes.filter((route) => route.layout === "/users");
    if(UserRole !== null && UserRole !== undefined && UserRole === "user"){
      // return;
      routes = UserRoute;
    }else if (UserRole !== null && UserRole !== undefined && UserRole === "admin"){
      const adminRoute = routes.filter((route) => route.layout === "/admin");
      routes = adminRoute
    }
    else {
      return;
    }
    routes = routes.filter((route) => route?.showSidebar !== false);
    return routes.map((route, index) => {
      if (
        route.layout === "/admin" ||
        route.layout === "/auth" ||
        route.layout === "/RTL" ||
        route.layout === "/users"
      ) {
        return (
          <Link key={index} to={route.layout + "/" + route.path}>
            <div className="relative mb-3 flex hover:cursor-pointer">
              <li
                className="my-[3px] flex cursor-pointer items-center px-8"
                key={index}
              >
                <span
                  className={`${
                    activeRoute(route.path) === true
                      ? "font-bold text-brand-500 dark:text-white"
                      : "font-medium text-gray-600"
                  }`}
                >
                  {route.icon ? route.icon : <DashIcon />}{" "}
                </span>
                <p
                  className={`leading-1 ml-4 flex ${
                    activeRoute(route.path) === true
                      ? "font-bold text-navy-700 dark:text-white"
                      : "font-medium text-gray-600"
                  }`}
                >
                  {route.name}
                </p>
              </li>
              {activeRoute(route.path) ? (
                <div className="absolute right-0 top-px h-9 w-1 rounded-lg bg-brand-500 dark:bg-brand-400" />
              ) : null}

              {
                route.name == "ตรวจสอบการสั่งซื้อ" && order > 0 ? (
                  <div className="w-6 h-6 mt-0.5 bg-red-500" style={{ borderRadius: 32 }}>
                    <p className="ml-2 absolute text-justify">
                      {order}
                    </p>
                  </div>
                ) : null
              }
              {
                route.name == "ตรวจสอบการส่งสินค้า" && orderPay > 0 ? (
                  <div className="w-6 h-6 mt-0.5 bg-red-500" style={{ borderRadius: 32 }}>
                    <p className="ml-2.5 absolute text-justify">
                      {orderPay}
                    </p>
                  </div>
                ) : null
              }
              {
                route.name == "ตระกร้า" && cart > 0 ? (
                  <div className="w-6 h-6 mt-0.5 bg-red-500" style={{ borderRadius: 32 }}>
                    <p className="ml-2.5 absolute text-justify">
                      {cart}
                    </p>
                  </div>
                ) : null
              }
            </div>
          </Link>
        );
      }
    });
  };
  // BRAND
  return <>{createLinks(routes)}</>;
};

export default SidebarLinks;
