import { Button } from "@/components/ui/button";

const Commercial = () => {
  return (
    <div>
      <div>
        <div>
          <div className="w-[100%] flex gap-5 p-1">
            <div className="w-[50%]">
              <Button className="w-[100%]">Office</Button>
            </div>
            <div className="w-[50%]">
              <Button className="w-[100%]">Shop</Button>
            </div>
          </div>
          <div className="w-[100%] flex gap-5 p-1">
            <div className="w-[50%]">
              <Button className="w-[100%]">Warehouse</Button>
            </div>
            <div className="w-[50%]">
              <Button className="w-[100%]">Factory</Button>
            </div>
          </div>
          <div className="w-[100%] flex gap-5 p-1">
            <div className="w-[50%]">
              <Button className="w-[100%]">Building</Button>
            </div>
            <div className="w-[50%]">
              <Button className="w-[100%]">Other</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Commercial;
