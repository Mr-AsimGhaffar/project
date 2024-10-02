import { useContext, useEffect, useState } from "react";
import { saveToLocalStorage } from "@/utlils/SaveLocalStorage";
import { appContext } from "@/contexts/Context";
import Plots from "../../components/headerComponent/property_type/Plots";
import Commercial from "../../components/headerComponent/property_type/Commercial";
import Home from "../../components/headerComponent/property_type/Home";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover";
import { Button } from "../../components/ui/button";
import { IoIosArrowDown } from "react-icons/io";
import { useLocation } from "react-router-dom";

const HeaderProperty = () => {
  const simpleContext = useContext(appContext);
  const location = useLocation();
  const [propertyState, setPropertyState] = useState({
    selectedPropertyType:
      simpleContext.appState.propertyState.selectedPropertyType,
    selectedSubProperty:
      simpleContext.appState.propertyState.selectedSubProperty,
  });

  useEffect(() => {
    setPropertyState(simpleContext.appState.propertyState);
  }, [
    simpleContext.appState.propertyState.selectedPropertyType,
    simpleContext.appState.propertyState.selectedSubProperty,
  ]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const selectPropertyTypeFromUrl = params.get("propertyType");
    const selectSubPropertyTypeFromUrl = params.get("subPropertyType");

    if (
      (selectPropertyTypeFromUrl &&
        selectPropertyTypeFromUrl !== propertyState.selectedPropertyType) ||
      (selectSubPropertyTypeFromUrl &&
        selectSubPropertyTypeFromUrl !== propertyState.selectedSubProperty)
    ) {
      setPropertyState((prevState) => ({
        ...prevState,
        selectedPropertyType:
          selectPropertyTypeFromUrl || prevState.selectedPropertyType,
        selectedSubProperty:
          selectSubPropertyTypeFromUrl || prevState.selectedSubProperty,
      }));

      // Update app state in context
      simpleContext.setAppState((s) => ({
        ...s,
        propertyState: {
          ...s.propertyState,
          selectedPropertyType:
            selectPropertyTypeFromUrl || s.propertyState.selectedPropertyType,
          selectedSubProperty:
            selectSubPropertyTypeFromUrl || s.propertyState.selectedSubProperty,
        },
      }));
    }
  }, []);

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
        <PopoverTrigger
          asChild
          className="rounded-3xl border-2 w-full bg-white text-black focus:bg-white active:bg-white hover:bg-white opacity-80"
        >
          <Button className="w-full">
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

export default HeaderProperty;
