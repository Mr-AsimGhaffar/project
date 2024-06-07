import { BrowserRouter, Routes, Route } from "react-router-dom";
import { appContext } from "./Context";
import { useState } from "react";
import Sidebar from "./sidebar/SideBar";
import Home from "./Home";
import Dashboard from "./Dashboard";

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
