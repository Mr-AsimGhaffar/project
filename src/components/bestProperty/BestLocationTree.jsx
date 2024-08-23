import { Button } from "@/components/ui/button";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { ChevronRight, ChevronDown } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";

const renderLocationTree = (
  locations,
  handleSelect,
  expandedItems,
  toggleExpand
) => {
  return locations.map((location) => {
    const isExpanded = expandedItems.includes(location.name);
    return (
      <div key={location.id}>
        {location.children && location.children.length > 0 ? (
          <div className="flex flex-col">
            <div
              onClick={() => toggleExpand(location.name)}
              className="flex items-center cursor-pointer space-x-2 py-2 text-sm"
            >
              {isExpanded ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
              <span>{location.name}</span>
            </div>
            {isExpanded && (
              <div className="pl-6 text-sm">
                {renderLocationTree(
                  location.children,
                  handleSelect,
                  expandedItems,
                  toggleExpand
                )}
              </div>
            )}
          </div>
        ) : (
          <div
            onClick={() => handleSelect(location.id, location.name)}
            className="cursor-pointer pl-8 py-2"
          >
            {location.name}
          </div>
        )}
        <Separator className="my-2" /> {/* Adding separator between items */}
      </div>
    );
  });
};
const BestLocationTree = ({ locationTreeData, setSelectedLocation }) => {
  const [selectedLocationName, setSelectedLocationName] =
    useState("Select Location");
  const [expandedItems, setExpandedItems] = useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);

  const handleSelect = (id, name) => {
    setSelectedLocation([id]);
    setSelectedLocationName(name);
    setIsDropdownVisible(false);
  };
  const toggleExpand = (name) => {
    setExpandedItems((prev) =>
      prev.includes(name)
        ? prev.filter((item) => item !== name)
        : [...prev, name]
    );
  };
  const toggleDropdownVisibility = () => {
    setIsDropdownVisible((prev) => !prev);
    if (!isDropdownVisible) {
      // Reset expandedItems when dropdown is closed
      setExpandedItems([]);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="w-full relative" ref={dropdownRef}>
      <Button
        variant="outline"
        onClick={toggleDropdownVisibility}
        className="w-full flex justify-start border border-gray-300 rounded-md"
      >
        {selectedLocationName}
      </Button>
      <div className="absolute z-10 w-full">
        {isDropdownVisible && (
          <ScrollArea className="w-full mt-2 bg-white dark:bg-gray-950 rounded-md border border-gray-300 shadow-lg overflow-y-auto h-52">
            <div className="p-4">
              {renderLocationTree(
                locationTreeData,
                handleSelect,
                expandedItems,
                toggleExpand
              )}
            </div>
          </ScrollArea>
        )}
      </div>
    </div>
  );
};
BestLocationTree.propTypes = {
  locationTreeData: PropTypes.array.isRequired,
  setSelectedLocation: PropTypes.func.isRequired,
};

export default BestLocationTree;
