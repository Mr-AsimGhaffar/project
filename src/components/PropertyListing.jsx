import { useEffect, useState } from "react";
import PropertyDetails from "./PropertyDetails";
import { Button } from "./ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import SkeletonCard from "./skeleton/Skeleton";
import { fetchPropertyCount } from "../utlils/fetchApi";
import PropTypes from "prop-types";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

const PropertyListing = ({ conversionFunction, propertyCategory }) => {
  const [propertyListingData, setPropertyListingData] = useState({});
  const [viewAll, setViewAll] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchPropertyCount(propertyCategory);
        setPropertyListingData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [propertyCategory]);

  const toggleView = () => setViewAll((prev) => !prev);

  const propertyListingKeys = Object.keys(propertyListingData);
  const displayedData = viewAll
    ? propertyListingKeys
    : propertyListingKeys.slice(0, 4);

  if (loading) {
    return <SkeletonCard />;
  }
  return (
    <main className="px-44">
      <PropertyDetails
        propertyListingData={propertyListingData}
        conversionFunction={conversionFunction}
        propertyCategory={propertyCategory}
      />
      <div className="grid md:grid-cols-4 gap-3">
        {displayedData
          .map((item, index) => ({
            id: index,
            title: item,
            amount: propertyListingData[item],
          }))
          .map((item) => (
            <div
              key={item.id}
              className="font-montserrat font-semibold leading-10 text-center opacity-80"
            >
              <Card className="py-6">
                <CardHeader>
                  <div>
                    <CardTitle className="text-2xl">{item.title}</CardTitle>
                  </div>
                  <div>
                    <CardDescription className="text-4xl py-4">
                      {conversionFunction(item.amount)}
                    </CardDescription>
                  </div>
                </CardHeader>
              </Card>
            </div>
          ))}
      </div>

      <div className="flex justify-center py-20">
        <Button
          className="font-inter text-2xl font-semibold leading-10 tracking-widest opacity-60 border-2 border-black p-8"
          variant="ghost"
          onClick={toggleView}
        >
          {viewAll ? "SEE ALL" : "SEE LESS"}
          {viewAll ? (
            <FaAngleUp className="ml-2" />
          ) : (
            <FaAngleDown className="ml-2" />
          )}
        </Button>
      </div>
    </main>
  );
};
PropertyListing.propTypes = {
  conversionFunction: PropTypes.func.isRequired,
  propertyCategory: PropTypes.string.isRequired,
};
export default PropertyListing;
