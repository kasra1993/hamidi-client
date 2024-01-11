import {
  LOAD_MATERIAL_PROVIDERS,
  SET_MATERIAL_LISTVIEW,
  SET_MATERIAL_GRIDVIEW,
  UPDATE_MATERIAL_SORT,
  SORT_MATERIAL_PROVIDERS,
  UPDATE_MATERIAL_FILTERS,
  FILTER_MATERIAL_PROVIDERS,
  CLEAR_MATERIAL_FILTERS,
} from "../actions";

const material_filter_reducer = (state, action) => {
  if (action.type === LOAD_MATERIAL_PROVIDERS) {
    return {
      ...state,
      all_providers: [...action.payload],
      filtered_providers: [...action.payload],
      filters: { ...state.filters },
    };
  }

  if (action.type === SET_MATERIAL_GRIDVIEW) {
    return {
      ...state,
      grid_view: true,
    };
  }

  if (action.type === SET_MATERIAL_LISTVIEW) {
    return {
      ...state,
      grid_view: false,
    };
  }

  if (action.type === UPDATE_MATERIAL_SORT) {
    return {
      ...state,
      sort: action.payload,
    };
  }

  if (action.type === SORT_MATERIAL_PROVIDERS) {
    const { sort, filtered_providers } = state;
    let tempProviders = [...filtered_providers];

    if (sort === "name-a") {
      tempProviders = tempProviders.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
    }
    if (sort === "name-z") {
      tempProviders = tempProviders.sort((a, b) => {
        return b.name.localeCompare(a.name);
      });
    }

    return { ...state, filtered_providers: tempProviders };
  }

  if (action.type === UPDATE_MATERIAL_FILTERS) {
    const { name, value } = action.payload;
    return { ...state, filters: { ...state.filters, [name]: value } };
  }

  if (action.type === FILTER_MATERIAL_PROVIDERS) {
    const { all_providers } = state;
    let tempProviders = [...all_providers];
    const { text, materialgroups, materialnames, materialgrades } =
      state.filters;

    if (text) {
      tempProviders = tempProviders.filter((product) => {
        return product.name.toLowerCase().includes(text);
      });
    }

    if (materialgroups !== "all") {
      tempProviders = tempProviders.filter(
        // (providers) => providers.materialgroups.title === materialgroups
        (providers) => providers.materialgroups[0].title === materialgroups
      );
    }

    if (materialnames !== "all") {
      tempProviders = tempProviders.filter(
        (providers) => providers.materialnames[0].title === materialnames
      );
    }
    if (materialgrades !== "all") {
      tempProviders = tempProviders.filter(
        (providers) => providers.materialgrades[0].title === materialgrades
        // (providers) => providers.materialgrades.title === materialgrades
      );
    }

    // tempProviders = tempProviders.filter((product) => product.price <= price);

    return { ...state, filtered_providers: tempProviders };
  }

  if (action.type === CLEAR_MATERIAL_FILTERS) {
    return {
      ...state,
      filters: {
        ...state.filters,
        text: "",
        materialgroups: "all",
        materialnames: "all",
        materialgrades: "all",
      },
    };
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default material_filter_reducer;
