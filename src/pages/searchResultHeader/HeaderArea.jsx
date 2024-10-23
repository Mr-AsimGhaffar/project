import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { appContext } from "@/contexts/Context";
import { useContext, useEffect, useState } from "react";
import {
  saveToLocalStorage,
  getFromLocalStorage,
} from "@/utlils/SaveLocalStorage";
import { IoIosArrowDown } from "react-icons/io";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover";
import { useLocation } from "react-router-dom";
import { GrPowerReset } from "react-icons/gr";

const marlaToSquareFeet = (marla) => {
  return marla * 225;
};

const squareFeetToMarla = (marla) => {
  if (marla == null) {
    return marla;
  } else {
    return marla / 225;
  }
};

const AreaTag = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const simpleContext = useContext(appContext);
  const location = useLocation();
  const [selectedAreaMin, setSelectedAreaMin] = useState(
    squareFeetToMarla(simpleContext.appState.selectedAreaMin)
  );
  const [selectedAreaMax, setSelectedAreaMax] = useState(
    squareFeetToMarla(simpleContext.appState.selectedAreaMax)
  );

  const { selectedAreaMinButton, selectedAreaMaxButton } =
    simpleContext.appState;

  useEffect(() => {
    simpleContext.setAppState((s) => ({
      ...s,
      selectedAreaMinButton: selectedAreaMinButton,
      selectedAreaMaxButton: selectedAreaMaxButton,
    }));
  }, [selectedAreaMinButton, selectedAreaMaxButton]);

  const areaOptions = ["2", "3", "5", "8", "10", "15", "20", "30", "40"];

  // Sync local state with appState on mount
  useEffect(() => {
    const savedMinButton = getFromLocalStorage("selectedAreaMinButton");
    const savedMaxButton = getFromLocalStorage("selectedAreaMaxButton");

    if (savedMinButton !== null) {
      simpleContext.setAppState((s) => ({
        ...s,
        selectedAreaMinButton: savedMinButton,
      }));
    }
    if (savedMaxButton !== null) {
      simpleContext.setAppState((s) => ({
        ...s,
        selectedAreaMaxButton: savedMaxButton,
      }));
    }
    setSelectedAreaMin(
      squareFeetToMarla(simpleContext.appState.selectedAreaMin)
    );
    setSelectedAreaMax(
      squareFeetToMarla(simpleContext.appState.selectedAreaMax)
    );
  }, [
    simpleContext.appState.selectedAreaMin,
    simpleContext.appState.selectedAreaMax,
  ]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const minAreaFromUrl = params.get("area_min");
    const maxAreaFromUrl = params.get("area_max");

    if (minAreaFromUrl) {
      setSelectedAreaMin(squareFeetToMarla(minAreaFromUrl));
      simpleContext.setAppState((s) => ({
        ...s,
        selectedAreaMin: minAreaFromUrl,
      }));
    }
    if (maxAreaFromUrl) {
      setSelectedAreaMax(squareFeetToMarla(maxAreaFromUrl));
      simpleContext.setAppState((s) => ({
        ...s,
        selectedAreaMax: maxAreaFromUrl,
      }));
    }
  }, []);

  const handleSelectMaxButton = (area, buttonIndex) => {
    const newValue = area === "Any" ? null : area;
    if (selectedAreaMaxButton === buttonIndex) {
      setSelectedAreaMax(null);
      simpleContext.setAppState((s) => ({
        ...s,
        selectedAreaMax: null,
        selectedAreaMaxButton: null,
      }));
      saveToLocalStorage("selectedAreaMax", null);
      saveToLocalStorage("selectedAreaMaxButton", null);
    } else {
      setSelectedAreaMax(newValue);
      simpleContext.setAppState((s) => ({
        ...s,
        selectedAreaMax: newValue ? marlaToSquareFeet(newValue) : null,
        selectedAreaMaxButton: buttonIndex,
      }));
      saveToLocalStorage("selectedAreaMax", newValue);
      saveToLocalStorage("selectedAreaMaxButton", buttonIndex);
    }
  };

  const handleSelectMinButton = (area, buttonIndex) => {
    const newValue = area;
    if (selectedAreaMinButton === buttonIndex) {
      setSelectedAreaMin(null);
      simpleContext.setAppState((s) => ({
        ...s,
        selectedAreaMin: null,
        selectedAreaMinButton: null,
      }));
      saveToLocalStorage("selectedAreaMin", null);
      saveToLocalStorage("selectedAreaMinButton", null);
    } else {
      setSelectedAreaMin(newValue);
      simpleContext.setAppState((s) => ({
        ...s,
        selectedAreaMin: marlaToSquareFeet(newValue),
        selectedAreaMinButton: buttonIndex,
      }));
      saveToLocalStorage("selectedAreaMin", newValue);
      saveToLocalStorage("selectedAreaMinButton", buttonIndex);
    }
  };
  const handleMinChangeArea = (e) => {
    let newValue = e.target.value;
    const isDigitsOnly = (str) => /^[\d,]+$/.test(str);
    if (!isDigitsOnly(newValue)) return;

    newValue = newValue.replace(/,/g, "");
    let parsedValue = parseInt(newValue, 10);
    if (isNaN(parsedValue)) return;
    newValue = parsedValue.toLocaleString();
    const buttonIndex = areaOptions.indexOf(newValue);

    setSelectedAreaMin(newValue);
    simpleContext.setAppState((s) => ({
      ...s,
      selectedAreaMin: marlaToSquareFeet(newValue),
      selectedAreaMinButton: buttonIndex == -1 ? null : buttonIndex,
    }));
    saveToLocalStorage("selectedAreaMin", newValue);
    saveToLocalStorage(
      "selectedAreaMinButton",
      buttonIndex === -1 ? null : buttonIndex
    );
  };
  const handleMaxChangeArea = (e) => {
    let newValue = e.target.value;
    const isDigitsOnly = (str) => /^[\d,]+$/.test(str);
    if (!isDigitsOnly(newValue)) return;

    newValue = newValue.replace(/,/g, "");
    let parsedValue = parseInt(newValue, 10);
    if (isNaN(parsedValue)) return;
    newValue = parsedValue.toLocaleString();
    const buttonIndex = areaOptions.indexOf(newValue);

    setSelectedAreaMax(newValue);

    simpleContext.setAppState((s) => ({
      ...s,
      selectedAreaMax: marlaToSquareFeet(newValue),
      selectedAreaMaxButton: buttonIndex == -1 ? null : buttonIndex,
    }));
    saveToLocalStorage("selectedAreaMax", newValue);
    saveToLocalStorage(
      "selectedAreaMaxButton",
      buttonIndex === -1 ? null : buttonIndex
    );
  };

  const handleReset = () => {
    setSelectedAreaMin(null);
    setSelectedAreaMax(null);
    simpleContext.setAppState((s) => ({
      ...s,
      selectedAreaMin: null,
      selectedAreaMax: null,
      selectedAreaMinButton: null,
      selectedAreaMaxButton: null,
    }));
    saveToLocalStorage("selectedAreaMin", null);
    saveToLocalStorage("selectedAreaMax", null);
    saveToLocalStorage("selectedAreaMinButton", null);
    saveToLocalStorage("selectedAreaMaxButton", null);
  };

  // Filter Min and Max price options based on selection
  const filteredMinOptions = areaOptions.filter((price) => {
    if (selectedAreaMax === null) return true; // No Max selected, show all Min
    // Ensure price and selectedAreaMax are strings before calling replace
    return (
      parseInt(price.replace(/,/g, "")) <=
      (typeof selectedAreaMax === "string"
        ? parseInt(selectedAreaMax.replace(/,/g, ""))
        : selectedAreaMax)
    );
  });

  const filteredMaxOptions = areaOptions.filter((price) => {
    if (selectedAreaMin === null) return true; // No Min selected, show all Max
    // Ensure price and selectedAreaMin are strings before calling replace
    return (
      parseInt(price.replace(/,/g, "")) >=
      (typeof selectedAreaMin === "string"
        ? parseInt(selectedAreaMin.replace(/,/g, ""))
        : selectedAreaMin)
    );
  });

  useEffect(() => {
    if (selectedAreaMax === null) {
      // Reset only if the current selectedPriceMaxButton is not already null
      if (selectedAreaMaxButton !== null) {
        simpleContext.setAppState((s) => ({
          ...s,
          selectedAreaMaxButton: null,
        }));
        saveToLocalStorage("selectedAreaMaxButton", null);
      }
    } else if (filteredMaxOptions.length) {
      const newIndex = filteredMaxOptions.indexOf(selectedAreaMax);
      const updatedIndex = newIndex !== -1 ? newIndex : null;

      // Only update state if the new index is different from the current state
      if (updatedIndex !== selectedAreaMaxButton && updatedIndex !== null) {
        simpleContext.setAppState((s) => ({
          ...s,
          selectedAreaMaxButton: updatedIndex,
        }));
        saveToLocalStorage("selectedAreaMaxButton", updatedIndex);
      }
    }
  }, [
    filteredMaxOptions,
    selectedAreaMax,
    selectedAreaMaxButton,
    simpleContext.setAppState,
  ]);

  const buttonStyles = (isSelected) =>
    isSelected ? "bg-gray-800 dark:bg-gray-800 text-white" : "";

  return (
    <div>
      <Popover
        onOpenChange={(open) => setIsDropdownOpen(open)}
        open={isDropdownOpen}
      >
        <PopoverTrigger asChild className="rounded-3xl border-2">
          <Button className="w-full bg-white text-black focus:bg-white active:bg-white hover:bg-white dark:bg-black dark:text-white">
            <div className="flex justify-between items-center w-full">
              <p>AREA</p>
              <div>{selectedAreaMin === null ? "0" : selectedAreaMin}</div>
              <div>To</div>
              <div>{selectedAreaMax === null ? "Any" : selectedAreaMax}</div>
              <div>
                <IoIosArrowDown />
              </div>
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="dark:bg-black">
          <div className="rounded-md shadow-lg p-4 w-64 h-96 overflow-auto">
            <div className="flex justify-between gap-2 mb-2">
              <div>
                <Button className="rounded-3xl text-xs" variant="secondary">
                  Area unit (Marla)
                </Button>
              </div>
              <div>
                <Button
                  variant="outline"
                  className="rounded-3xl text-xs dark:bg-black"
                  onClick={handleReset}
                >
                  <div className="flex items-center gap-2">
                    Reset
                    <GrPowerReset />
                  </div>
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <div className="text-xs font-semibold text-gray-500 mb-1">
                  MIN:
                </div>
                <Input
                  type="number"
                  className="text-center dark:bg-black"
                  placeholder="0"
                  value={selectedAreaMin || ""}
                  onChange={handleMinChangeArea}
                />
              </div>
              <div>
                <div className="text-xs font-semibold text-gray-500 mb-1">
                  MAX:
                </div>
                <Input
                  type="number"
                  className="text-center dark:bg-black"
                  placeholder="Any"
                  value={selectedAreaMax || ""}
                  onChange={handleMaxChangeArea}
                />
              </div>
            </div>
            <div className="border-t border-gray-200 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  {filteredMinOptions.map((area, index) => (
                    <Button
                      key={`min-${index}`}
                      variant="outline"
                      className={`${buttonStyles(
                        selectedAreaMinButton === index
                      )} w-[100%] mb-2`}
                      onClick={() => handleSelectMinButton(area, index)}
                    >
                      {area}
                    </Button>
                  ))}
                </div>
                <div>
                  {filteredMaxOptions.map((area, index) => (
                    <Button
                      key={`max-${index}`}
                      variant="outline"
                      className={`${buttonStyles(
                        selectedAreaMaxButton === index
                      )} w-[100%] mb-2`}
                      onClick={() => handleSelectMaxButton(area, index)}
                    >
                      {area}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default AreaTag;
