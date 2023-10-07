/* eslint-disable */

import { HiX } from "react-icons/hi";
import Links from "./components/Links";

import SidebarCard from "components/sidebar/componentsrtl/SidebarCard";
import routes from "routes";
import Logo from "assets/img/layout/logodashbord.png";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseURL, baseURLstatic } from "lib/url";
import React from "react";
import { AboutContext } from "context/aboutContext";

const Sidebar = (props: {
  open: boolean;
  onClose: React.MouseEventHandler<HTMLSpanElement>;
}) => {
  const { open, onClose } = props;

  const { getAbout }: any = React.useContext(AboutContext);
  const aboutData = getAbout();

  return (
    <div
      className={`sm:none duration-175 linear fixed !z-50 flex min-h-full min-w-[250px] flex-col bg-white pb-10 shadow-2xl shadow-white/5 transition-all dark:!bg-navy-800 dark:text-white md:!z-50 lg:!z-50 xl:!z-0 ${open ? "translate-x-0" : "-translate-x-96"
        }`}
    >
      <span
        className="absolute top-4 right-4 block cursor-pointer xl:hidden"
        onClick={onClose}
      >
        <HiX />
      </span>

      <div className={`mx-[56px] mt-[50px] flex items-center`}>
        <div className="flex flex-col">
          <div className="mt-1 ml-1 font-poppins text-[26px] font-bold uppercase text-navy-700 dark:text-white">

            <img src={aboutData?.logo ? baseURLstatic + "/" + aboutData?.logo : Logo} className="w-[180px] object-cover -mt-6 -ml-2 " />

          </div>
          <div className="!text-[30px] mt-2">{aboutData?.name ? aboutData?.name : ""}</div>
        </div>

      </div>
      <div className="mt-[58px] mb-7 h-px bg-gray-300 dark:bg-white/30" />
      {/* Nav item */}

      <ul className="mb-auto pt-1">
        <Links routes={routes} />
      </ul>

    </div>
  );
};

export default Sidebar;
