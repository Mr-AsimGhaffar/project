import PropertyListing from "@/components/PropertyListing";
import Header from "../components/Header";
import FeaturedProperty from "@/components/FeaturedProperty";
import PropTypes from "prop-types";

const Dashboard = ({
  conversionFunction,
  propertyCategory,
  setPropertyCategory,
}) => {
  return (
    <div>
      <Header
        propertyCategory={propertyCategory}
        setPropertyCategory={setPropertyCategory}
      />
      <PropertyListing
        conversionFunction={conversionFunction}
        propertyCategory={propertyCategory}
      />
      <br />
      <FeaturedProperty
        conversionFunction={conversionFunction}
        propertyCategory={propertyCategory}
      />
    </div>
  );
};
Dashboard.propTypes = {
  conversionFunction: PropTypes.func.isRequired,
  propertyCategory: PropTypes.string.isRequired,
  setPropertyCategory: PropTypes.func.isRequired,
};
export default Dashboard;
