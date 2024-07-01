import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { appContext } from "./contexts/Context";
import Navbar from "./components/navbar/Navbar";
import Sidebar from "./components/sidebar/SideBar";
import Dashboard from "./pages/Dashboard";
// import Home from "./components/Home";
import Header from "./components/Header";
import CardsDetail from "./pages/CardsDetail";
import PropertyDetailsPage from "./pages/property_Details/PropertyDetailsPage";
import Footer from "./components/footer/Footer";

function App() {
  const [appState, setAppState] = useState({
    cardData: [],
    pageData: {},
    selectedAmountMin: "",
    selectedAmountMax: "",
    selectedAreaMin: "",
    selectedAreaMax: "",
    selectBeds: "",
    selectedSubProperty: "",
    graphData: {},
    isApiCall: false,
    loading: false,
    showDashboard: false,
    showHome: false,
    isSidebarOpen: false,
    searchTerm: "",
    totalPages: 1,
    currentPage: 1,
  });

  return (
    <BrowserRouter>
      <div>
        <appContext.Provider value={{ appState, setAppState }}>
          <Navbar />
          <Sidebar />
          <div
            className={`p-20 transition-transform duration-300  ${
              appState.isSidebarOpen ? "transform -translate-x-0" : ""
            }`}
          >
            {/* {appState.showDashboard ? ( */}
            <div>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
                {/* <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} /> */}
                <Route path="/header" element={<Header />} />
                <Route path="/search-results" element={<CardsDetail />} />
                <Route path="/property/:id" element={<PropertyDetailsPage />} />
              </Routes>
            </div>
            {/* ) : (
              <Routes>
                <Route path="/" element={<Home />} />
              </Routes>
            )} */}
          </div>
          <Footer />
        </appContext.Provider>
      </div>
    </BrowserRouter>
  );
}

export default App;
