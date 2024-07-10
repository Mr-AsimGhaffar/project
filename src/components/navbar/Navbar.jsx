import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useState } from "react";

const Navbar = ({
  handleDashboardClick,
  setConversionType,
  setPropertyCategory,
}) => {
  const [propertyView, setPropertyView] = useState("For Sale");

  const handlePropertyView = (category) => {
    setPropertyView(category);
    setPropertyCategory(category);
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
                className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
                onClick={() => setConversionType("count")}
              >
                Lacs
              </button>
              <button
                className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
                onClick={() => setConversionType("price")}
              >
                Million
              </button>
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
    </div>
  );
};
Navbar.propTypes = {
  handleDashboardClick: PropTypes.func.isRequired,
  setConversionType: PropTypes.func.isRequired,
  setPropertyCategory: PropTypes.func.isRequired,
};
export default Navbar;
