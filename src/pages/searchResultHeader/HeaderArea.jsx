import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { appContext } from "@/contexts/Context";
import { useContext, useEffect, useState } from "react";
import { saveToLocalStorage } from "@/utlils/SaveLocalStorage";
import { IoIosArrowDown } from "react-icons/io";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover";
import { useLocation } from "react-router-dom";

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
  const [selectedMinButton, setSelectedMinButton] = useState(null);
  const [selectedMaxButton, setSelectedMaxButton] = useState(null);

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
    setSelectedAreaMax(newValue);
    setSelectedMaxButton(buttonIndex);
    simpleContext.setAppState((s) => ({
      ...s,
      selectedAreaMax: newValue ? marlaToSquareFeet(newValue) : null,
    }));
    saveToLocalStorage("selectedAreaMax", newValue);
  };

  const handleSelectMinButton = (area, buttonIndex) => {
    const newValue = area;
    setSelectedAreaMin(newValue);
    setSelectedMinButton(buttonIndex);
    simpleContext.setAppState((s) => ({
      ...s,
      selectedAreaMin: marlaToSquareFeet(newValue),
    }));
    saveToLocalStorage("selectedAreaMin", newValue);
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

  const buttonStyles = (isSelected) =>
    isSelected ? "bg-gray-800 text-white" : "";

  return (
    <div>
      <Popover
        onOpenChange={(open) => setIsDropdownOpen(open)}
        open={isDropdownOpen}
      >
        <PopoverTrigger asChild className="rounded-3xl border-2">
          <Button className="w-full bg-white text-black focus:bg-white active:bg-white hover:bg-white opacity-80">
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
            <Button className="mb-4 w-[100%]" variant="secondary">
              Area unit (Marla)
            </Button>
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
                <Button
                  variant="outline"
                  className={buttonStyles(selectedMinButton === 0)}
                  onClick={() => handleSelectMinButton(0, 0)}
                >
                  0
                </Button>
                <Button
                  variant="outline"
                  className={buttonStyles(selectedMaxButton === 0)}
                  onClick={() => handleSelectMaxButton("Any", 0)}
                >
                  Any
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-4 p-2">
                <Button
                  variant="outline"
                  className={buttonStyles(selectedMinButton === 1)}
                  onClick={() => handleSelectMinButton("3", 1)}
                >
                  3
                </Button>
                <Button
                  variant="outline"
                  className={buttonStyles(selectedMaxButton === 1)}
                  onClick={() => handleSelectMaxButton("3", 1)}
                >
                  3
                </Button>
                <Button
                  variant="outline"
                  className={buttonStyles(selectedMinButton === 2)}
                  onClick={() => handleSelectMinButton("5", 3)}
                >
                  5
                </Button>
                <Button
                  variant="outline"
                  className={buttonStyles(selectedMaxButton === 2)}
                  onClick={() => handleSelectMaxButton("5", 3)}
                >
                  5
                </Button>
                <Button
                  variant="outline"
                  className={buttonStyles(selectedMinButton === 3)}
                  onClick={() => handleSelectMinButton("7", 3)}
                >
                  7
                </Button>
                <Button
                  variant="outline"
                  className={buttonStyles(selectedMaxButton === 3)}
                  onClick={() => handleSelectMaxButton("7", 3)}
                >
                  7
                </Button>
                <Button
                  variant="outline"
                  className={buttonStyles(selectedMinButton === 4)}
                  onClick={() => handleSelectMinButton("8", 4)}
                >
                  8
                </Button>
                <Button
                  variant="outline"
                  className={buttonStyles(selectedMaxButton === 4)}
                  onClick={() => handleSelectMaxButton("8", 4)}
                >
                  8
                </Button>
                <Button
                  variant="outline"
                  className={buttonStyles(selectedMinButton === 5)}
                  onClick={() => handleSelectMinButton("10", 5)}
                >
                  10
                </Button>
                <Button
                  variant="outline"
                  className={buttonStyles(selectedMaxButton === 5)}
                  onClick={() => handleSelectMaxButton("10", 5)}
                >
                  10
                </Button>
                <Button
                  variant="outline"
                  className={buttonStyles(selectedMinButton === 6)}
                  onClick={() => handleSelectMinButton("20", 6)}
                >
                  20
                </Button>
                <Button
                  variant="outline"
                  className={buttonStyles(selectedMaxButton === 6)}
                  onClick={() => handleSelectMaxButton("20", 6)}
                >
                  20
                </Button>
              </div>
            </div>
            <div className="flex justify-between mt-4">
              <Button variant="outline" onClick={handleReset}>
                Reset
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default AreaTag;
