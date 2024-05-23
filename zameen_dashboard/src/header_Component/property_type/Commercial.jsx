import { Button } from "@/components/ui/button";

const Commercial = () => {
  return (
    <div>
      <div>
        <div>
          <div className="w-[100%] flex gap-5 p-1">
            <div className="w-[50%]">
              <Button className="w-[100%]" variant="outline">
                Office
              </Button>
            </div>
            <div className="w-[50%]">
              <Button className="w-[100%]" variant="outline">
                Shop
              </Button>
            </div>
          </div>
          <div className="w-[100%] flex gap-5 p-1">
            <div className="w-[50%]">
              <Button className="w-[100%]" variant="outline">
                Warehouse
              </Button>
            </div>
            <div className="w-[50%]">
              <Button className="w-[100%]" variant="outline">
                Factory
              </Button>
            </div>
          </div>
          <div className="w-[100%] flex gap-5 p-1">
            <div className="w-[50%]">
              <Button className="w-[100%]" variant="outline">
                Building
              </Button>
            </div>
            <div className="w-[50%]">
              <Button className="w-[100%]" variant="outline">
                Other
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Commercial;
