import { Button } from "@/components/ui/button";
import PropTypes from "prop-types";
import { useState } from "react";

const HeaderFilter = ({ onSortChange }) => {
  const [sortOrder, setSortOrder] = useState(null);

  const handleSortChange = (sortBy, order) => {
    onSortChange(sortBy, order);
    setSortOrder(order);
  };
  return (
    <div className="flex gap-2">
      <div>
        <Button
          variant="outline"
          className={`flex justify-between items-center rounded-3xl border-2 ${
            sortOrder === "ASC" ? "bg-gray-800 text-white" : ""
          }`}
          type="button"
          onClick={(e) => {
            e.preventDefault();
            handleSortChange("price", "ASC");
          }}
        >
          Prices (Low to High)
        </Button>
      </div>
      <div>
        <Button
          variant="outline"
          className={`flex justify-between items-center rounded-3xl border-2 ${
            sortOrder === "DESC" ? "bg-gray-800 text-white" : ""
          }`}
          type="button"
          onClick={(e) => {
            e.preventDefault();
            handleSortChange("price", "DESC");
          }}
        >
          Prices (High to Low)
        </Button>
      </div>
    </div>
  );
};
HeaderFilter.propTypes = {
  onSortChange: PropTypes.func.isRequired,
};
export default HeaderFilter;
