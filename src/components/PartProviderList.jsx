import React from "react";
import { useSelector } from "react-redux";
import GridView from "./GridView";
import ListView from "./ListView";

// const uniqueByProperty = (arr, prop) => {
//   const seen = new Set();
//   return arr.filter((item) => {
//     const duplicate = seen.has(item[prop]);
//     seen.add(item[prop]);
//     return !duplicate;
//   });
// };

const PartProvidersList = () => {
  const { filteredProviders, gridView } = useSelector(
    (state) => state.partProviders
  );

  if (filteredProviders.length < 1) {
    return <h5>No providers found matching the criteria.</h5>;
  }

  if (!gridView) {
    return <ListView providers={filteredProviders} componentType="part" />;
  }
  return <GridView providers={filteredProviders} componentType="part" />;
};

export default PartProvidersList;
