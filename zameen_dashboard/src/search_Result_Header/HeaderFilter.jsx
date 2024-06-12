import { Button } from "@/components/ui/button";
import { IoMdOptions } from "react-icons/io";

const HeaderFilter = () => {
  return (
    <div>
      <Button
        variant="outline"
        className="flex justify-between items-center rounded-3xl border-2 w-full px-4"
      >
        <span>Filters</span>
        <IoMdOptions />
      </Button>
    </div>
  );
};

export default HeaderFilter;
