import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useCallback, useMemo, useState } from "react";
import { appContext } from "./contexts/Context";
import Navbar from "./components/navbar/Navbar";
// import Sidebar from "./components/sidebar/SideBar";
import Dashboard from "./pages/Dashboard";
// import Home from "./components/Home";
import Header from "./components/Header";
import CardsDetail from "./pages/CardsDetail";
import PropertyDetailsPage from "./pages/propertyDetails/PropertyDetailsPage";
import Footer from "./components/footer/Footer";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { priceConversion } from "./utlils/priceConversion";
import { countConversion } from "./utlils/countConversion";
import { ThemeProvider } from "./components/theme/themeProvider";
import PropertyRecommendations from "./pages/propertyRecommendations/PropertyRecommendations";

function App() {
  const [appState, setAppState] = useState({
    cardData: [],
    pageData: {},
    selectedAmountMin: "",
    selectedAmountMax: "",
    selectedAreaMin: "",
    selectedAreaMax: "",
    selectBeds: "",
    propertyState: {
      selectedPropertyType: "Home",
      selectedSubProperty: "",
    },
    isApiCall: false,
    loading: false,
    showDashboard: false,
    showHome: false,
    isSidebarOpen: false,
    searchTerm: "",
    totalPages: 1,
    currentPage: 1,
    startDate: "",
    endDate: "",
    selectedSuggestions: [],
    selectedCity: "islamabad",
    topBestProperty: [],
  });
  const setSelectedCity = (city) => {
    setAppState((prevState) => ({
      ...prevState,
      selectedCity: city,
    }));
  };

  const [conversionType, setConversionType] = useState("price");
  const [propertyCategory, setPropertyCategory] = useState("for_sale");
  const conversionFunction =
    conversionType === "price" ? priceConversion : countConversion;

  const contextValue = useMemo(
    () => ({ appState, setAppState, setSelectedCity }),
    [appState]
  );
  const handleDashboardClick = useCallback(() => {
    setAppState((prevState) => ({ ...prevState, showDashboard: true }));
  }, []);

  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <BrowserRouter>
        <div>
          <appContext.Provider value={contextValue}>
            <Navbar
              handleDashboardClick={handleDashboardClick}
              setConversionType={setConversionType}
              setPropertyCategory={setPropertyCategory}
              propertyCategory={propertyCategory}
            />
            {/* <Sidebar /> */}
            <ToastContainer />
            <div>
              <div>
                <Routes>
                  <Route
                    path="/"
                    element={
                      <Dashboard
                        conversionFunction={conversionFunction}
                        propertyCategory={propertyCategory}
                        setPropertyCategory={setPropertyCategory}
                      />
                    }
                  />
                  <Route
                    path="/dashboard"
                    element={
                      <Dashboard
                        conversionFunction={conversionFunction}
                        propertyCategory={propertyCategory}
                        setPropertyCategory={setPropertyCategory}
                      />
                    }
                  />

                  <Route path="/header" element={<Header />} />
                  <Route
                    path="/search-results"
                    element={
                      <CardsDetail
                        conversionFunction={conversionFunction}
                        propertyCategory={propertyCategory}
                      />
                    }
                  />
                  <Route
                    path="/propertyRecommendations"
                    element={
                      <PropertyRecommendations
                        propertyCategory={propertyCategory}
                        conversionFunction={conversionFunction}
                      />
                    }
                  />
                  <Route
                    path="/property/:id"
                    element={
                      <PropertyDetailsPage
                        conversionFunction={conversionFunction}
                      />
                    }
                  />
                </Routes>
              </div>
            </div>
            <Footer />
          </appContext.Provider>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
