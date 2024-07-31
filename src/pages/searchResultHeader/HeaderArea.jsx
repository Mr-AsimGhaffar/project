import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { appContext } from "@/contexts/Context";
import { useContext, useState } from "react";
import { saveToLocalStorage } from "@/utlils/SaveLocalStorage";

const marlaToSquareFeet = (marla) => {
  return marla * 225;
};

const squareFeetToMarla = (marla) => {
  return marla / 225;
};

const AreaTag = () => {
  const simpleContext = useContext(appContext);
  const [selectedAreaMin, setSelectedAreaMin] = useState(
    squareFeetToMarla(simpleContext.appState.selectedAreaMin)
  );
  const [selectedAreaMax, setSelectedAreaMax] = useState(
    squareFeetToMarla(simpleContext.appState.selectedAreaMax)
  );
  const [selectedMinButton, setSelectedMinButton] = useState(null);
  const [selectedMaxButton, setSelectedMaxButton] = useState(null);

  const handleSelectMaxButton = (area, buttonIndex) => {
    const newValue = area;
    setSelectedAreaMax(newValue);
    setSelectedMaxButton(buttonIndex);
    simpleContext.setAppState((s) => ({
      ...s,
      selectedAreaMax: marlaToSquareFeet(newValue),
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
      <Select>
        <SelectTrigger className="rounded-3xl border-2">
          <SelectValue placeholder="AREA" />
          <div>{selectedAreaMin}</div>
          <div>To</div>
          <div>{selectedAreaMax}</div>
        </SelectTrigger>
        <SelectContent>
          <div className="rounded-md shadow-lg p-4 w-64">
            <Button className="mb-4 w-[100%]" variant="secondary">
              Change area unit (Marla)
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
                  onClick={() => handleSelectMinButton("2", 1)}
                >
                  2
                </Button>
                <Button
                  variant="outline"
                  className={buttonStyles(selectedMaxButton === 1)}
                  onClick={() => handleSelectMaxButton("2", 1)}
                >
                  2
                </Button>
                <Button
                  variant="outline"
                  className={buttonStyles(selectedMinButton === 2)}
                  onClick={() => handleSelectMinButton("3", 2)}
                >
                  3
                </Button>
                <Button
                  variant="outline"
                  className={buttonStyles(selectedMaxButton === 2)}
                  onClick={() => handleSelectMaxButton("3", 2)}
                >
                  3
                </Button>
                <Button
                  variant="outline"
                  className={buttonStyles(selectedMinButton === 3)}
                  onClick={() => handleSelectMinButton("5", 3)}
                >
                  5
                </Button>
                <Button
                  variant="outline"
                  className={buttonStyles(selectedMaxButton === 3)}
                  onClick={() => handleSelectMaxButton("5", 3)}
                >
                  5
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

export default AreaTag;
