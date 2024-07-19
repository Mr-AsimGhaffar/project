import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { appContext } from "@/contexts/Context";
import { useContext, useEffect, useState } from "react";
const marlaToSquareFeet = (marla) => {
  return marla * 272.25;
};
const AreaTag = () => {
  const [selectedAreaMax, setSelectedAreaMax] = useState(null);
  const [selectedAreaMin, setSelectedAreaMin] = useState(null);
  const [selectedMinButton, setSelectedMinButton] = useState(null);
  const [selectedMaxButton, setSelectedMaxButton] = useState(null);
  const simpleContext = useContext(appContext);
  useEffect(() => {
    if (selectedAreaMax !== null) {
      const areaMaxInSquareFeet = marlaToSquareFeet(selectedAreaMax);
      simpleContext.setAppState((s) => ({
        ...s,
        selectedAreaMax: areaMaxInSquareFeet,
      }));
    }
  }, [selectedAreaMax]);
  useEffect(() => {
    if (selectedAreaMin !== null) {
      const areaMiInSquareFeet = marlaToSquareFeet(selectedAreaMin);
      simpleContext.setAppState((s) => ({
        ...s,
        selectedAreaMin: areaMiInSquareFeet,
      }));
    }
  }, [selectedAreaMin]);

  const handleSelectMaxButton = (area, buttonIndex) => {
    setSelectedAreaMax(area);
    setSelectedMaxButton(buttonIndex);
  };

  const handleSelectMinButton = (area, buttonIndex) => {
    setSelectedAreaMin(area);
    setSelectedMinButton(buttonIndex);
  };
  const handleMinChangeArea = (e) => setSelectedAreaMin(e.target.value);
  const handleMaxChangeArea = (e) => setSelectedAreaMax(e.target.value);

  const handleReset = () => {
    setSelectedAreaMin(null);
    setSelectedAreaMax(null);
    setSelectedMinButton(null);
    setSelectedMaxButton(null);
  };

  const buttonStyles = (isSelected) =>
    isSelected ? "bg-gray-800 text-white" : "";

  return (
    <div>
      <Select>
        <SelectTrigger>
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
