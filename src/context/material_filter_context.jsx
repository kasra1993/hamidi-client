import React, { useEffect, useContext, useReducer } from "react";
import reducer from "../reducers/material_filter_reducer";
import {
  LOAD_MATERIAL_PROVIDERS,
  SET_MATERIAL_GRIDVIEW,
  SET_MATERIAL_LISTVIEW,
  UPDATE_MATERIAL_SORT,
  SORT_MATERIAL_PROVIDERS,
  UPDATE_MATERIAL_FILTERS,
  FILTER_MATERIAL_PROVIDERS,
  CLEAR_MATERIAL_FILTERS,
} from "../actions";
import { useProductsContext } from "./products_context";

const initialState = {
  filtered_providers: [],
  all_providers: [],
  grid_view: true,
  sort: "name-a",
  filters: {
    text: "",
    materialGroupText: "",
    materialNameText: "",
    materialGradeText: "",
    materialgroups: "all",
    materialnames: "all",
    materialgrades: "all",
  },
};

const MaterialFilterContext = React.createContext();

export const MaterialFilterProvider = ({ children }) => {
  const { material_providers } = useProductsContext();
  //
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: LOAD_MATERIAL_PROVIDERS, payload: material_providers });
  }, [material_providers]);

  useEffect(() => {
    dispatch({ type: FILTER_MATERIAL_PROVIDERS });
    dispatch({ type: SORT_MATERIAL_PROVIDERS });
  }, [material_providers, state.sort, state.filters]);

  const setGridView = () => {
    dispatch({ type: SET_MATERIAL_GRIDVIEW });
  };

  const setListView = () => {
    dispatch({ type: SET_MATERIAL_LISTVIEW });
  };

  const updateSort = (e) => {
    const value = e.target.value;
    dispatch({ type: UPDATE_MATERIAL_SORT, payload: value });
  };

  const updateFilters = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    dispatch({ type: UPDATE_MATERIAL_FILTERS, payload: { name, value } });
  };

  const clearFilters = () => {
    dispatch({ type: CLEAR_MATERIAL_FILTERS });
  };

  return (
    <MaterialFilterContext.Provider
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
    </MaterialFilterContext.Provider>
  );
};

export const useMaterialFilterContext = () => {
  return useContext(MaterialFilterContext);
};
