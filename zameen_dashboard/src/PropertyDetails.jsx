import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import PropTypes from "prop-types";

const PropertyDetails = ({ propertyListingData }) => {
  console.log(propertyListingData);
  const totalProperties = Object.values(propertyListingData)
    .map(Number)
    .reduce((total, num) => total + num, 0);
  // const commercialPropertiesCount = propertyListingData["Commercial Plot"] || 0;
  // const totalPlotsCount = propertyListingData["Residential Plot"] || 0;

  return (
    <main>
      <div className="grid grid-cols-3 gap-6 py-5">
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Total Properties</CardTitle>
              <br />
              <CardDescription className="text-3xl font-bold">
                {totalProperties}
              </CardDescription>
              <CardDescription>Listed</CardDescription>
            </CardHeader>
          </Card>
        </div>
        {/* <div>
          <Card>
            <CardHeader>
              <CardTitle>Commercial Plots</CardTitle>
              <br />
              <CardDescription className="text-3xl font-bold">
                {commercialPropertiesCount}
              </CardDescription>
              <CardDescription>Listed</CardDescription>
            </CardHeader>
          </Card>
        </div> */}
        {/* <div>
          <Card>
            <CardHeader>
              <CardTitle>Residential Plots</CardTitle>
              <br />
              <CardDescription className="text-3xl font-bold">
                {totalPlotsCount}
              </CardDescription>
              <CardDescription>Listed</CardDescription>
            </CardHeader>
          </Card>
        </div> */}
      </div>
    </main>
  );
};

PropertyDetails.propTypes = {
  propertyListingData: PropTypes.object.isRequired,
};

export default PropertyDetails;
