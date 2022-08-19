import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage, ResultsPage } from "../pages";

import FlightsSearchContextProvider from "../utils/flightsSearchContext";

function Router() {
  return (
    <BrowserRouter>
      <FlightsSearchContextProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/results" element={<ResultsPage />} />
        </Routes>
    </FlightsSearchContextProvider>
    </BrowserRouter>
  );
}

export default Router;
