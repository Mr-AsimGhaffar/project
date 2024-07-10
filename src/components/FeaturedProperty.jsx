import { useEffect, useState } from "react";
import "react-multi-carousel/lib/styles.css";
import { FaBed } from "react-icons/fa";
import { FaBath } from "react-icons/fa";
import { BiSolidDirections } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { formatTimeFromNow } from "@/utlils/UnixEpochTimeConverter";
import { convertMarlaToSquareFeet } from "@/utlils/marlaToSquareFeet";
import SkeletonCard from "./skeleton/Skeleton";
import { fetchFeaturedProperties } from "../utlils/fetchApi";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

export default function FeaturedProperty({
  conversionFunction,
  propertyCategory,
}) {
  const [featuredData, setfeaturedData] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchFeaturedProperties(propertyCategory);
        setfeaturedData(data);
      } catch (error) {
        const errorMessage =
          error.message || "Failed to fetch featured properties.";
        console.error("Error fetching featured properties:", errorMessage);
        toast.error(errorMessage, {
          position: "top-center",
          autoClose: 10000,
        });
        throw error;
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [propertyCategory]);

  const handleViewAll = () => setShowAll(true);
  const handleViewLess = () => setShowAll(false);
  const handleClick = (item) => {
    navigate(`/property/${item.id}`, { state: { id: item.id } });
    window.scrollTo(0, 0);
  };

  if (loading) {
    return <SkeletonCard />;
  }

  return (
    <div>
      <div className="flex justify-between items-center text-2xl font-bold">
        <div>Featured Properties</div>
        <div>
          {showAll ? (
            <Button className="text-lg" variant="link" onClick={handleViewLess}>
              View Less
            </Button>
          ) : (
            <Button className="text-lg" variant="link" onClick={handleViewAll}>
              View All
            </Button>
          )}
        </div>
      </div>
      <div className="grid md:grid-cols-4 gap-6 py-5">
        {featuredData
          .slice(0, showAll ? featuredData.length : 4)
          .map((item) => (
            <Card key={item.id} className="cursor-pointer">
              <div onClick={() => handleClick(item)}>
                {item.cover_photo_url && (
                  <img
                    src={item.cover_photo_url}
                    alt="photo"
                    className="w-full h-52 object-fit rounded-t-md"
                  />
                )}
                <CardHeader>
                  <div>
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-base font-semibold w-[90%]">
                        <span className="font-light text-sm">
                          Added: {formatTimeFromNow(item.added)}
                        </span>
                      </CardTitle>
                    </div>
                    <div className="py-2 font-bold">
                      <CardDescription>
                        PKR {conversionFunction(item.price)}
                      </CardDescription>
                      <CardDescription className="truncate">
                        {item.location}
                      </CardDescription>
                      <br />
                      <CardDescription>
                        <div className="flex justify-left gap-3 text-xs">
                          {item.bedroom && (
                            <div className="flex flex-row items-center gap-1">
                              <FaBed />
                              <p>{item.bedroom}</p>
                            </div>
                          )}
                          {item.bath && (
                            <div className="flex flex-row items-center gap-1">
                              <FaBath />
                              <p>{item.bath}</p>
                            </div>
                          )}
                          {item.area && (
                            <div className="flex flex-row items-center gap-1">
                              <BiSolidDirections />
                              <p>
                                {convertMarlaToSquareFeet(
                                  item.area.split(" ")[0]
                                )}{" "}
                                sqft
                              </p>
                            </div>
                          )}
                        </div>
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </div>
            </Card>
          ))}
      </div>
    </div>
  );
}
FeaturedProperty.propTypes = {
  conversionFunction: PropTypes.func.isRequired,
  propertyCategory: PropTypes.string.isRequired,
};
