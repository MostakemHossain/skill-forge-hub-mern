import { Switch } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
const photoURL = "login1.jpeg";

const navLinks = [
  { name: "Home", route: "/" },
  { name: "Instructors", route: "/instructors" },
  { name: "Classes", route: "/classes" },
];
const materialTheme = createTheme({
  palette: {
    primary: {
      main: "#ff0000",
    },
    secondary: {
      main: "#00ff00",
    },
  },
});

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHome, setIsHome] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isFixed, setIsFixed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const user = true;
  const [navBg, setNavBg] = useState("bg-[#15151580]");

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const darkClass = "dark";
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add(darkClass);
    } else {
      root.classList.remove(darkClass);
    }
  }, [isDarkMode]);

  useEffect(() => {
    setIsHome(location.pathname === "/");
    setIsLogin(location.pathname === "/login");
    setIsFixed(
      location.pathname === "/register" || location.pathname === "/login"
    );
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      const currentPosition = window.pageYOffset;
      setScrollPosition(currentPosition);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (scrollPosition > 100) {
      if (isHome) {
        setNavBg(
          "bg-white backdrop-filter backdrop-blur-xl bg-opacity-0 dark:white text-black"
        );
      } else {
        setNavBg("bg-white dark:bg-black dark:text-white text-black");
      }
    } else {
      setNavBg(
        `${
          isHome || location.pathname === "/"
            ? "bg-transparent"
            : "bg-white dark:bg-black"
        } dark:text-white text-black`
      );
    }
  }, [scrollPosition]);

  const handleLogOut = () => {
    // Handle logout logic
  };

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`${isHome ? navBg : 'bg-white dark:bg-black backdrop-blur-2xl'} ${isFixed ? 'static' : 'fixed'} top-0 transition-colors duration-500 ease-in-out w-full z-10`}
    >
      <div className="lg:w-[95%] mx-auto sm:px-6 lg:px-6">
        <div className="px-4 py-4 flex items-center justify-between">
          {/* logo  */}
          <div
            onClick={() => navigate('/')}
            className="flex-shrink-0 cursor-pointer pl-7 md:p-0"
          >
            <h1 className="text-2xl text-gray-100 inline-flex gap-3 items-center font-bold dark:text-white">
              Skill Forge Hub <img className="w-8 h-8" src="logo1.png" alt="" />
            </h1>
            <p className="font-bold text-[13px] tracking-[8px] text-secondary">
              Quick Explore
            </p>
          </div>

          {/* mobile menu icon  */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              onClick={toggleMobileMenu}
              className="text-gray-300 hover:text-white outline-none"
            >
              <FaBars className="h-6 w-6 hover:text-primary" />
            </button>
          </div>
          {/* navigational Links  */}
          <div className="hidden md:block text-black dark:text-white">
            <div className="flex">
              <ul className="ml-10 flex items-center space-x-4 pr-4">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <NavLink
                      to={link.route}
                      style={{ whiteSpace: "nowrap" }}
                      className={({ isActive }) =>
                        `font-bold ${
                          isActive
                            ? "text-secondary"
                            : `${
                                navBg.includes("bg-transparent")
                                  ? "text-black dark:text-white"
                                  : "text-black dark:text-white"
                              }`
                        }
                   hover:text-secondary duration-100
                   `
                      }
                    >
                      {link.name}
                    </NavLink>
                  </li>
                ))}
                {/* based on users  */}

                {user ? null : isLogin ? (
                  <li>
                    <NavLink
                      className={({ isActive }) =>
                        `font-bold ${
                          isActive
                            ? "text-secondary"
                            : `${
                                navBg.includes("bg-transparent")
                                  ? "text-white"
                                  : "text-black dark:text-white"
                              }`
                        }
                       hover:text-secondary duration-100
                       `
                      }
                      to="/register"
                    >
                      Register
                    </NavLink>
                  </li>
                ) : (
                  <li>
                    <NavLink
                      className={({ isActive }) =>
                        `font-bold ${
                          isActive
                            ? "text-secondary"
                            : `${
                                navBg.includes("bg-transparent")
                                  ? "text-white"
                                  : "text-black dark:text-white"
                              }`
                        }
                   hover:text-secondary duration-100
                   `
                      }
                      to="/login"
                    >
                      Login
                    </NavLink>
                  </li>
                )}

                {user && (
                  <>
                    <li>
                      <NavLink
                        className={({ isActive }) =>
                          `font-bold ${
                            isActive
                              ? "text-secondary"
                              : `${
                                  navBg.includes("bg-transparent")
                                    ? "text-black dark:text-white"
                                    : "text-black dark:text-white"
                                }`
                          }
                       hover:text-secondary duration-100
                       `
                        }
                        to="/dashboard"
                      >
                        Dashboard
                      </NavLink>
                    </li>
                    <li>
                      <img
                        src={photoURL}
                        className="h-[40px] w-[40px] rounded-full"
                        alt=""
                      />
                    </li>
                    <li>
                      <NavLink
                        onClick={handleLogOut}
                        className="font-bold px-3 py-2 bg-secondary rounded-xl text-white"
                      >
                        LogOut
                      </NavLink>
                    </li>
                  </>
                )}

                {/* color toggle  */}
                <li>
                  <ThemeProvider theme={materialTheme}>
                    <div className="flex flex-col justify-center items-center">
                      <Switch onChange={() => setIsDarkMode(!isDarkMode)} />
                      <h1 className="text-[8px]">Light/Dark</h1>
                    </div>
                  </ThemeProvider>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default NavBar;
