import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "components/navbar";
import Sidebar from "components/sidebar";
import Footer from "components/footer/Footer";
import routes from "routes";
import { AboutContext } from "context/aboutContext";
import { baseURLstatic } from "lib/url";
import Logo from "assets/img/layout/logodashbord.png";

export default function User(props: { [x: string]: any }) {
  const { ...rest } = props;
  const location = useLocation();
  const [open, setOpen] = React.useState(true);
  const [currentRoute, setCurrentRoute] = React.useState("Main Dashboard");

  React.useEffect(() => {
    window.addEventListener("resize", () =>
      window.innerWidth < 1200 ? setOpen(false) : setOpen(true)
    );
  }, []);
  React.useEffect(() => {
    getActiveRoute(routes);
  }, [location.pathname]);

  const getActiveRoute = (routes: RoutesType[]): string | boolean => {
    let activeRoute = "home";
    for (let i = 0; i < routes.length; i++) {
      if (
        window.location.href.indexOf(
          routes[i].layout + "/" + routes[i].path
        ) !== -1
      ) {
        setCurrentRoute(routes[i].name);
      }
    }
    return activeRoute;
  };
  const getActiveNavbar = (routes: RoutesType[]): string | boolean => {
    let activeNavbar = false;
    for (let i = 0; i < routes.length; i++) {
      if (
        window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
      ) {
        return routes[i].secondary;
      }
    }
    return activeNavbar;
  };
  const getRoutes = (routes: RoutesType[]): any => {
    return routes.map((prop, key) => {
      if (prop.layout === "/home") {
        return (
          <Route path={`/${prop.path}`} element={prop.component} key={key} />
        );
      } else {
        return null;
      }
    });
  };

  
  const { getAbout }: any = React.useContext(AboutContext);
  const aboutData = getAbout();

  const SideComponent = () => {
    
    return(
      <div
      className={`sm:none duration-175 linear fixed !z-50 flex min-h-full min-w-[250px] flex-col bg-white pb-10 shadow-2xl shadow-white/5 transition-all dark:!bg-navy-800 dark:text-white md:!z-50 lg:!z-50 xl:!z-0 ${open ? "translate-x-0" : "-translate-x-96"
        }`}
    >
      {/* <span
        className="absolute top-4 right-4 block cursor-pointer xl:hidden"
        onClick={onClose}
      >
        <HiX />
      </span> */}

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



    </div>
    )
  }

  document.documentElement.dir = "home";
  return (
    <div className="flex h-full w-full">
   <SideComponent/>
      {/* Navbar & Main Content */}
      <div className="h-full w-full bg-lightPrimary dark:!bg-navy-900 min-h-screen">
        {/* Main Content */}
        <main
          className={`mx-[12px] h-full flex-none transition-all md:pe-2`}
        >
          {/* Routes */}
          <div className="h-full ml-[20vw]">
            <Navbar
              onOpenSidenav={() => setOpen(true)}
              brandText={currentRoute}
              secondary={getActiveNavbar(routes)}
              {...rest}
            />
            <div className="pt-5s mx-auto mb-auto h-full min-h-[84vh] p-2 md:pr-2">
              <Routes>
                {getRoutes(routes)}

                <Route
                  path="/"
                  element={<Navigate to="/home/product" replace />}
                />
              </Routes>
            </div>
            <div className="p-3">
              <Footer />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
