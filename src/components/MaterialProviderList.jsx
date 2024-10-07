import React from "react";
import { useSelector } from "react-redux";
import GridView from "./GridView";
import ListView from "./ListView";

const MaterialProvidersList = () => {
  const { filteredProviders, gridView } = useSelector(
    (state) => state.materialProviders
  );

  if (filteredProviders.length < 1) {
    return <h5>No providers found matching the criteria.</h5>;
  }

  if (!gridView) {
    return <ListView providers={filteredProviders} componentType="material" />;
  }

  return <GridView providers={filteredProviders} componentType="material" />;
};

export default MaterialProvidersList;
