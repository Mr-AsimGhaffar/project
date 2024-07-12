import { useContext, useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Home from "./Home";
import Plots from "./Plots";
import Commercial from "./Commercial";
import { appContext } from "@/contexts/Context";
import { saveToLocalStorage } from "@/utlils/SaveLocalStorage";

const PropertyTag = () => {
  const [propertyState, setPropertyState] = useState({
    selectedPropertyType: "Home",
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
      ? "text-gray-800"
      : "hover:text-blue-500 cursor-pointer";

  return (
    <div>
      <Select>
        <SelectTrigger>
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
              onClick={() => handlePropertyTypeChange("Home")}
            >
              Home
            </h1>
            <h1
              className={getPropertyTypeStyle("Plots")}
              onClick={() => handlePropertyTypeChange("Plots")}
            >
              Plots
            </h1>
            <h1
              className={getPropertyTypeStyle("Commercial")}
              onClick={() => handlePropertyTypeChange("Commercial")}
            >
              Commercial
            </h1>
          </div>
          <div>
            {propertyState.selectedPropertyType === "Home" && (
              <Home
                selectedSubProperty={propertyState.selectedSubProperty}
                onSubPropertySelect={handleSubPropertySelect}
              />
            )}
            {propertyState.selectedPropertyType === "Plots" && (
              <Plots
                selectedSubProperty={propertyState.selectedSubProperty}
                onSubPropertySelect={handleSubPropertySelect}
              />
            )}
            {propertyState.selectedPropertyType === "Commercial" && (
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

export default PropertyTag;
