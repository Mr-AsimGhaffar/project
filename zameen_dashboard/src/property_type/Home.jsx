import { Button } from "@/components/ui/button";

const Home = () => {
  return (
    <div>
      <div>
        <div className="w-[100%] flex gap-5 p-1">
          <div className="w-[50%]">
            <Button className="w-[100%]">House</Button>
          </div>
          <div className="w-[50%]">
            <Button className="w-[100%]">Flat</Button>
          </div>
        </div>
        <div className="w-[100%] flex gap-5 p-1">
          <div className="w-[50%]">
            <Button className="w-[100%]">Upper Portion</Button>
          </div>
          <div className="w-[50%]">
            <Button className="w-[100%]">Lower Portion</Button>
          </div>
        </div>
        <div className="w-[100%] flex gap-5 p-1">
          <div className="w-[50%]">
            <Button className="w-[100%]">Farm House</Button>
          </div>
          <div className="w-[50%]">
            <Button className="w-[100%]">Room</Button>
          </div>
        </div>
        <div className="w-[100%] flex gap-5 p-1">
          <div className="w-[50%]">
            <Button className="w-[100%]">Penthouse</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
