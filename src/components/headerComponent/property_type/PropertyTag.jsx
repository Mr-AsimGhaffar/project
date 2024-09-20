import { useContext, useEffect, useState } from "react";
import Home from "./Home";
import Plots from "./Plots";
import Commercial from "./Commercial";
import { appContext } from "@/contexts/Context";
import { saveToLocalStorage } from "@/utlils/SaveLocalStorage";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { Button } from "../../ui/button";
import { IoIosArrowDown } from "react-icons/io";

const PropertyTag = () => {
  const [propertyState, setPropertyState] = useState({
    selectedPropertyType: "home",
    selectedSubProperty: "",
  });
  const simpleContext = useContext(appContext);
  useEffect(() => {
    simpleContext.setAppState((s) => ({
      ...s,
      propertyState: propertyState,
    }));
  }, [propertyState]);

  const handleSubPropertySelect = (subProperty) => {
    const newValue = subProperty;
    setPropertyState((prevState) => ({
      ...prevState,
      selectedSubProperty: newValue,
    }));
    saveToLocalStorage("selectedSubProperty", newValue);
  };

  const handlePropertyTypeChange = (propertyType) => {
    setPropertyState({
      selectedPropertyType: propertyType,
      selectedSubProperty: "",
    });
  };

  const getPropertyTypeStyle = (propertyType) =>
    propertyState.selectedPropertyType === propertyType
      ? "text-[#0071BC] border-b-2 border-[#0071BC] cursor-pointer"
      : "hover:text-blue-500 cursor-pointer";

  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Button className="w-full bg-white text-black focus:bg-white active:bg-white hover:bg-white">
            <div className="flex justify-between items-center w-full">
              <p>PROPERTY TYPE</p>
              <div>
                {propertyState.selectedSubProperty ||
                  propertyState.selectedPropertyType}
              </div>
              <div>
                <IoIosArrowDown />
              </div>
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full">
          <div className="flex justify-between items-center p-5">
            <h1
              className={getPropertyTypeStyle("home")}
              onClick={() => handlePropertyTypeChange("home")}
            >
              Home
            </h1>
            <h1
              className={getPropertyTypeStyle("plot")}
              onClick={() => handlePropertyTypeChange("plot")}
            >
              Plots
            </h1>
            <h1
              className={getPropertyTypeStyle("commercial")}
              onClick={() => handlePropertyTypeChange("commercial")}
            >
              Commercial
            </h1>
          </div>
          <div>
            {propertyState.selectedPropertyType === "home" && (
              <Home
                selectedSubProperty={propertyState.selectedSubProperty}
                onSubPropertySelect={handleSubPropertySelect}
              />
            )}
            {propertyState.selectedPropertyType === "plot" && (
              <Plots
                selectedSubProperty={propertyState.selectedSubProperty}
                onSubPropertySelect={handleSubPropertySelect}
              />
            )}
            {propertyState.selectedPropertyType === "commercial" && (
              <Commercial
                selectedSubProperty={propertyState.selectedSubProperty}
                onSubPropertySelect={handleSubPropertySelect}
              />
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default PropertyTag;
