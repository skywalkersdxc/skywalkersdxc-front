import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "../pages";

function Router() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />}>
          </Route>
        </Routes>
      </BrowserRouter>
    );
  }

export default Router;