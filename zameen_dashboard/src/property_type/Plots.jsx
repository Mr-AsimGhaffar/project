import { Button } from "@/components/ui/button";

const Plots = () => {
  return (
    <div>
      <div>
        <div>
          <div className="w-[100%] flex gap-5 p-1">
            <div className="w-[50%]">
              <Button className="w-[100%]">Residentail Plots</Button>
            </div>
            <div className="w-[50%]">
              <Button className="w-[100%]">Commercial Plots</Button>
            </div>
          </div>
          <div className="w-[100%] flex gap-5 p-1">
            <div className="w-[50%]">
              <Button className="w-[100%]">Agricultural Land</Button>
            </div>
            <div className="w-[50%]">
              <Button className="w-[100%]">Industrail Land</Button>
            </div>
          </div>
          <div className="w-[100%] flex gap-5 p-1">
            <div className="w-[50%]">
              <Button className="w-[100%]">Plot File</Button>
            </div>
            <div className="w-[50%]">
              <Button className="w-[100%]">Plot Form</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Plots;
