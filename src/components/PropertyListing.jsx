import { useEffect, useState } from "react";
import PropertyDetails from "./PropertyDetails";
import { Button } from "./ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { priceConversion } from "@/utlils/priceConversion";
import SkeletonCard from "./skeleton/Skeleton";

const API_URL = import.meta.env.VITE_API_URL;

const PropertyListing = () => {
  const [propertyListingData, setPropertyListingData] = useState({});
  const [viewAll, setViewAll] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${API_URL}/property/count`, {
          method: "get",
          headers: new Headers({
            "ngrok-skip-browser-warning": "69420",
          }),
        });
        const jsonData = await response.json();
        setPropertyListingData(jsonData.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [API_URL]);
  const toggleView = () => {
    setViewAll((prev) => !prev);
  };

  const displayedData = viewAll
    ? Object.keys(propertyListingData)
    : Object.keys(propertyListingData).slice(0, 4);

  if (loading) {
    return <SkeletonCard />;
  }
  return (
    <main>
      <PropertyDetails propertyListingData={propertyListingData} />
      <div className="flex justify-between items-center text-2xl font-bold">
        <div>Property Listings</div>
        <div>
          <Button className="text-lg" variant="link" onClick={toggleView}>
            {viewAll ? "View Less" : "View All"}
          </Button>
        </div>
      </div>
      <div className="grid md:grid-cols-4 gap-6 py-5">
        {displayedData
          .map((item, index) => ({
            id: index,
            title: item,
            amount: propertyListingData[item],
          }))
          .map((item) => (
            <div key={item.id}>
              <Card>
                <CardHeader>
                  <div>
                    <CardTitle>{item.title}</CardTitle>
                  </div>
                  <br />
                  <div>
                    <CardDescription className="text-3xl font-bold">
                      {priceConversion(item.amount)}
                    </CardDescription>
                  </div>
                  <CardDescription>Listed</CardDescription>
                </CardHeader>
              </Card>
            </div>
          ))}
      </div>
    </main>
  );
};

export default PropertyListing;
