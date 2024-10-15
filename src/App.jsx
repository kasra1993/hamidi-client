import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
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
import "react-toastify/dist/ReactToastify.css";
import SingleProvider from "./pages/SingleProvider";
import PrivateRoute from "./components/PrivateRoute";
import Layout from "./components/Layout";
import ProviderProfile from "./pages/profile/ProviderProfile";
import ProviderResetPassword from "./components/provider/ProviderResetPassword";
import ProviderForgotPassword from "./components/provider/ProviderForgotPassword";
import UserForgotPassword from "./components/user/UserForgotPassword";
import UserResetPassword from "./components/user/UserResetPassword";
import ProductsInfoList from "./pages/productInfo/ProductsInfoList";
import SingleProduct from "./pages/productInfo/SingleProduct";
import ProviderSettings from "./pages/profile/ProviderSettings";
import UserSettings from "./pages/profile/UserSettings";
import MarketList from "./pages/markets/MarketList";
import ResourceList from "./pages/resources/ResourceList";
import SingleResource from "./pages/resources/SingleResource";
import SingleMarket from "./pages/markets/SingleMarket";
import ComingSoon from "./pages/ComingSoon";
import ResponsiveWrapper from "./components/ResponsiveWrapper";
import UserProfile from "./pages/profile/UserProfile";

function App() {
  return (
    <Router>
      <ResponsiveWrapper>
        <div>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="/vendors" element={<VendorPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/exhibition" element={<Exhibition />} />
              <Route path="/offers" element={<Offers />} />
              <Route
                path="/products-info-list"
                element={<ProductsInfoList />}
              />
              <Route path="/product/:id" element={<SingleProduct />} />
              <Route path="/markets" element={<MarketList />} />
              <Route path="/market/:id" element={<SingleMarket />} />
              <Route path="/resources" element={<ResourceList />} />
              <Route path="/resource/:id" element={<SingleResource />} />
              <Route path="*" element={<ErrorPage />} />
              <Route path="/coming-soon" element={<ComingSoon />} />

              {/* Group all protected routes under a single PrivateRoute */}

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
              <Route
                path="/:type/provider/:id"
                element={
                  <PrivateRoute>
                    <SingleProvider />
                  </PrivateRoute>
                }
              />
              <Route
                path="/provider-profile"
                element={
                  <PrivateRoute>
                    <ProviderProfile />
                  </PrivateRoute>
                }
              />
              <Route
                path="/provider-setting"
                element={
                  <PrivateRoute>
                    <ProviderSettings />
                  </PrivateRoute>
                }
              />
              <Route
                path="/user-profile"
                element={
                  <PrivateRoute>
                    <UserProfile />
                  </PrivateRoute>
                }
              />
            </Route>

            {/* Authentication & Password Reset Routes */}

            <Route path="/forgot-password" element={<UserForgotPassword />} />
            <Route
              path="/reset-password/:token"
              element={<UserResetPassword />}
            />

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
          <ToastContainer />
        </div>
      </ResponsiveWrapper>
    </Router>
  );
}

export default App;
