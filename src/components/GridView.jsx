import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Product from "./Product";
import { Link } from "react-router-dom";
import Loading from "./Loading";

const GridView = ({ providers, componentType }) => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500); // Simulate loading for 2 seconds

    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Wrapper>
          <div className="products-container">
            {providers &&
              providers.map((product) => {
                return (
                  <Product
                    key={product._id}
                    {...product}
                    componentType={componentType}
                  />
                );
              })}
          </div>
        </Wrapper>
      )}
    </>
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
