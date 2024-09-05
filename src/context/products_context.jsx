import axios from "axios";
import React, { useContext, useEffect, useReducer } from "react";
import reducer from "../reducers/products_reducer";
import { products_url as url } from "../utils/constants";
// import { single_product_url as singleUrl } from "../utils/constants";
import {
  GET_PROVIDERS_BEGIN,
  GET_PROVIDERS_SUCCESS,
  GET_PROVIDERS_ERROR,
} from "../actions";

const initialState = {
  providers_loading: false,
  providers_error: false,
  part_providers: [],
  material_providers: [],
  featured_products: [],
  featured_providers: [],
  products: [],
};

const ProductsContext = React.createContext();

export const ProductsProvider = ({ children }) => {
  const initialStateWithStorage = () => {
    const localData = localStorage.getItem("productsState");
    return localData ? JSON.parse(localData) : initialState;
  };
  const [state, dispatch] = useReducer(
    reducer,
    initialState,
    initialStateWithStorage
  );

  const fetchAll = async (url) => {
    if (state.material_providers) {
      dispatch({ type: GET_PROVIDERS_BEGIN });

      try {
        const response = await axios.get(url);
        const providers = response.data;
        dispatch({ type: GET_PROVIDERS_SUCCESS, payload: providers });
      } catch (error) {
        dispatch({ type: GET_PROVIDERS_ERROR });
      }
    }
  };

  useEffect(() => {
    localStorage.setItem("productsState", JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    fetchAll(url);
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
