import React from "react";
import styled from "styled-components";
import Product from "./Product";
import { Link } from "react-router-dom";

const GridView = ({ products }) => {
  return (
    <Wrapper>
      <div className="products-container">
        {products &&
          products.map((product) => {
            return <Product key={product._id} {...product} />;
          })}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  img {
    object-fit: contain;
  }

  .products-container {
    display: grid;
    gap: 1rem 1rem;
  }

  @media (min-width: 992px) {
    .products-container {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media (min-width: 1170px) {
    .products-container {
      grid-template-columns: repeat(3, 1fr);
    }
  }
`;

export default GridView;
