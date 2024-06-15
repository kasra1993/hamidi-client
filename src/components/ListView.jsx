import React from "react";
import styled from "styled-components";
import { formatPrice } from "../utils/helpers";
import { Link } from "react-router-dom";
const ListView = ({ products }) => {
  const defaultImage = "/default-provider-image.png";
  return (
    <Wrapper>
      {products.map((product) => {
        const { _id, image, name, phone, description } = product;
        return (
          <article key={_id}>
            <img src={image?.url || defaultImage} alt={name} />
            <div>
              <h4>{name}</h4>
              <h5 className="price">{phone}</h5>
              <p>{description.substring(0, 150)}...</p>
              <Link
                to={`/provider/${_id}`}
                className="btn"
                style={{ backgroundColor: "#333" }}
              >
                بیشتر
              </Link>
            </div>
          </article>
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: grid;
  row-gap: 3rem;
  article {
    border: 1px solid black;
    border-radius: 10px;
    padding: 0.5rem;
  }
  img {
    width: 100%;
    display: block;
    width: 300px;
    height: 200px;
    object-fit: cover;
    border-radius: var(--radius);
    margin-bottom: 1rem;
    border: 1px solid black;
  }
  h4 {
    margin-bottom: 0.5rem;
  }
  .price {
    color: var(--clr-primary-6);
    margin-bottom: 0.75rem;
  }
  p {
    max-width: 45em;
    margin-bottom: 1rem;
  }
  .btn {
    font-size: 1rem;
    padding: 0.25rem 1rem;
  }
  @media (min-width: 992px) {
    article {
      display: grid;
      grid-template-columns: auto 1fr;
      column-gap: 2rem;
      align-items: center;
    }
  }
`;

export default ListView;
