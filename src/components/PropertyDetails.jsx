import PropTypes from "prop-types";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";

const PropertyDetails = ({
  propertyListingData,
  conversionFunction,
  propertyCategory,
}) => {
  const totalProperties = Object.values(propertyListingData)
    .map(Number)
    .reduce((total, num) => total + num, 0);

  const displayProperties = () => {
    if (propertyCategory === "For Sale") {
      return conversionFunction(totalProperties);
    } else if (propertyCategory === "For Rent") {
      return conversionFunction(totalProperties);
    } else {
      return "Invalid category";
    }
  };

  return (
    <main>
      <div className="grid md:grid-cols-3 gap-6 py-5">
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Total Properties</CardTitle>
              <br />
              <CardDescription className="text-3xl font-bold">
                {displayProperties()}
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
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
