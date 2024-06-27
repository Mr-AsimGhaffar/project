import PropertyListing from "@/components/PropertyListing";
import Header from "../components/Header";
import FeaturedProperty from "@/components/FeaturedProperty";

const Dashboard = () => {
  return (
    <div>
      <PropertyListing />
      <Header />
      <br />
      <FeaturedProperty />
    </div>
  );
};

export default Dashboard;
