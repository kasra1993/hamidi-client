import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Product from "./Product";
import { Link } from "react-router-dom";
import Loading from "./Loading";
import VirtualizedList from "./VirtualizedList";

const GridView = ({ providers, componentType }) => {
  const columnCount = 3; // Number of columns for grid layout (adjust as needed)
  const rowCount = Math.ceil(providers.length / columnCount); // Calculate number of rows
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    // Function to set the container width dynamically
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth);
      }
    };

    // Initial setting
    updateWidth();

    // Add event listener for resizing
    window.addEventListener("resize", updateWidth);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  }, []);

  const renderProduct = (product) => (
    <Product key={product._id} {...product} componentType={componentType} />
  );
  return (
    <>
      <Wrapper ref={containerRef}>
        <div className="products-container">
          {providers && (
            <VirtualizedList
              items={providers}
              height={800} // Adjust height as needed
              width={containerWidth} // Dynamically set width based on container width
              columnCount={columnCount} // Number of columns in the grid
              rowCount={rowCount} // Number of rows in the grid
              itemHeight={400} // Adjust height of each item (based on product card height)
              itemWidth={350} // Adjust width of each item (based on product card width)
              renderItem={renderProduct} // Render function for each product
              listType="grid"
            />
          )}
        </div>
      </Wrapper>
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
