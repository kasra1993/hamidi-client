import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  // ProductsPage,
  ErrorPage,
  HomePage,
  AboutPage,
  PartProvidersPage,
  MaterialProvidersPage,
  VendorPage,
  Exhibition,
  Offers,
} from "./pages";
import SingleProvider from "./pages/SingleProvider";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/materials" element={<MaterialProvidersPage />} />
        <Route path="/parts" element={<PartProvidersPage />} />
        <Route path="/vendors" element={<VendorPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/exhibition" element={<Exhibition />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/:type/provider/:id" element={<SingleProvider />} />

        {/* <Route path="products" element={<ProductsPage />} /> */}
        {/* <Route path="materials" element={<MaterialProvidersPage />} /> */}

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
