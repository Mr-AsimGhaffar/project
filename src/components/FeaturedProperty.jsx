import { useEffect, useState } from "react";
import "react-multi-carousel/lib/styles.css";
import { FaAngleDown, FaAngleUp, FaBed } from "react-icons/fa";
import { FaBath } from "react-icons/fa";
import { BiSolidDirections } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { fetchFeaturedProperties } from "../utlils/fetchApi";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import { formatTimeNow } from "../utlils/formatTimeNow";
import Spinner from "./spinner/Spinner";

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
          autoClose: 5000,
        });
        throw error;
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [propertyCategory]);

  const toggleView = () => {
    setShowAll((prev) => !prev);
    window.scrollTo(0, 1000);
  };

  const handleClick = (item) => {
    navigate(`/property/${item.id}`, { state: { id: item.id } });
    window.scrollTo(0, 0);
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="px-4 md:px-20 lg:px-44 bg-[#0071BC] bg-opacity-10">
      <div className="flex justify-center items-center p-10 lg:p-20">
        <div>
          <h1 className="font-montserrat font-bold text-xl sm:text-3xl lg:text-4xl leading-10 tracking-[0.2em] text-[#0071BC] text-center">
            FEATURED PROPERTIES
          </h1>
        </div>
      </div>
      <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-3 font-montserrat">
        {featuredData
          .slice(0, showAll ? featuredData.length : 4)
          .map((item) => (
            <Card key={item.id} className="cursor-pointer">
              <div onClick={() => handleClick(item)}>
                {item.cover_photo_url ? (
                  <img
                    src={item.cover_photo_url}
                    alt="photo"
                    className="w-full h-52 object-fit rounded-t-md"
                  />
                ) : (
                  <img
                    src="/img/NoImage.png"
                    alt="dummy"
                    className="w-full h-52 object-fit rounded-t-md"
                  />
                )}
                <CardHeader>
                  <div>
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-base font-semibold w-[90%]">
                        <span className="font-light text-sm">
                          Added: {formatTimeNow(item.added)}
                        </span>
                      </CardTitle>
                    </div>
                    <div className="py-2 font-semibold">
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
                              <p>{item.area} sqft</p>
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
      <div className="flex justify-center py-10 lg:py-20">
        <Button
          className="font-inter text-xl lg:text-2xl font-semibold leading-10 tracking-widest opacity-60 border-2 border-black p-4 lg:p-8"
          variant="ghost"
          onClick={toggleView}
        >
          {showAll ? "SEE LESS" : "SEE ALL"}
          {showAll ? (
            <FaAngleUp className="ml-2" />
          ) : (
            <FaAngleDown className="ml-2" />
          )}
        </Button>
      </div>
    </div>
  );
}
FeaturedProperty.propTypes = {
  conversionFunction: PropTypes.func.isRequired,
  propertyCategory: PropTypes.string.isRequired,
};
