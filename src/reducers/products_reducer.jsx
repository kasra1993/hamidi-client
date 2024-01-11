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
      // products: action.payload,
      // featured_providers,
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
