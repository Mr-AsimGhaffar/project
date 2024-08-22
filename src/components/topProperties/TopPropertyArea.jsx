import { useContext, useState } from "react";
import { appContext } from "../../contexts/Context";
import displayFirstName from "../../utlils/displayFirstName";
import SkeletonCard from "../skeleton/Skeleton";
import { Skeleton } from "../ui/skeleton";
import { Link } from "react-router-dom";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { formatTimeNow } from "../../utlils/formatTimeNow";
import { FaBath, FaBed } from "react-icons/fa";
import { BiSolidDirections } from "react-icons/bi";
import { squareFeetToMarla } from "../../utlils/squareFeetToMarla";
import PropTypes from "prop-types";
import firstLetterUpperCase from "../../utlils/firstLetterUpperCase";

const TopPropertyArea = ({ conversionFunction }) => {
  const simpleContext = useContext(appContext);
  const { topBestProperty, loading, propertyState } = simpleContext.appState;
  const [expandedCards, setExpandedCards] = useState({});

  const handleToggleExpand = (id) => {
    setExpandedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  const displayText =
    propertyState.selectedSubProperty || propertyState.selectedPropertyType;
  const capitalizedText = firstLetterUpperCase(displayText);

  return (
    <div className="py-4">
      <div>
        <p className="font-montserrat text-2xl font-bold">
          <span>{capitalizedText}</span> Properties in{" "}
          <span className="text-[#0071BC] font-semibold">
            {simpleContext.appState.selectedSuggestions
              .map((suggestion) => displayFirstName(suggestion.name))
              .join(", ") || simpleContext.appState.selectedCity}
          </span>
        </p>
      </div>
      <div className="grid md:grid-cols-3 grid-cols-1 gap-6 py-5">
        {loading ? (
          Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="flex items-center justify-center">
              <div className="flex flex-col items-center">
                <SkeletonCard className="h-[125px] w-[250px] rounded-xl bg-gradient-to-br from-blue-200 to-blue-300 animate-pulse" />
                <div className="space-y-2 py-2">
                  <Skeleton className="h-4 w-[250px] bg-gradient-to-r from-green-200 to-green-300 animate-ping" />
                  <Skeleton className="h-4 w-[200px] bg-gradient-to-r from-yellow-200 to-yellow-300 animate-ping" />
                </div>
              </div>
            </div>
          ))
        ) : topBestProperty.length === 0 && simpleContext.appState.isApiCall ? (
          <div className="col-span-3 text-center py-10 text-2xl font-bold">
            No result found. Try again
          </div>
        ) : (
          topBestProperty.map((item) => (
            <Card
              key={item.id}
              className={`relative ${
                expandedCards[item.id] ? "h-auto" : "h-auto"
              }`}
            >
              <Link to={`/property/${item.id}`} state={{ id: item.id }}>
                {item.cover_photo_url ? (
                  <div className="relative">
                    <img
                      src={item.cover_photo_url}
                      alt="photo"
                      className="w-full h-52 object-cover rounded-t-md"
                    />
                    <div className="absolute top-2 left-2 p-2 rounded-full shadow-md text-xs bg-[#0071BC] text-white">
                      {item.type.replace("_", " ")}
                    </div>
                  </div>
                ) : (
                  <img
                    src="/img/NoImage.png"
                    alt="dummy"
                    className="w-full h-52 object-fit rounded-t-md"
                  />
                )}
                <CardHeader>
                  <div>
                    <div className="flex justify-between item-center">
                      <CardTitle className="text-base font-semibold">
                        {item.header}
                      </CardTitle>
                    </div>
                    <div className="py-2">
                      <div>
                        <CardDescription>
                          Added: {formatTimeNow(item.added)}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="py-2">
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
                              <p>{squareFeetToMarla(item.area)}</p>
                            </div>
                          )}
                        </div>
                      </CardDescription>
                    </div>
                    <div className="py-2">
                      <CardDescription className="text-2xl font-bold">
                        {conversionFunction(item.price)} PKR
                      </CardDescription>
                      <CardDescription
                        className={`overflow-hidden ${
                          expandedCards[item.id]
                            ? "line-clamp-none"
                            : "line-clamp-2"
                        }`}
                      >
                        {item.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Link>
              <CardDescription>
                {item.description.length > 100 && (
                  <button
                    onClick={() => handleToggleExpand(item.id)}
                    className="text-sm underline p-6 py-3"
                  >
                    {expandedCards[item.id] ? "See less" : "See more"}
                  </button>
                )}
              </CardDescription>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

TopPropertyArea.propTypes = {
  conversionFunction: PropTypes.func.isRequired,
};

export default TopPropertyArea;
