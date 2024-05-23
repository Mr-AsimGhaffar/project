import { Button } from "@/components/ui/button";

const Plots = () => {
  return (
    <div>
      <div>
        <div>
          <div className="w-[100%] flex gap-5 p-1">
            <div className="w-[50%]">
              <Button className="w-[100%]" variant="outline">
                Residentail Plots
              </Button>
            </div>
            <div className="w-[50%]">
              <Button className="w-[100%]" variant="outline">
                Commercial Plots
              </Button>
            </div>
          </div>
          <div className="w-[100%] flex gap-5 p-1">
            <div className="w-[50%]">
              <Button className="w-[100%]" variant="outline">
                Agricultural Land
              </Button>
            </div>
            <div className="w-[50%]">
              <Button className="w-[100%]" variant="outline">
                Industrail Land
              </Button>
            </div>
          </div>
          <div className="w-[100%] flex gap-5 p-1">
            <div className="w-[50%]">
              <Button className="w-[100%]" variant="outline">
                Plot File
              </Button>
            </div>
            <div className="w-[50%]">
              <Button className="w-[100%]" variant="outline">
                Plot Form
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Plots;
