import { useEffect, useState } from "react";
import PropertyDetails from "./PropertyDetails";
import { Button } from "./ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { fetchPropertyCount } from "../utlils/fetchApi";
import PropTypes from "prop-types";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import Spinner from "./spinner/Spinner";

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

  const toggleView = () => {
    setViewAll((prev) => !prev);
    window.scrollTo(0, 500);
  };

  const propertyListingKeys = Object.keys(propertyListingData);
  const sortedKeys = propertyListingKeys.sort(
    (a, b) => propertyListingData[b] - propertyListingData[a]
  );
  const displayedData = viewAll ? sortedKeys : sortedKeys.slice(0, 4);

  if (loading) {
    return <Spinner />;
  }
  return (
    <main className="px-4 md:px-8 lg:px-20 xl:px-44">
      <PropertyDetails
        propertyListingData={propertyListingData}
        conversionFunction={conversionFunction}
        propertyCategory={propertyCategory}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6 xl:gap-8">
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
              <Card className="py-4 lg:py-6">
                <CardHeader>
                  <div>
                    <CardTitle className="text-xl lg:text-2xl">
                      {item.title
                        .replace("_", " ")
                        .replace(/\b\w/g, (char) => char.toUpperCase())}
                    </CardTitle>
                  </div>
                  <div>
                    <CardDescription className="text-2xl lg:text-4xl py-2 lg:py-4">
                      {conversionFunction(item.amount)}
                    </CardDescription>
                  </div>
                </CardHeader>
              </Card>
            </div>
          ))}
      </div>

      <div className="flex justify-center py-10 lg:py-20">
        <Button
          className="font-inter text-xl lg:text-2xl font-semibold leading-10 tracking-widest opacity-60 border-2 border-black p-4 lg:p-8"
          variant="ghost"
          onClick={toggleView}
        >
          {viewAll ? "SEE LESS" : "SEE ALL"}
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
