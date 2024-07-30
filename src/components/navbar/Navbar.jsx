import PropTypes from "prop-types";
import { useState } from "react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useTheme } from "../theme/themeProvider";
import Spinner from "../spinner/Spinner";
import { Link } from "react-router-dom";

const Navbar = ({
  handleDashboardClick,
  setConversionType,
  setPropertyCategory,
}) => {
  const [propertyView, setPropertyView] = useState("for_sale");
  const [conversionType, setConversionTypeState] = useState("price");
  const [isLoading, setIsLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { setTheme } = useTheme();
  const [isBlackTheme, setIsBlackTheme] = useState(false);

  const handleThemeToggle = () => {
    const newTheme = isBlackTheme ? "light" : "dark";
    setTheme(newTheme);
    setIsBlackTheme(!isBlackTheme);
  };

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
  const handleConversionType = () => {
    const newConversionType = conversionType === "price" ? "count" : "price";
    setConversionTypeState(newConversionType);
    setConversionType(newConversionType);
  };
  return (
    <div>
      <nav>
        <div className="px-4 md:px-44">
          <div className="flex items-center justify-between h-16">
            <div className="hidden lg:flex items-center gap-4 opacity-80">
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
            </div>
            <Link to="/dashboard" onClick={handleDashboardClick}>
              <div className="flex items-center gap-1">
                <div>
                  <img
                    src="img/website_logo.svg"
                    alt="logo"
                    className="h-8 md:h-10"
                  />
                </div>
                <div>
                  <h1 className="font-bold text-2xl md:text-3xl text-[#0071BC] font-robotoSlab tracking-widest">
                    attaq
                  </h1>
                </div>
              </div>
            </Link>

            <div className="hidden lg:flex items-center gap-4 opacity-80 ">
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
                <DropdownMenu>
                  <DropdownMenuTrigger asChild className="bg-white">
                    <Button variant="outline" size="icon">
                      <img src="img/filter_svg.svg" alt="filter" />
                      <span className="sr-only">Toggle theme</span>
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent
                    align="end"
                    className="w-64 mt-2 p-4 bg-[#000000] border-none text-[#FFFFFF] font-inter font-normal text-base"
                  >
                    <DropdownMenuItem className="flex items-center justify-between">
                      <div>{isBlackTheme ? "Light Theme" : "Black Theme"}</div>
                      <div>
                        <input
                          type="checkbox"
                          checked={isBlackTheme}
                          onChange={handleThemeToggle}
                          className="appearance-none border w-4 h-4 rounded-sm checked:bg-[#0071BC] checked:border-[#0071BC] focus:outline-none"
                        />
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center justify-between">
                      <div>
                        {conversionType === "count"
                          ? "Currency Value in Million"
                          : "Currency Value in Lacs"}
                      </div>
                      <div>
                        <input
                          type="checkbox"
                          checked={conversionType === "count"}
                          onChange={handleConversionType}
                          className="appearance-none border w-4 h-4 rounded-sm checked:bg-[#0071BC] checked:border-[#0071BC] focus:outline-none"
                        />
                      </div>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <div className="lg:hidden">
              <button
                className="text-gray-800"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        {isMenuOpen && (
          <div className="lg:hidden px-4 pb-4">
            <div className="flex flex-col gap-4">
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
              <Button
                variant="primary"
                className="text-base font-semibold font-montserrat tracking-wide"
              >
                Saved Searches
              </Button>
              <Button
                variant="outline"
                className="text-base font-semibold font-montserrat"
              >
                Sign-up or Log-in
              </Button>
              <div className="text-center">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild className="bg-white">
                    <Button variant="outline" size="icon">
                      <img src="img/filter_svg.svg" alt="filter" />
                      <span className="sr-only">Toggle theme</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-64 mt-2 p-4 bg-[#000000] border-none text-[#FFFFFF] font-inter font-normal text-base"
                  >
                    <DropdownMenuItem className="flex items-center justify-between">
                      <div>{isBlackTheme ? "Light Theme" : "Black Theme"}</div>
                      <div>
                        <input
                          type="checkbox"
                          checked={isBlackTheme}
                          onChange={handleThemeToggle}
                          className="form-checkbox text-green-600"
                        />
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center justify-between">
                      <div>
                        {conversionType === "count"
                          ? "Currency Value in Million"
                          : "Currency Value in Lacs"}
                      </div>
                      <div>
                        <input
                          type="checkbox"
                          checked={conversionType === "count"}
                          onChange={handleConversionType}
                        />
                      </div>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        )}
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
