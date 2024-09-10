import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchProducts,
  updateSearchTerm,
  updateSortField,
} from "../../redux/slices/productInfoSlice";
import ProductInfoCard from "./ProductInfoCard";
import SearchSort from "./SearchAndSort";
import Loading from "../../components/Loading";

const ProductsInfoList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { filteredProducts, searchTerm, sortField, loading, error } =
    useSelector((state) => state.productInfo);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) return <Loading />;
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
        <SearchSort
          searchTerm={searchTerm}
          onSearchChange={(term) => dispatch(updateSearchTerm(term))}
          onSortChange={(field) => dispatch(updateSortField(field))}
        />
      </div>
      <div className="flex flex-wrap gap-10 justify-center border border-slate-200 mx-5 rounded-3xl py-10">
        {filteredProducts.map((product) => (
          <ProductInfoCard
            key={product._id}
            title={product.title}
            description={product.description}
            image={product.image}
            id={product._id}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductsInfoList;
