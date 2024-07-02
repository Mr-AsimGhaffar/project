import PropTypes from "prop-types";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { priceConversion } from "@/utlils/priceConversion";

const PropertyDetails = ({ propertyListingData }) => {
  const totalProperties = Object.values(propertyListingData)
    .map(Number)
    .reduce((total, num) => total + num, 0);

  return (
    <main>
      <div className="grid md:grid-cols-3 gap-6 py-5">
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Total Properties</CardTitle>
              <br />
              <CardDescription className="text-3xl font-bold">
                {priceConversion(totalProperties)}
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
};

export default PropertyDetails;
