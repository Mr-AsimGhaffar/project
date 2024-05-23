import { Button } from "@/components/ui/button";

const Home = () => {
  return (
    <div>
      <div>
        <div className="w-[100%] flex gap-5 p-1">
          <div className="w-[50%]">
            <Button className="w-[100%]" variant="outline">
              House
            </Button>
          </div>
          <div className="w-[50%]">
            <Button className="w-[100%]" variant="outline">
              Flat
            </Button>
          </div>
        </div>
        <div className="w-[100%] flex gap-5 p-1">
          <div className="w-[50%]">
            <Button className="w-[100%]" variant="outline">
              Upper Portion
            </Button>
          </div>
          <div className="w-[50%]">
            <Button className="w-[100%]" variant="outline">
              Lower Portion
            </Button>
          </div>
        </div>
        <div className="w-[100%] flex gap-5 p-1">
          <div className="w-[50%]">
            <Button className="w-[100%]" variant="outline">
              Farm House
            </Button>
          </div>
          <div className="w-[50%]">
            <Button className="w-[100%]" variant="outline">
              Room
            </Button>
          </div>
        </div>
        <div className="w-[100%] flex gap-5 p-1">
          <div className="w-[50%]">
            <Button className="w-[100%]" variant="outline">
              Penthouse
            </Button>
          </div>
          <div className="w-[50%]"></div>
        </div>
      </div>
    </div>
  );
};

export default Home;
