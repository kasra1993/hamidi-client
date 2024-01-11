import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ProductsProvider } from "./context/products_context.jsx";
// import { FilterProvider } from "./context/filter_context.jsx";
import { MaterialFilterProvider } from "./context/material_filter_context.jsx";
import { PartFilterProvider } from "./context/part_filter_context.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ProductsProvider>
      <MaterialFilterProvider>
        <PartFilterProvider>
          <App />
        </PartFilterProvider>
      </MaterialFilterProvider>
    </ProductsProvider>
  </React.StrictMode>
);
