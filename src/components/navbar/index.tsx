import React from "react";
import Dropdown from "components/dropdown";
import { FiAlignJustify } from "react-icons/fi";
import { Link } from "react-router-dom";
import navbarimage from "assets/img/layout/Navbar.png";
import { BsArrowBarUp } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import { RiMoonFill, RiSunFill } from "react-icons/ri";
import {
  IoMdNotificationsOutline,
  IoMdInformationCircleOutline,
} from "react-icons/io";
import avatar from "assets/img/avatars/avatar4.png";

const Navbar = (props: {
  onOpenSidenav: () => void;
  brandText: string;
  secondary?: boolean | string;
}) => {
  const { onOpenSidenav, brandText } = props;
  const [darkmode, setDarkmode] = React.useState(false);
  const isLogin = localStorage.getItem("email") ? true : false;

  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);

  return (
    <>
    <nav className="pt-4 pb-4 top-4 z-40 flex flex-row flex-wrap items-center justify-between rounded-xl bg-white/10 p-2 backdrop-blur-xl dark:bg-[#0b14374d]">
      <div className="w-[600px] pt-1">
        <a
          className="text-6xl font-medium text-navy-700 dark:text-white dark:hover:text-white"
          href=" "
        >
          ยินดีต้อนรับ {(user?.firstName? user.firstName : "") + " " + (user?.lastName? user.lastName : "")}
        </a>
      </div>

      {isLogin ? (
        <div className="relative mt-[3px] flex h-[40px]  flex-grow items-center justify-around gap-2 rounded-full bg-white px-2 py-2 shadow-xl shadow-shadow-500 dark:!bg-red-500 dark:shadow-none md:flex-grow-0 md:gap-1 xl:gap-2">
          <span
            className="flex cursor-pointer text-xl text-gray-600 dark:text-white xl:hidden"
            onClick={onOpenSidenav}
          >
            <FiAlignJustify className="h-5 w-5" />
          </span>
          <div className="m-2 ml-3 mr-3 flex flex-col">
            <a
              href=" "
              className="text-lg font-medium text-white hover:text-white"
              onClick={() => {
                window.location.href = "/home/product";
                localStorage.removeItem("email");
                localStorage.removeItem("password");
                localStorage.removeItem("user");
              }}
            >
              Log Out
            </a>
          </div>
        </div>
      ) : (
        <div className="relative mt-[3px] flex h-[61px]  flex-grow items-center justify-around gap-2 rounded-full  px-2 py-2 dark:shadow-none md:flex-grow-0 md:gap-1 xl:gap-2">
          <span
            className="flex cursor-pointer text-xl text-gray-600 dark:text-white xl:hidden"
            onClick={onOpenSidenav}
          >
            <FiAlignJustify className="h-5 w-5" />
          </span>
          <div>
            <button className="linear mt-2 rounded-xl bg-brand-500 px-5 py-1 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
              <Link
                to="/auth/sign-in"
                className="text-sm text-xl font-medium text-white hover:text-brand-600 dark:text-white"
              >
                เข้าสู่ระบบ
              </Link>
            </button>
          </div>
        </div>
      )}
      
    </nav>
    <div className="flex-1 w-full h-0.5 bg-white"></div>
    </>
  );
};

export default Navbar;
