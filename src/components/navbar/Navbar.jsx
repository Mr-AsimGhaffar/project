import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useTheme } from "../theme/themeProvider";
import Spinner from "../spinner/Spinner";

const Navbar = ({
  handleDashboardClick,
  setConversionType,
  setPropertyCategory,
}) => {
  const [propertyView, setPropertyView] = useState("For Sale");
  const [conversionType, setConversionTypeState] = useState("price");
  const [isLoading, setIsLoading] = useState(false);
  const { setTheme } = useTheme();

  const fetchData = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  const handlePropertyView = (category) => {
    setPropertyView(category);
    setPropertyCategory(category);
    fetchData();
  };
  const handleConversionType = (type) => {
    setConversionType(type);
    setConversionTypeState(type);
  };
  return (
    <div>
      <nav className="bg-gray-800">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  <Link
                    to="/dashboard"
                    onClick={handleDashboardClick}
                    className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
                    aria-current="page"
                  >
                    DASHBOARD
                  </Link>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                className={`rounded-md px-3 py-2 text-sm font-medium text-white ${
                  propertyView === "For Sale" ? "bg-gray-400" : "bg-gray-900"
                }`}
                onClick={() => handlePropertyView("For Sale")}
              >
                BUY
              </button>
              <button
                className={`rounded-md px-3 py-2 text-sm font-medium text-white ${
                  propertyView === "For Rent" ? "bg-gray-400" : "bg-gray-900"
                }`}
                onClick={() => handlePropertyView("For Rent")}
              >
                RENT
              </button>
              <button
                className={`rounded-md px-3 py-2 text-sm font-medium text-white ${
                  conversionType === "count" ? "bg-gray-400" : "bg-gray-900"
                }`}
                onClick={() => handleConversionType("count")}
              >
                Lacs
              </button>
              <button
                className={`rounded-md px-3 py-2 text-sm font-medium text-white ${
                  conversionType === "price" ? "bg-gray-400" : "bg-gray-900"
                }`}
                onClick={() => handleConversionType("price")}
              >
                Million
              </button>
            </div>
            <div className="ml-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setTheme("light")}>
                    Light
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("dark")}>
                    Dark
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("system")}>
                    System
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
        <div className="sm:hidden" id="mobile-menu">
          <div className="space-y-1 px-2 pb-3 pt-2">
            <Link
              to="/dashboard"
              onClick={handleDashboardClick}
              className="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white"
              aria-current="page"
            >
              DASHBOARD
            </Link>
          </div>
        </div>
      </nav>
      {isLoading && <Spinner />}
    </div>
  );
};
Navbar.propTypes = {
  handleDashboardClick: PropTypes.func.isRequired,
  setConversionType: PropTypes.func.isRequired,
  setPropertyCategory: PropTypes.func.isRequired,
};
export default Navbar;
