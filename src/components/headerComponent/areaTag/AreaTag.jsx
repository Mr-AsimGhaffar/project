import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { appContext } from "@/contexts/Context";
import { useContext, useState } from "react";
import { saveToLocalStorage } from "@/utlils/SaveLocalStorage";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { IoIosArrowDown } from "react-icons/io";
import { GrPowerReset } from "react-icons/gr";
const marlaToSquareFeet = (marla) => {
  return marla * 225;
};
const AreaTag = () => {
  const [selectedAreaMax, setSelectedAreaMax] = useState(null);
  const [selectedAreaMin, setSelectedAreaMin] = useState(null);
  const [selectedMinButton, setSelectedMinButton] = useState(null);
  const [selectedMaxButton, setSelectedMaxButton] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const simpleContext = useContext(appContext);

  const areaOptions = ["2", "3", "5", "8", "10", "15", "20", "30", "40"];

  const handleSelectMaxButton = (area, buttonIndex) => {
    const newValue = area === "Any" ? null : area;
    if (selectedMaxButton === buttonIndex) {
      setSelectedAreaMax(null);
      setSelectedMaxButton(null);
      simpleContext.setAppState((s) => ({
        ...s,
        selectedAreaMax: null,
      }));
      saveToLocalStorage("selectedAreaMax", null);
    } else {
      setSelectedAreaMax(newValue);
      setSelectedMaxButton(buttonIndex);
      simpleContext.setAppState((s) => ({
        ...s,
        selectedAreaMax: newValue ? marlaToSquareFeet(newValue) : null,
      }));
      saveToLocalStorage("selectedAreaMax", newValue);
    }
  };

  const handleSelectMinButton = (area, buttonIndex) => {
    const newValue = area;
    if (selectedMinButton === buttonIndex) {
      setSelectedAreaMin(null);
      setSelectedMinButton(null);
      simpleContext.setAppState((s) => ({
        ...s,
        selectedAreaMin: null,
      }));
      saveToLocalStorage("selectedAreaMin", null);
    } else {
      setSelectedAreaMin(newValue);
      setSelectedMinButton(buttonIndex);
      simpleContext.setAppState((s) => ({
        ...s,
        selectedAreaMin: marlaToSquareFeet(newValue),
      }));
      saveToLocalStorage("selectedAreaMin", newValue);
    }
  };
  const handleMinChangeArea = (e) => {
    const newValue = e.target.value;
    setSelectedAreaMin(newValue);
    simpleContext.setAppState((s) => ({
      ...s,
      selectedAreaMin: marlaToSquareFeet(newValue),
    }));
    saveToLocalStorage("selectedAreaMin", newValue);
  };
  const handleMaxChangeArea = (e) => {
    const newValue = e.target.value;
    setSelectedAreaMax(newValue);
    simpleContext.setAppState((s) => ({
      ...s,
      selectedAreaMax: marlaToSquareFeet(newValue),
    }));
    saveToLocalStorage("selectedAreaMax", newValue);
  };

  const handleReset = () => {
    setSelectedAreaMin(null);
    setSelectedAreaMax(null);
    setSelectedMinButton(null);
    setSelectedMaxButton(null);
    simpleContext.setAppState((s) => ({
      ...s,
      selectedAreaMin: null,
      selectedAreaMax: null,
    }));
    saveToLocalStorage("selectedAreaMin", null);
    saveToLocalStorage("selectedAreaMax", null);
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

  const buttonStyles = (isSelected) =>
    isSelected ? "bg-gray-800 text-white" : "";

  return (
    <div>
      <Popover
        onOpenChange={(open) => setIsDropdownOpen(open)}
        open={isDropdownOpen}
      >
        <PopoverTrigger asChild>
          <Button className="w-full bg-white text-black focus:bg-white active:bg-white hover:bg-white">
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
        <PopoverContent>
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
                  className="rounded-3xl text-xs"
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
                  className="text-center"
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
                  className="text-center"
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
                        selectedMinButton === index
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
                        selectedMaxButton === index
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
