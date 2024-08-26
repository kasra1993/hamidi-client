import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ProductsProvider } from "./context/products_context.jsx";
import { MaterialFilterProvider } from "./context/material_filter_context.jsx";
import { PartFilterProvider } from "./context/part_filter_context.jsx";
import { AuthProvider } from "./context/auth_context.jsx";
import { ToastProvider } from "./context/toast_context.jsx";
import { FormProvider } from "./context/Form_Context.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <FormProvider>
        <ToastProvider>
          <ProductsProvider>
            <MaterialFilterProvider>
              <PartFilterProvider>
                <App />
              </PartFilterProvider>
            </MaterialFilterProvider>
          </ProductsProvider>
        </ToastProvider>
      </FormProvider>
    </AuthProvider>
  </React.StrictMode>
);
