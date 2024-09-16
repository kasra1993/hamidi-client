import React, { useEffect } from "react";
import ResourceSearchAndSort from "./ResourceSearchAndSort";
import ResourceCard from "./ResourceCard";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchResources,
  updateSearchTerm,
  updateSortField,
} from "../../redux/slices/resourceSlice";
import Loading from "../../components/Loading";

const ResourceList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { filteredResources, searchTerm, sortField, loading, error } =
    useSelector((state) => state.resources);

  useEffect(() => {
    dispatch(fetchResources());
  }, [dispatch]);

  if (loading)
    return (
      <div>
        <Loading />{" "}
      </div>
    );
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex flex-col gap-10">
      <button
        onClick={() => navigate(-1)}
        className=" z-50 bg-white hover:bg-black hover:text-white text-black font-bold py-2 px-4 rounded w-20 absolute left-[5rem] top-[2rem]"
      >
        بازگشت
      </button>
      <div className="bg-black my-2 flex justify-center">
        <ResourceSearchAndSort
          searchTerm={searchTerm}
          onSearchChange={(term) => dispatch(updateSearchTerm(term))}
          onSortChange={(field) => dispatch(updateSortField(field))}
        />
      </div>
      <div className="flex flex-wrap gap-10 justify-center border border-slate-200 mx-5 rounded-3xl py-10">
        {filteredResources.map((resource, index) => (
          <ResourceCard
            key={index}
            title={resource.title}
            description={resource.description}
            image={resource.image}
            id={resource._id}
          />
        ))}
      </div>
    </div>
  );
};

export default ResourceList;
