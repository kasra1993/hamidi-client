import React from "react";
import { usePartFilterContext } from "../context/part_filter_context";
import GridView from "./GridView";
import ListView from "./ListView";

const PartProvidersList = () => {
  const { filtered_providers: products, grid_view } = usePartFilterContext();
  console.log(products, "filtered products");

  if (products.length < 1) {
    return (
      <h5 style={{ textTransform: "none" }}>
        Sorry, no products matched your search.
      </h5>
    );
  }

  if (grid_view === false) {
    return <ListView products={products} />;
  }
  return <GridView products={products} />;
};

export default PartProvidersList;
