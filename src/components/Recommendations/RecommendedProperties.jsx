import PropTypes from "prop-types";
import { useCallback, useEffect, useState } from "react";
import { fetchRecommendationProperties } from "../../utlils/fetchApi";
import Carousel from "react-multi-carousel";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { formatTimeNow } from "../../utlils/formatTimeNow";
import { FaBath, FaBed, FaChartArea } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import displayFirstName from "../../utlils/displayFirstName";
import SkeletonCard from "../skeleton/Skeleton";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
    slidesToSlide: 4, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

const RecommendedProperties = ({
  RecommendedPropertiesId,
  RecommendedPropertiesLocation,
  conversionFunction,
}) => {
  const navigate = useNavigate();
  const [RecommendedData, SetrecommendedData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRecommendationData = useCallback(async () => {
    try {
      const data = await fetchRecommendationProperties(RecommendedPropertiesId);
      SetrecommendedData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, [RecommendedPropertiesId]);

  useEffect(() => {
    fetchRecommendationData();
  }, [fetchRecommendationData]);

  const handleClick = (item) => {
    navigate(`/property/${item.id}`, { state: { id: item.id } });
    window.scrollTo(0, 0);
  };

  if (loading) {
    return <SkeletonCard />;
  }

  return (
    <div>
      <div>
        <p className="font-montserrat text-[#0071BC] text-2xl p-2 font-bold">
          Recommended Properties around{" "}
          <span>{displayFirstName(RecommendedPropertiesLocation)}</span>
        </p>
      </div>
      <div className="p-3 cursor-pointer">
        <Carousel responsive={responsive}>
          {RecommendedData.map((item) => (
            <Card key={item.id} className="m-4">
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
                    <div className="py-2 font-bold">
                      <CardDescription>
                        PKR {conversionFunction(item.price)}
                      </CardDescription>
                      <CardDescription className="truncate">
                        {item.sub_location}
                      </CardDescription>
                      <CardDescription>
                        <div className="flex justify-left gap-3 text-xs mt-4">
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
                              <FaChartArea />
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
        </Carousel>
      </div>
    </div>
  );
};

RecommendedProperties.propTypes = {
  RecommendedPropertiesId: PropTypes.number.isRequired,
  RecommendedPropertiesLocation: PropTypes.string.isRequired,
  conversionFunction: PropTypes.func.isRequired,
};

export default RecommendedProperties;
