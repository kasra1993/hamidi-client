import React from "react";
import { usePartFilterContext } from "../context/part_filter_context";
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

const PartProvidersList = () => {
  const { filtered_providers: products, grid_view } = usePartFilterContext();
  const filteredProviders = uniqueByProperty(products, "name");

  if (products.length < 1) {
    return (
      <h5 style={{ textTransform: "none" }}>
        Sorry, no providers matched your search.
      </h5>
    );
  }

  if (grid_view === false) {
    return <ListView products={filteredProviders} componentType="part" />;
  }
  return <GridView products={filteredProviders} componentType="part" />;
};

export default PartProvidersList;
