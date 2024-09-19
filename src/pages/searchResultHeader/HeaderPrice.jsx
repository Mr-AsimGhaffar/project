import { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { saveToLocalStorage } from "@/utlils/SaveLocalStorage";
import { appContext } from "@/contexts/Context";

const HeaderPrice = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const simpleContext = useContext(appContext);
  const [selectedAmountMax, setSelectedAmountMax] = useState(
    simpleContext.appState.selectedAmountMax
  );
  const [selectedAmountMin, setSelectedAmountMin] = useState(
    simpleContext.appState.selectedAmountMin
  );
  const [selectedMinButton, setSelectedMinButton] = useState(null);
  const [selectedMaxButton, setSelectedMaxButton] = useState(null);
  useEffect(() => {
    simpleContext.setAppState((s) => ({
      ...s,
      selectedAmountMax: selectedAmountMax,
    }));
  }, [selectedAmountMax]);

  useEffect(() => {
    simpleContext.setAppState((s) => ({
      ...s,
      selectedAmountMin: selectedAmountMin,
    }));
  }, [selectedAmountMin]);

  const handleSelectMax = (amount, buttonIndex) => {
    const newValue = amount === "Any" ? null : amount;
    setSelectedAmountMax(newValue);
    setSelectedMaxButton(buttonIndex);
    simpleContext.setAppState((s) => ({
      ...s,
      selectedAmountMax: newValue ? newValue : null,
    }));
    saveToLocalStorage("selectedAmountMax", newValue);
  };
  const handleSelectMin = (amount, buttonIndex) => {
    const newValue = amount;
    setSelectedAmountMin(newValue);
    setSelectedMinButton(buttonIndex);
    simpleContext.setAppState((s) => ({
      ...s,
      selectedAmountMin: newValue,
    }));
    saveToLocalStorage("selectedAmountMin", newValue);
  };
  const handleMinChange = (e) => {
    const newValue = e.target.value;
    setSelectedAmountMin(newValue);
    simpleContext.setAppState((s) => ({
      ...s,
      selectedAmountMin: newValue,
    }));
    saveToLocalStorage("selectedAmountMin", newValue);
  };

  const handleMaxChange = (e) => {
    const newValue = e.target.value;
    setSelectedAmountMax(newValue);
    simpleContext.setAppState((s) => ({
      ...s,
      selectedAmountMax: newValue,
    }));
    saveToLocalStorage("selectedAmountMax", newValue);
  };
  const handleReset = () => {
    setSelectedAmountMin(null);
    setSelectedAmountMax(null);
    setSelectedMinButton(null);
    setSelectedMaxButton(null);
  };

  const buttonStyles = (isSelected) =>
    isSelected ? "bg-gray-800 text-white" : "";
  return (
    <div>
      <Select
        className="touch-auto"
        onOpenChange={(open) => setIsDropdownOpen(open)}
        open={isDropdownOpen}
      >
        <SelectTrigger className="rounded-3xl border-2">
          <SelectValue placeholder="PRICE" />

          <div>{selectedAmountMin === null ? "0" : selectedAmountMin}</div>
          <div>To</div>
          <div>{selectedAmountMax === null ? "Any" : selectedAmountMax}</div>
        </SelectTrigger>
        <SelectContent>
          <div className="rounded-md shadow-lg p-4 w-64">
            <div className="flex justify-between items-center mb-4">
              <div className="text-sm font-semibold">PRICE (PKR)</div>
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
                  value={selectedAmountMin || ""}
                  onChange={handleMinChange}
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
                  value={selectedAmountMax || ""}
                  onChange={handleMaxChange}
                />
              </div>
            </div>
            <div className="border-t border-gray-200 py-4">
              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  className={`buttonStyles(selectedMinButton === 0)`}
                  onClick={() => handleSelectMin(0, 0)}
                >
                  0
                </Button>
                <Button
                  variant="outline"
                  className={buttonStyles(selectedMaxButton === 0)}
                  onClick={() => handleSelectMax("Any", 0)}
                >
                  Any
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-4 p-2">
                <Button
                  variant="outline"
                  className={buttonStyles(selectedMinButton === 1)}
                  onClick={() => handleSelectMin("500,000", 1)}
                >
                  500,000
                </Button>
                <Button
                  variant="outline"
                  className={buttonStyles(selectedMaxButton === 1)}
                  onClick={() => handleSelectMax("1,000,000", 1)}
                >
                  1,000,000
                </Button>
                <Button
                  variant="outline"
                  className={buttonStyles(selectedMinButton === 2)}
                  onClick={() => handleSelectMin("2,000,000", 2)}
                >
                  2,000,000
                </Button>
                <Button
                  variant="outline"
                  className={buttonStyles(selectedMaxButton === 2)}
                  onClick={() => handleSelectMax("3,500,000", 2)}
                >
                  3,500,000
                </Button>
                <Button
                  variant="outline"
                  className={buttonStyles(selectedMinButton === 3)}
                  onClick={() => handleSelectMin("5,000,000", 3)}
                >
                  5,000,000
                </Button>
                <Button
                  variant="outline"
                  className={buttonStyles(selectedMaxButton === 3)}
                  onClick={() => handleSelectMax("6,500,000", 3)}
                >
                  6,500,000
                </Button>
                <Button
                  variant="outline"
                  className={buttonStyles(selectedMinButton === 4)}
                  onClick={() => handleSelectMin("8,000,000", 4)}
                >
                  8,000,000
                </Button>
                <Button
                  variant="outline"
                  className={buttonStyles(selectedMaxButton === 4)}
                  onClick={() => handleSelectMax("10,000,000", 4)}
                >
                  10,000,000
                </Button>
                <Button
                  variant="outline"
                  className={buttonStyles(selectedMinButton === 5)}
                  onClick={() => handleSelectMin("12,500,000", 5)}
                >
                  12,500,000
                </Button>
                <Button
                  variant="outline"
                  className={buttonStyles(selectedMaxButton === 5)}
                  onClick={() => handleSelectMax("15,000,000", 5)}
                >
                  15,000,000
                </Button>
                <Button
                  variant="outline"
                  className={buttonStyles(selectedMinButton === 6)}
                  onClick={() => handleSelectMin("17,500,000", 6)}
                >
                  17,500,000
                </Button>
                <Button
                  variant="outline"
                  className={buttonStyles(selectedMaxButton === 6)}
                  onClick={() => handleSelectMax("20,000,000", 6)}
                >
                  20,000,000
                </Button>
                <Button
                  variant="outline"
                  className={buttonStyles(selectedMinButton === 7)}
                  onClick={() => handleSelectMin("25,000,000", 7)}
                >
                  25,000,000
                </Button>
                <Button
                  variant="outline"
                  className={buttonStyles(selectedMaxButton === 7)}
                  onClick={() => handleSelectMax("30,000,000", 7)}
                >
                  30,000,000
                </Button>
                <Button
                  variant="outline"
                  className={buttonStyles(selectedMinButton === 8)}
                  onClick={() => handleSelectMin("40,000,000", 8)}
                >
                  40,000,000
                </Button>
                <Button
                  variant="outline"
                  className={buttonStyles(selectedMaxButton === 8)}
                  onClick={() => handleSelectMax("50,000,000", 8)}
                >
                  50,000,000
                </Button>
                <Button
                  variant="outline"
                  className={buttonStyles(selectedMinButton === 9)}
                  onClick={() => handleSelectMin("75,000,000", 9)}
                >
                  75,000,000
                </Button>
                <Button
                  variant="outline"
                  className={buttonStyles(selectedMaxButton === 9)}
                  onClick={() => handleSelectMax("100,000,000", 9)}
                >
                  100,000,000
                </Button>
                <Button
                  variant="outline"
                  className={buttonStyles(selectedMinButton === 10)}
                  onClick={() => handleSelectMin("200,000,000", 10)}
                >
                  200,000,000
                </Button>
                <Button
                  variant="outline"
                  className={buttonStyles(selectedMaxButton === 10)}
                  onClick={() => handleSelectMax("500,000,000", 10)}
                >
                  500,000,000
                </Button>
                <Button
                  variant="outline"
                  className={buttonStyles(selectedMinButton === 11)}
                  onClick={() => handleSelectMin("1,000,000,000", 11)}
                >
                  1,000,000,000
                </Button>
                <Button
                  variant="outline"
                  className={buttonStyles(selectedMaxButton === 11)}
                  onClick={() => handleSelectMax("5,000,000,000", 11)}
                >
                  5,000,000,000
                </Button>
              </div>
            </div>
            <div className="flex justify-between mt-4">
              <Button variant="outline" onClick={handleReset}>
                Reset
              </Button>
            </div>
          </div>
        </SelectContent>
      </Select>
    </div>
  );
};

export default HeaderPrice;
