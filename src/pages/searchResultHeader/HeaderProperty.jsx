import { useContext, useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { saveToLocalStorage } from "@/utlils/SaveLocalStorage";
import { appContext } from "@/contexts/Context";
import Plots from "../../components/headerComponent/property_type/Plots";
import Commercial from "../../components/headerComponent/property_type/Commercial";
import Home from "../../components/headerComponent/property_type/Home";

const HeaderProperty = () => {
  const simpleContext = useContext(appContext);
  const [propertyState, setPropertyState] = useState({
    selectedPropertyType:
      simpleContext.appState.propertyState.selectedPropertyType,
    selectedSubProperty:
      simpleContext.appState.propertyState.selectedSubProperty,
  });
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
      ? "text-gray-800 border-b-2 border-gray-800"
      : "hover:text-blue-500 cursor-pointer";

  return (
    <div>
      <Select>
        <SelectTrigger className="rounded-3xl border-2">
          <SelectValue placeholder="PROPERTY TYPE" />
          <div>
            {propertyState.selectedSubProperty ||
              propertyState.selectedPropertyType}
          </div>
        </SelectTrigger>
        <SelectContent className="w-[100%]">
          <div className="flex justify-between items-center p-5">
            <h1
              className={getPropertyTypeStyle("Home")}
              onClick={() => handlePropertyTypeChange("home")}
            >
              Home
            </h1>
            <h1
              className={getPropertyTypeStyle("Plots")}
              onClick={() => handlePropertyTypeChange("plot")}
            >
              Plots
            </h1>
            <h1
              className={getPropertyTypeStyle("Commercial")}
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
        </SelectContent>
      </Select>
    </div>
  );
};

export default HeaderProperty;
