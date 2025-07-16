import { Menu, ShoppingCart, User, Search, X, Moon, Sun, HeartIcon, LogOutIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { cn } from "../libs/utils";
import CartComponent from "./CartComponent";
import { SearchComponent } from "./SearchComponent";
export const NavBar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    setIsLoggedIn(!!token);
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    window.location.href = "/"; // or use `navigate("/")` if using useNavigate
  };

  const links = [
    { name: "Shop", path: "/" },
    { name: "About Us", path: "/About" },
    { name: "FAQ", path: "/new" },
    { name: "Collections", path: "/CollectionPage" },
  ];

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
    document.documentElement.classList.toggle("dark", newMode);
  };

  return (
    <header className="bg-pink-50/80 backdrop-blur-md text-foreground shadow-md sticky top-0 z-50 transition-colors duration-300 border-b border-pink-200">
      <div className="container flex items-center justify-between py-4 px-4">
        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-extrabold text-transparent bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 bg-clip-text tracking-tight"
        >
          Kpop Merch Shop
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-15 text-sm font-semibold">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="relative group text-gray-700 hover:text-pink-500 transition duration-300"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] gap-10 bg-pink-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
          ))}
        </nav>

        {/* Icons + Theme + Mobile Toggle */}
        <div className="flex items-center gap-4 md:gap-6">
          <div className="hidden md:flex items-center gap-10 text-gray-600">
            <SearchComponent />
            {isLoggedIn ? (
              <>
                <Link to="/UserProfile" className="hover:text-pink-500 transition">
                  <HeartIcon className="w-5 h-5 text-black" />
                </Link>
                <LogOutIcon
                  onClick={handleLogout}
                  className="hover:text-pink-500 text-sm font-semibold"
                >
                  Logout
                </LogOutIcon>
                <User onClick={"/UserProfile"}
                  className="hover:text-pink-500 text-sm font-semibold"></User>
              </>
            ) : (
              <Link to="/login" className="hover:text-pink-500 transition">
                <User className="w-5 h-5 text-black" />
              </Link>
            )}

            <CartComponent />
            {/* <button
              onClick={toggleTheme}
              className="p-1 rounded-full hover:text-pink-500 transition"
              aria-label="Toggle theme"
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5 text-yellow-400" />
              ) : (
                <Moon className="h-5 w-5 text-blue-400" />
              )}
            </button> */}
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {mobileOpen && (
        <div className="md:hidden bg-pink-50/90 backdrop-blur-sm px-6 py-6 space-y-6 border-t border-pink-200 shadow-lg transition-all duration-300">
          <nav className="flex flex-col gap-4 text-lg font-medium">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                className="hover:text-pink-500 transition-colors duration-300"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="flex justify-around pt-4 border-t border-pink-200 text-foreground">
            {isLoggedIn ? (
              <>
                <Link to="/UserProfile" className="hover:text-pink-500 transition">
                  <HeartIcon className="w-5 h-5 text-black" />
                </Link>
                <LogOutIcon
                  onClick={handleLogout}
                  className="hover:text-pink-500 text-sm font-semibold"
                >
                  Logout
                </LogOutIcon>
                <User onClick={"/UserProfile"}
                  className="hover:text-pink-500 text-sm font-semibold"></User>
              </>
            ) : (
              <Link to="/login" className="hover:text-pink-500 transition">
                <User className="w-5 h-5 text-black" />
              </Link>
            )}

          </div>
        </div>
      )}
    </header>
  );
};
