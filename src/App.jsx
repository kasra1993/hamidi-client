import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  ErrorPage,
  HomePage,
  AboutPage,
  PartProvidersPage,
  MaterialProvidersPage,
  VendorPage,
  Exhibition,
  Offers,
  UserLogin,
  ProviderLogin,
  UserRegistration,
  ProviderRegistration,
} from "./pages";
import SingleProvider from "./pages/SingleProvider";
import PrivateRoute from "./components/PrivateRoute";
import Layout from "./components/Layout";
import ProviderProfile from "./pages/profile/ProviderProfile";
import ProviderResetPassword from "./components/provider/ProviderResetPassword";
import ProviderForgotPassword from "./components/provider/ProviderForgotPassword";
import UserForgotPassword from "./components/user/UserForgotPassword";
import UserResetPassword from "./components/user/UserResetPassword";
import ProductsInfoList from "./pages/productInfo/ProductsInfoList";
import SinlgeProduct from "./pages/productInfo/SinlgeProduct";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route
            path="/materials"
            element={
              <PrivateRoute>
                <MaterialProvidersPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/parts"
            element={
              <PrivateRoute>
                <PartProvidersPage />
              </PrivateRoute>
            }
          />
          <Route path="/vendors" element={<VendorPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/exhibition" element={<Exhibition />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/products-info-list" element={<ProductsInfoList />} />
          <Route path="/product/:id" element={<SinlgeProduct />} />
          <Route path="/:type/provider/:id" element={<SingleProvider />} />
          <Route path="*" element={<ErrorPage />} />
          <Route path="/provider-profile" element={<ProviderProfile />} />
        </Route>
        <Route path="/user-forgot-password" element={<UserForgotPassword />} />
        <Route path="/user-reset-password" element={<UserResetPassword />} />
        <Route
          path="/provider-forgot-password"
          element={<ProviderForgotPassword />}
        />
        <Route
          path="/provider-reset-password"
          element={<ProviderResetPassword />}
        />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/provider-login" element={<ProviderLogin />} />
        <Route path="/user-registration" element={<UserRegistration />} />
        <Route
          path="/provider-registration"
          element={<ProviderRegistration />}
        />
      </Routes>
    </Router>
  );
}

export default App;
