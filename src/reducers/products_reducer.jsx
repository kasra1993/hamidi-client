import {
  GET_PROVIDERS_BEGIN,
  GET_PROVIDERS_SUCCESS,
  GET_PROVIDERS_ERROR,
} from "../actions";

const providers_reducer = (state, action) => {
  if (action.type === GET_PROVIDERS_BEGIN) {
    return { ...state, providers_loading: true };
  }

  if (action.type === GET_PROVIDERS_SUCCESS) {
    return {
      ...state,
      providers_loading: false,
      part_providers: action.payload.partProviders,
      material_providers: action.payload.materialProviders,
      material_groups: action.payload.materialGroups,
      material_grades: action.payload.materialGrades,
      material_names: action.payload.materialNames,
      part_groups: action.payload.partGroups,
      part_generalids: action.payload.partGeneralIds,
      part_names: action.payload.partNames,
      products: action.payload.products,
      verifiedProviders: action.payload.verifiedProviders,
    };
  }

  if (action.type === GET_PROVIDERS_ERROR) {
    return {
      ...state,
      providers_loading: false,
      providers_error: true,
    };
  }

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default providers_reducer;
