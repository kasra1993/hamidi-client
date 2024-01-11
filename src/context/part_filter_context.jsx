import React, { useEffect, useContext, useReducer } from "react";
import reducer from "../reducers/part_filter_reducer";
import {
  LOAD_PART_PROVIDERS,
  SET_PART_GRIDVIEW,
  SET_PART_LISTVIEW,
  UPDATE_PART_SORT,
  SORT_PART_PROVIDERS,
  UPDATE_PART_FILTERS,
  FILTER_PART_PROVIDERS,
  CLEAR_PART_FILTERS,
} from "../actions";
import { useProductsContext } from "./products_context";

const initialState = {
  filtered_providers: [],
  all_providers: [],
  grid_view: true,
  sort: "name-a",
  filters: {
    text: "",
    partgroups: "all",
    partnames: "all",
    partgeneralids: "all",
  },
};

const PartFilterContext = React.createContext();

export const PartFilterProvider = ({ children }) => {
  const { part_providers } = useProductsContext();
  //
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: LOAD_PART_PROVIDERS, payload: part_providers });
  }, [part_providers]);

  useEffect(() => {
    dispatch({ type: FILTER_PART_PROVIDERS });
    dispatch({ type: SORT_PART_PROVIDERS });
  }, [part_providers, state.sort, state.filters]);

  const setGridView = () => {
    dispatch({ type: SET_PART_GRIDVIEW });
  };

  const setListView = () => {
    dispatch({ type: SET_PART_LISTVIEW });
  };

  const updateSort = (e) => {
    const value = e.target.value;

    dispatch({ type: UPDATE_PART_SORT, payload: value });
  };

  const updateFilters = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if (name === "partgroups") {
      value = e.target.textContent;
    }

    dispatch({ type: UPDATE_PART_FILTERS, payload: { name, value } });
  };

  const clearFilters = () => {
    dispatch({ type: CLEAR_PART_FILTERS });
  };

  return (
    <PartFilterContext.Provider
      value={{
        ...state,
        setGridView,
        setListView,
        updateSort,
        updateFilters,
        clearFilters,
      }}
    >
      {children}
    </PartFilterContext.Provider>
  );
};

export const usePartFilterContext = () => {
  return useContext(PartFilterContext);
};
