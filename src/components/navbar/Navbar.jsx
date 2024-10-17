import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useTheme } from "../theme/themeProvider";
import Spinner from "../spinner/Spinner";
import { Link, useLocation } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

const Navbar = ({
  handleDashboardClick,
  setConversionType,
  setPropertyCategory,
  propertyCategory,
}) => {
  const [propertyView, setPropertyView] = useState("for_sale");
  const targetPath = "/propertyRecommendations";
  const location = useLocation();
  const [conversionType, setConversionTypeState] = useState("price");
  const [isLoading, setIsLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { setTheme } = useTheme();
  const [isBlackTheme, setIsBlackTheme] = useState(false);
  useEffect(() => {
    setPropertyView(propertyCategory);
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
      setIsBlackTheme(savedTheme === "dark");
    }
  }, [propertyCategory, setTheme]);

  const handleThemeToggle = () => {
    const newTheme = isBlackTheme ? "light" : "dark";
    setTheme(newTheme);
    setIsBlackTheme(!isBlackTheme);
    localStorage.setItem("theme", newTheme);
  };
  const handleDropdownClick = () => {
    // Toggle the theme when the dropdown is clicked
    handleThemeToggle();
  };
  const handleConversionTypeClick = () => {
    handleConversionType();
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

  const isActive = location.pathname === targetPath;

  return (
    <div>
      <nav className="dark:bg-black shadow-lg fixed w-full z-10 bg-white">
        <div className="px-4 md:px-44">
          <div className="flex items-center justify-between h-16">
            <div className="w-[20%] hidden lg:flex items-center gap-4 opacity-80">
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
              <Link to="/propertyRecommendations">
                <Button
                  variant="primary"
                  className={`rounded-md text-base font-semibold font-montserrat ${
                    isActive ? "text-[#0071BC]" : ""
                  }`}
                  disabled={isActive}
                >
                  Best Property
                </Button>
              </Link>
            </div>
            <Link
              to="/dashboard"
              onClick={handleDashboardClick}
              className="w-[60%]"
            >
              <div className="flex justify-center items-center gap-1">
                <div>
                  <img
                    src="/img/website_logo.svg"
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

            <div className="w-[20%] hidden lg:flex items-center gap-4 opacity-80 justify-end">
              <div>
                <Popover>
                  <PopoverTrigger asChild className="bg-white border-none">
                    <Button variant="outline" size="icon">
                      <img
                        src="/img/filter_svg.svg"
                        alt="filter"
                        width={16}
                        height={16}
                      />
                      <span className="sr-only">Toggle theme</span>
                    </Button>
                  </PopoverTrigger>

                  <PopoverContent
                    align="end"
                    className="w-64 mt-2 p-4 bg-[#000000] border-none text-[#FFFFFF] font-inter font-normal text-base"
                  >
                    <Button
                      onClick={handleDropdownClick}
                      className="w-full flex items-center justify-between bg-black dark:text-white"
                    >
                      <div>{isBlackTheme ? "Light Theme" : "Black Theme"}</div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={isBlackTheme}
                          onChange={handleThemeToggle}
                          className="appearance-none border w-4 h-4 rounded-sm checked:bg-[#0071BC] checked:border-[#0071BC] focus:outline-none"
                        />
                      </div>
                    </Button>
                    <Button
                      onClick={handleConversionTypeClick}
                      className="w-full flex items-center justify-between bg-black dark:text-white"
                    >
                      <div>
                        {conversionType === "count"
                          ? "Currency Value in Million"
                          : "Currency Value in Lacs"}
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={conversionType === "count"}
                          onChange={handleConversionType}
                          className="appearance-none border w-4 h-4 rounded-sm checked:bg-[#0071BC] checked:border-[#0071BC] focus:outline-none"
                        />
                      </div>
                    </Button>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <div className="lg:hidden">
              <button
                className="text-gray-800 dark:text-[#0071BC]"
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
              <div className="text-center">
                <Link to="/propertyRecommendations">
                  <Button
                    variant="primary"
                    className={`rounded-md text-base font-semibold font-montserrat ${
                      isActive ? "text-[#0071BC]" : ""
                    }`}
                    disabled={isActive}
                  >
                    Best Property
                  </Button>
                </Link>
              </div>
              <div className="text-center">
                <Popover>
                  <PopoverTrigger asChild className="bg-white border-none">
                    <Button variant="outline" size="icon">
                      <img
                        src="/img/filter_svg.svg"
                        alt="filter"
                        width={16}
                        height={16}
                      />
                      <span className="sr-only">Toggle theme</span>
                    </Button>
                  </PopoverTrigger>

                  <PopoverContent
                    align="end"
                    className="w-64 mt-2 p-4 bg-[#000000] border-none text-[#FFFFFF] font-inter font-normal text-base"
                  >
                    <Button
                      onClick={handleDropdownClick}
                      className="w-full flex items-center justify-between bg-black dark:text-white"
                    >
                      <div>{isBlackTheme ? "Light Theme" : "Black Theme"}</div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={isBlackTheme}
                          onChange={handleThemeToggle}
                          className="appearance-none border w-4 h-4 rounded-sm checked:bg-[#0071BC] checked:border-[#0071BC] focus:outline-none"
                        />
                      </div>
                    </Button>
                    <Button
                      onClick={handleConversionTypeClick}
                      className="w-full flex items-center justify-between bg-black dark:text-white"
                    >
                      <div>
                        {conversionType === "count"
                          ? "Currency Value in Million"
                          : "Currency Value in Lacs"}
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={conversionType === "count"}
                          onChange={handleConversionType}
                          className="appearance-none border w-4 h-4 rounded-sm checked:bg-[#0071BC] checked:border-[#0071BC] focus:outline-none"
                        />
                      </div>
                    </Button>
                  </PopoverContent>
                </Popover>
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
  propertyCategory: PropTypes.string.isRequired,
};
export default Navbar;
