import { Button } from "@/components/ui/button";
import PropTypes from "prop-types";
import { BsArrowUp } from "react-icons/bs";
import { BsArrowDown } from "react-icons/bs";

const HeaderFilter = ({
  onSortChange,
  sortBy,
  sortOrder,
  sortByDate,
  sortOrderDate,
}) => {
  return (
    <div className="flex justify-end space-x-4">
      <Button
        onClick={(e) => {
          e?.preventDefault();
          onSortChange("price");
        }}
        className={`flex items-center ${sortBy === "price" ? "font-bold" : ""}`}
      >
        Sort by Price
        {sortBy === "price" && sortOrder === "ASC" && (
          <BsArrowUp className="ml-1" />
        )}
        {sortBy === "price" && sortOrder === "DESC" && (
          <BsArrowDown className="ml-1" />
        )}
      </Button>
      <Button
        onClick={(e) => {
          e?.preventDefault();
          onSortChange("added");
        }}
        className={`flex items-center ${
          sortByDate === "added" ? "font-bold" : ""
        }`}
      >
        Sort by Date
        {sortByDate === "added" && sortOrderDate === "ASC" && (
          <BsArrowUp className="ml-1" />
        )}
        {sortByDate === "added" && sortOrderDate === "DESC" && (
          <BsArrowDown className="ml-1" />
        )}
      </Button>
    </div>
  );
};
HeaderFilter.propTypes = {
  onSortChange: PropTypes.func.isRequired,
  sortBy: PropTypes.func.isRequired,
  sortOrder: PropTypes.func.isRequired,
  sortByDate: PropTypes.func.isRequired,
  sortOrderDate: PropTypes.func.isRequired,
};
export default HeaderFilter;
