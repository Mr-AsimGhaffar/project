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
  // const [selectedPropertyType, setSelectedPropertyType] = useState("Home");
  // const [selectedSubProperty, setSelectedSubProperty] = useState(
  //   simpleContext.appState.selectedSubProperty
  // );
  useEffect(() => {
    simpleContext.setAppState((s) => ({
      ...s,
      propertyState: propertyState,
    }));
  }, [simpleContext, propertyState]);

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
              className={`cursor-pointer hover:text-blue-500 ${
                propertyState.selectedPropertyType === "Home" && "text-blue-500"
              }`}
              onClick={() => handlePropertyTypeChange("Home")}
            >
              Home
            </h1>
            <h1
              className={`cursor-pointer hover:text-blue-500 ${
                propertyState.selectedPropertyType === "Plots" &&
                "text-blue-500"
              }`}
              onClick={() => handlePropertyTypeChange("Plots")}
            >
              Plots
            </h1>
            <h1
              className={`cursor-pointer hover:text-blue-500 ${
                propertyState.selectedPropertyType === "Commercial" &&
                "text-blue-500"
              }`}
              onClick={() => handlePropertyTypeChange("Commercial")}
            >
              Commercial
            </h1>
          </div>
          <div>
            {propertyState.selectedPropertyType === "Home" && (
              <Home onSubPropertySelect={handleSubPropertySelect} />
            )}
            {propertyState.selectedPropertyType === "Plots" && (
              <Plots onSubPropertySelect={handleSubPropertySelect} />
            )}
            {propertyState.selectedPropertyType === "Commercial" && (
              <Commercial onSubPropertySelect={handleSubPropertySelect} />
            )}
          </div>
        </SelectContent>
      </Select>
    </div>
  );
};

export default HeaderProperty;
