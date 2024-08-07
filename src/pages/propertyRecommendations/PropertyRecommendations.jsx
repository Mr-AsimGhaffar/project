import PropertyDetailTable from "../../components/PropertyDetailTable";
import PropTypes from "prop-types";

const PropertyRecommendations = ({ conversionFunction, propertyCategory }) => {
  return (
    <div>
      <PropertyDetailTable
        propertyCategory={propertyCategory}
        conversionFunction={conversionFunction}
      />
    </div>
  );
};

PropertyRecommendations.propTypes = {
  conversionFunction: PropTypes.func.isRequired,
  propertyCategory: PropTypes.string.isRequired,
};

export default PropertyRecommendations;
