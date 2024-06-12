import { BrowserRouter, Routes, Route } from "react-router-dom";
import { appContext } from "./Context";
import { useState } from "react";
import Sidebar from "./sidebar/SideBar";
import Home from "./Home";
import Dashboard from "./Dashboard";
import Navbar from "./navbar/Navbar";
import Header from "./Header";
import CardsDetail from "./CardsDetail";
import PropertyDetailsPage from "./property_Details/PropertyDetailsPage";

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
  });
  return (
    <BrowserRouter>
      <div className="overflow-x-hidden">
        <appContext.Provider value={{ appState, setAppState }}>
          <Navbar />
          <Sidebar />
          <div
            className={`p-20 transition-transform duration-300  ${
              appState.isSidebarOpen ? "transform translate-x-64" : ""
            }`}
          >
            {appState.showDashboard ? (
              <div>
                <Routes>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/home" element={<Home />} />
                  <Route path="/" element={<Header />} />
                  <Route path="/search-results" element={<CardsDetail />} />
                  <Route
                    path="/property/:id"
                    element={<PropertyDetailsPage />}
                  />
                </Routes>
              </div>
            ) : (
              <Routes>
                <Route path="/home" element={<Home />} />
              </Routes>
            )}
          </div>
        </appContext.Provider>
      </div>
    </BrowserRouter>
  );
}

export default App;
