import PropertyListing from "@/components/PropertyListing";
import Header from "../components/Header";
import FeaturedProperty from "@/components/FeaturedProperty";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const Dashboard = ({
  propertyCategory,
  conversionFunction,
  setPropertyCategory,
}) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Simulate data fetching
    setTimeout(() => {
      setLoading(false);
    }, 2000); // Adjust the timeout as needed
  }, []);
  return (
    <div>
      <Header
        propertyCategory={propertyCategory}
        setPropertyCategory={setPropertyCategory}
      />
      {loading ? (
        <div className="flex justify-center py-10 lg:py-20">
          <div className="flex justify-center items-center">
            <div className="w-16 h-16 border-8 border-dashed rounded-full animate-spin border-blue-600"></div>
          </div>
        </div> // or a skeleton loader component
      ) : (
        <>
          <PropertyListing
            propertyCategory={propertyCategory}
            conversionFunction={conversionFunction}
          />
          <FeaturedProperty
            propertyCategory={propertyCategory}
            conversionFunction={conversionFunction}
          />
        </>
      )}
    </div>
  );
};
Dashboard.propTypes = {
  conversionFunction: PropTypes.func.isRequired,
  propertyCategory: PropTypes.string.isRequired,
  setPropertyCategory: PropTypes.func.isRequired,
};
export default Dashboard;
