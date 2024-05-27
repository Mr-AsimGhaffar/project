import CardsDetail from "./CardsDetail";
import Header from "./Header";
import MainContent from "./MainContent";
import { appContext } from "./Context";
import { useState } from "react";

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
  });
  return (
    <>
      <appContext.Provider value={{ appState, setAppState }}>
        <div className="p-20">
          <Header />
          <CardsDetail />
          <MainContent />
        </div>
      </appContext.Provider>
    </>
  );
}

export default App;
