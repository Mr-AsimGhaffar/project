import PropTypes from "prop-types";

const PropertyDetails = ({
  propertyListingData,
  conversionFunction,
  propertyCategory,
}) => {
  const totalProperties = Object.values(propertyListingData)
    .map(Number)
    .reduce((total, num) => total + num, 0);

  const displayProperties = () => {
    if (propertyCategory === "for_sale") {
      return conversionFunction(totalProperties);
    } else if (propertyCategory === "for_rent") {
      return conversionFunction(totalProperties);
    } else {
      return "Invalid category";
    }
  };

  return (
    <main>
      <div className="px-4 md:px-20 lg:px-44">
        <h1 className="font-montserrat font-bold text-3xl lg:text-5xl leading-10 tracking-widest text-[#0071BC] text-center py-10 lg:py-20">
          TOTAL PROPERTIES : {displayProperties()}
        </h1>
      </div>
    </main>
  );
};

PropertyDetails.propTypes = {
  propertyListingData: PropTypes.object.isRequired,
  conversionFunction: PropTypes.func.isRequired,
  propertyCategory: PropTypes.string.isRequired,
};

export default PropertyDetails;
