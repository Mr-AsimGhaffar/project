import { useEffect, useState } from "react";
import PropertyDetails from "./PropertyDetails";
import { Button } from "./ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
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

  const toggleView = () => {
    setViewAll((prev) => !prev);
    window.scrollTo(0, 500);
  };

  const propertyListingKeys = Object.keys(propertyListingData);
  const sortedKeys = propertyListingKeys.sort(
    (a, b) => propertyListingData[b] - propertyListingData[a]
  );
  const displayedData = viewAll ? sortedKeys : sortedKeys.slice(0, 4);

  return (
    <main className="px-4 md:px-8 lg:px-20 xl:px-44">
      {loading ? (
        <div className="flex justify-center py-10 lg:py-20">
          <div className="flex justify-center items-center">
            <div className="w-16 h-16 border-8 border-dashed rounded-full animate-spin border-blue-600"></div>
          </div>
        </div>
      ) : (
        <div>
          <PropertyDetails
            propertyListingData={propertyListingData}
            conversionFunction={conversionFunction}
            propertyCategory={propertyCategory}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
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
        </div>
      )}
    </main>
  );
};
PropertyListing.propTypes = {
  conversionFunction: PropTypes.func.isRequired,
  propertyCategory: PropTypes.string.isRequired,
};
export default PropertyListing;
