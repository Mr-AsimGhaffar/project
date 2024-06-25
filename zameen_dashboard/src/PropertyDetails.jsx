import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import PropTypes from "prop-types";
import { formatPrice } from "./utlils/formatPrice";

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
                {formatPrice(totalProperties)}
              </CardDescription>
              <CardDescription>Listed</CardDescription>
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
