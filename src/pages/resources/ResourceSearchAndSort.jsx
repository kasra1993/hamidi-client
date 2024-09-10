import React from "react";
import HomeIcon from "../../components/HomeIcon";

const ResourceSearchAndSort = ({
  searchTerm,
  onSearchChange,
  onSortChange,
}) => {
  return (
    <div className="flex justify-between p-4 ">
      <HomeIcon />
      <input
        type="text"
        placeholder="جست و جو"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="px-4 py-2 border border-gray-300 rounded-lg text-right"
      />
      {/* <select
        onChange={(e) => onSortChange(e.target.value)}
        className="ml-4 px-4 py-2 border border-gray-300 rounded-lg"
      >
        <option value="default">ترتیب بر اساس </option>
        <option value="asc">asc</option>
        <option value="desc">desc</option>
      </select> */}
    </div>
  );
};

export default ResourceSearchAndSort;
