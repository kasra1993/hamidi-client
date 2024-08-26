import React, { useState } from "react";
import { useProductsContext } from "../../context/products_context";
import ProductInfoCard from "./ProductInfoCard";
import SearchSort from "./SearchAndSort";

const ProductsInfoList = () => {
  const { products } = useProductsContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("default");

  const filteredProducts = products
    .filter(
      (product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      // ||
      //   product.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortField === "title") {
        if (sortOrder === "asc") {
          return a.title[0].localeCompare(b.title[0]);
        } else if (sortOrder === "desc") {
          return b.title[0].localeCompare(a.title[0]);
        }
      }
      return 0;
    });

  return (
    <div className="flex flex-col gap-10">
      <div className="bg-black my-2 flex justify-center">
        <SearchSort
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onSortChange={setSortField}
        />
      </div>
      <div className="flex flex-wrap gap-10 justify-center border border-slate-200 mx-5 rounded-3xl py-10">
        {filteredProducts.map((product, index) => (
          <ProductInfoCard
            key={index}
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
