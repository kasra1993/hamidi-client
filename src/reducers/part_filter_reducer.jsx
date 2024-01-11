import {
  LOAD_PART_PROVIDERS,
  SET_PART_LISTVIEW,
  SET_PART_GRIDVIEW,
  UPDATE_PART_SORT,
  SORT_PART_PROVIDERS,
  UPDATE_PART_FILTERS,
  FILTER_PART_PROVIDERS,
  CLEAR_PART_FILTERS,
} from "../actions";

const part_filter_reducer = (state, action) => {
  if (action.type === LOAD_PART_PROVIDERS) {
    return {
      ...state,
      all_providers: [...action.payload],
      filtered_providers: [...action.payload],
      filters: { ...state.filters },
    };
  }

  if (action.type === SET_PART_GRIDVIEW) {
    return {
      ...state,
      grid_view: true,
    };
  }

  if (action.type === SET_PART_LISTVIEW) {
    return {
      ...state,
      grid_view: false,
    };
  }

  if (action.type === UPDATE_PART_SORT) {
    return {
      ...state,
      sort: action.payload,
    };
  }

  if (action.type === SORT_PART_PROVIDERS) {
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

  if (action.type === UPDATE_PART_FILTERS) {
    const { name, value } = action.payload;
    return { ...state, filters: { ...state.filters, [name]: value } };
  }

  if (action.type === FILTER_PART_PROVIDERS) {
    const { all_providers } = state;
    let tempProviders = [...all_providers];
    const { text, partgroups, partnames, partgeneralids } = state.filters;

    if (text) {
      tempProviders = tempProviders.filter((product) => {
        return product.name.toLowerCase().includes(text);
      });
    }

    if (partgroups !== "all") {
      tempProviders = tempProviders.filter(
        // (providers) => providers.partgroups.title === partgroups
        (providers) => providers.partgroups[0].title === partgroups
      );
    }

    if (partnames !== "all") {
      tempProviders = tempProviders.filter(
        (providers) => providers.partnames[0].title === partnames
      );
    }
    if (partgeneralids !== "all") {
      tempProviders = tempProviders.filter(
        (providers) => providers.partgeneralids[0].title === partgeneralids
        // (providers) => providers.partgeneralids.title === partgeneralids
      );
    }

    // tempProviders = tempProviders.filter((product) => product.price <= price);

    return { ...state, filtered_providers: tempProviders };
  }

  if (action.type === CLEAR_PART_FILTERS) {
    return {
      ...state,
      filters: {
        ...state.filters,
        text: "",
        partgroups: "all",
        partnames: "all",
        partgeneralids: "all",
      },
    };
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default part_filter_reducer;
