import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useState } from "react";
// import { Moon, Sun } from "lucide-react";
import { Button } from "../ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "../ui/dropdown-menu";
// import { useTheme } from "../theme/themeProvider";
import Spinner from "../spinner/Spinner";

const Navbar = ({
  handleDashboardClick,
  // setConversionType,
  setPropertyCategory,
}) => {
  const [propertyView, setPropertyView] = useState("for_sale");
  // const [conversionType, setConversionTypeState] = useState("price");
  const [isLoading, setIsLoading] = useState(false);
  // const { setTheme } = useTheme();

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
  // const handleConversionType = (type) => {
  //   setConversionType(type);
  //   setConversionTypeState(type);
  // };
  return (
    <div>
      <nav>
        <div className="px-44">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-4 opacity-80">
              <Button
                variant="primary"
                className={`rounded-md text-base font-semibold font-montserrat ${
                  propertyView === "for_sale" ? "text-[#0071BC]" : ""
                }`}
                onClick={() => handlePropertyView("for_sale")}
              >
                Buy
              </Button>
              <Button
                variant="primary"
                className={`rounded-md text-base font-semibold font-montserrat ${
                  propertyView === "for_rent" ? "text-[#0071BC]" : ""
                }`}
                onClick={() => handlePropertyView("for_rent")}
              >
                Rent
              </Button>
              <Button
                variant="primary"
                className={`rounded-md text-base font-semibold font-montserrat ${
                  propertyView === "For Mortgage" ? "text-[#0071BC]" : ""
                }`}
              >
                Mortgage
              </Button>
              {/* <button
                      className={`rounded-md px-3 py-2 text-sm font-medium text-white ${
                        conversionType === "count"
                          ? "bg-gray-400"
                          : "bg-gray-900"
                      }`}
                      onClick={() => handleConversionType("count")}
                    >
                      Lacs
                    </button>
                    <button
                      className={`rounded-md px-3 py-2 text-sm font-medium text-white ${
                        conversionType === "price"
                          ? "bg-gray-400"
                          : "bg-gray-900"
                      }`}
                      onClick={() => handleConversionType("price")}
                    >
                      Million
                    </button> */}
            </div>
            <div className="flex items-center justify-center gap-1">
              <div>
                <img src="img/website_logo.svg" alt="logo" />
              </div>
              <div>
                <h1 className="font-bold text-3xl text-[#0071BC] font-robotoSlab tracking-widest">
                  attaq
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-4 opacity-80">
              <div>
                <Button
                  variant="primary"
                  className="text-base font-semibold font-montserrat tracking-wide"
                >
                  Saved Searches
                </Button>
              </div>
              <div>
                <Button
                  variant="outline"
                  className="text-base font-semibold font-montserrat"
                >
                  Sign-up or Log-in
                </Button>
              </div>
              <div>
                <img src="img/filter_svg.svg" alt="filter" />
              </div>
              {/* <div>
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
              </div> */}
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
