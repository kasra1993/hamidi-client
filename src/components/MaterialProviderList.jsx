import React from "react";
import { useMaterialFilterContext } from "../context/material_filter_context";
import GridView from "./GridView";
import ListView from "./ListView";

const uniqueByProperty = (arr, prop) => {
  const seen = new Set();
  return arr.filter((item) => {
    const duplicate = seen.has(item[prop]);
    seen.add(item[prop]);
    return !duplicate;
  });
};

const MaterialProvidersList = () => {
  const { filtered_providers: products, grid_view } =
    useMaterialFilterContext();
  const filteredProviders = uniqueByProperty(products, "name");
  console.log(products, "products");
  console.log(filteredProviders, "filteredProviders");

  if (products.length < 1) {
    return (
      <h5 style={{ textTransform: "none" }}>
        Sorry, no products matched your search.
      </h5>
    );
  }

  if (grid_view === false) {
    return <ListView products={filteredProviders} />;
  }
  return <GridView products={filteredProviders} />;
};

export default MaterialProvidersList;
