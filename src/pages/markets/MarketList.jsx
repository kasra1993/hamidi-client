import React, { useEffect } from "react";
import MarketSearchAndSort from "./MarketSearchAndSort";
import MarketCard from "./MarketCard";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchMarkets,
  updateSearchTerm,
  updateSortField,
} from "../../redux/slices/marketSlice";
import Loading from "../../components/Loading";

const MarketList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { filteredMarkets, searchTerm, sortField, loading, error } =
    useSelector((state) => state.markets);

  useEffect(() => {
    dispatch(fetchMarkets());
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
        <MarketSearchAndSort
          searchTerm={searchTerm}
          onSearchChange={(term) => dispatch(updateSearchTerm(term))}
          onSortChange={(field) => dispatch(updateSortField(field))}
        />
      </div>
      <div className="flex flex-wrap gap-10 justify-center border border-slate-200 mx-5 rounded-3xl py-10">
        {filteredMarkets.map((market, index) => (
          <MarketCard
            key={index}
            title={market.title}
            description={market.description}
            image={market.image}
            id={market._id}
          />
        ))}
      </div>
    </div>
  );
};

export default MarketList;
