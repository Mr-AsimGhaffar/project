import CardsDetail from "./CardsDetail";
import Header from "./Header";
import MainContent from "./MainContent";

import PropertyListing from "./PropertyListing";

const Dashboard = () => {
  return (
    <div>
      <PropertyListing />
      <Header />
      <CardsDetail />
      <MainContent />
    </div>
  );
};

export default Dashboard;
