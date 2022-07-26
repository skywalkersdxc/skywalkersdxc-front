import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage, ResultsPage } from "../pages";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/results" element={<ResultsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
