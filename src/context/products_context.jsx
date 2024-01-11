import axios from "axios";
import React, { useContext, useEffect, useReducer } from "react";
import reducer from "../reducers/products_reducer";
import { products_url as url } from "../utils/constants";
import {
  GET_PROVIDERS_BEGIN,
  GET_PROVIDERS_SUCCESS,
  GET_PROVIDERS_ERROR,
} from "../actions";

const initialState = {
  providers_loading: false,
  providers_error: false,
  products: [],
  part_providers: [],
  material_providers: [],
  featured_products: [],
  featured_providers: [],
};

const ProductsContext = React.createContext();

export const ProductsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // const openSidebar = () => {
  //   dispatch({ type: SIDEBAR_OPEN });
  // };

  // const closeSidebar = () => {
  //   dispatch({ type: SIDEBAR_CLOSE });
  // };

  const fetchProviders = async (url) => {
    dispatch({ type: GET_PROVIDERS_BEGIN });

    try {
      const response = await axios.get(url);
      const providers = response.data;

      dispatch({ type: GET_PROVIDERS_SUCCESS, payload: providers });
    } catch (error) {
      dispatch({ type: GET_PROVIDERS_ERROR });
    }
  };

  // const fetchSingleProduct = async (url) => {
  //   dispatch({ type: GET_SINGLE_PRODUCT_BEGIN });
  //   try {
  //     const response = await axios.get(url);
  //     const singleProduct = response.data;
  //     dispatch({ type: GET_SINGLE_PRODUCT_SUCCESS, payload: singleProduct });
  //   } catch (error) {
  //     dispatch({ type: GET_SINGLE_PRODUCT_ERROR });
  //   }
  // };

  useEffect(() => {
    fetchProviders(url);
  }, []);

  return (
    <ProductsContext.Provider value={state}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProductsContext = () => {
  return useContext(ProductsContext);
};
