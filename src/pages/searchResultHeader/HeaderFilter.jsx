import { Button } from "@/components/ui/button";
import PropTypes from "prop-types";

const HeaderFilter = ({ onSortChange }) => {
  return (
    <div className="flex justify-end gap-4">
      <div>
        <Button
          variant="outline"
          className="flex justify-between items-center rounded-3xl border-2"
          type="button"
          onClick={(e) => {
            e.preventDefault();

            onSortChange("price", "ASC");
          }}
        >
          Price Asc
        </Button>
      </div>
      <div>
        <Button
          variant="outline"
          className="flex justify-between items-center rounded-3xl border-2"
          type="button"
          onClick={(e) => {
            e.preventDefault();

            onSortChange("price", "DESC");
          }}
        >
          Price Desc
        </Button>
      </div>
    </div>
  );
};
HeaderFilter.propTypes = {
  onSortChange: PropTypes.func.isRequired,
};
export default HeaderFilter;
