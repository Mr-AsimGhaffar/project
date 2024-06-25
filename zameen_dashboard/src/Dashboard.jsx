import FeaturedProperty from "./FeaturedProperty";
import Header from "./Header";

import PropertyListing from "./PropertyListing";

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
