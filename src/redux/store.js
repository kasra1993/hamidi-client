import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import formReducer from "./slices/formSlice"; // Import the form slice
import messageSliceReducer from "./slices/messageSlice"; // Import the message slice
import productsReducer from "./slices/productsSlice";
import ticketReducer from "./slices/ticketSlice"; // Import the ticket slice
import toastReducer from "./slices/toastSlice"; // Import the toast slice
import materialProvidersSliceReducer from "./slices/materialProvidersSlice"; // Import material filter slice
import partProvidersSliceReducer from "./slices/partProvidersSlice"; // Import material filter slice
import providerSliceReducer from "./slices/providerSlice";
import userSliceReducer from "./slices/userSlice";
import productsInfoSliceReducer from "./slices/productInfoSlice";
import resourceSliceReducer from "./slices/resourceSlice";
import marketSliceReducer from "./slices/marketSlice";
import { thunk } from "redux-thunk";
import storage from "redux-persist/lib/storage"; // Defaults to localStorage for web

const persistConfig = {
  key: "root",
  storage,
  whitelist: [
    "user",
    "materialProviders",
    "products",
    "provider",
    // "partProviders",
  ], // Specify which reducers you want to persist
};

const rootReducer = combineReducers({
  // auth: authReducer,
  form: formReducer, // Add form slice to root reducer
  messages: messageSliceReducer, // Add message slice to root reducer
  tickets: ticketReducer, // Add ticket slice to root reducer
  toast: toastReducer, // Add the toast slice to root reducer
  products: productsReducer, // Add the products slice to root reducer
  materialProviders: materialProvidersSliceReducer, // Add material filter slice to root reducer
  provider: providerSliceReducer,
  user: userSliceReducer,
  markets: marketSliceReducer,
  productInfo: productsInfoSliceReducer,
  resources: resourceSliceReducer,
  partProviders: partProvidersSliceReducer, // Add part filter slice to root reducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(thunk),
});

export const persistor = persistStore(store);
export default store;
