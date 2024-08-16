import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import PropTypes from "prop-types";
import { useState } from "react";

const renderLocationTree = (locations, handleSelect) => {
  return locations.map((location) => (
    <DropdownMenuGroup key={location.id}>
      {location.children && location.children.length > 0 ? (
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>{location.name}</DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent className="max-h-96 overflow-y-auto">
              {renderLocationTree(location.children, handleSelect)}
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
      ) : (
        <DropdownMenuItem
          onClick={() => handleSelect(location.id, location.name)}
        >
          {location.name}
        </DropdownMenuItem>
      )}
    </DropdownMenuGroup>
  ));
};
const BestLocationTree = ({ locationTreeData, setSelectedLocation }) => {
  const [selectedLocationName, setSelectedLocationName] =
    useState("Select Location");

  const handleSelect = (id, name) => {
    setSelectedLocation([id]);
    setSelectedLocationName(name);
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="w-[100%] flex justify-start">
            {selectedLocationName}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="max-h-96 overflow-y-auto">
          {renderLocationTree(locationTreeData, handleSelect)}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
BestLocationTree.propTypes = {
  locationTreeData: PropTypes.object.isRequired,
  setSelectedLocation: PropTypes.object.isRequired,
};

export default BestLocationTree;
