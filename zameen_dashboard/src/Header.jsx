import { Button } from "@/components/ui/button";
import { DatePickerWithRange } from "./components/ui/DateRangePicker";
import { Input } from "@/components/ui/input";

const Header = () => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="w-[40%] text-4xl font-bold">
          <p>Dashboard</p>
        </div>
        <div className="flex justify-end items-center w-[60%] gap-5">
          <div className="w-full">
            <Input placeholder="Search" />
          </div>
          <DatePickerWithRange />
          <Button>Submit</Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
