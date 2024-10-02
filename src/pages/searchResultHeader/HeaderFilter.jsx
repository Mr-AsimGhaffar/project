import { Button } from "@/components/ui/button";
import PropTypes from "prop-types";
import { BsArrowUp } from "react-icons/bs";
import { BsArrowDown } from "react-icons/bs";

const HeaderFilter = ({ onSortChange, sort, totalCount }) => {
  const isDisabled = totalCount === 0;
  return (
    <div className="flex flex-col md:flex-row justify-end md:space-x-4 space-y-2 md:space-y-0 mb-2">
      <Button
        onClick={(e) => {
          e?.preventDefault();
          onSortChange("price");
        }}
        className="flex items-center font-bold"
        disabled={isDisabled}
      >
        Sort by Price
        {sort["price"] === "ASC" && <BsArrowUp className="ml-1" />}
        {sort["price"] === "DESC" && <BsArrowDown className="ml-1" />}
      </Button>
      <Button
        onClick={(e) => {
          e?.preventDefault();
          onSortChange("added");
        }}
        className="flex items-center font-bold"
        disabled={isDisabled}
      >
        Sort by Date
        {sort["added"] === "ASC" && <BsArrowUp className="ml-1" />}
        {sort["added"] === "DESC" && <BsArrowDown className="ml-1" />}
      </Button>
    </div>
  );
};
HeaderFilter.propTypes = {
  onSortChange: PropTypes.func.isRequired,
  sort: PropTypes.object.isRequired,
  totalCount: PropTypes.number.isRequired,
};
export default HeaderFilter;
