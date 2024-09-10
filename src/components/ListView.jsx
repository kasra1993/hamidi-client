import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Loading from "./Loading";

const ListView = ({ providers, componentType }) => {
  const defaultImage = "/default-provider-image.png";
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
          {providers &&
            providers.map((product) => {
              const { _id, image, name, company_name, isVerified } = product;
              return (
                <article key={_id}>
                  <img src={image?.url || defaultImage} alt={name} />
                  <div>
                    <h4>{name || company_name}</h4>
                    <Link
                      to={`/${
                        isVerified ? "verified" : componentType
                      }/provider/${_id}`}
                      className="btn"
                    >
                      اطلاعات بیشتر
                    </Link>
                  </div>
                </article>
              );
            })}
        </Wrapper>
      )}
    </>
  );
};

const Wrapper = styled.section`
  display: grid;
  row-gap: 3rem;
  article {
    border: 1px solid black;
    border-radius: 10px;
    padding: 0.5rem;
    height: 200px;
  }
  img {
    width: 100%;
    display: block;
    width: 300px;
    height: 180px;
    object-fit: contain;
    border-radius: var(--radius);
    margin-bottom: 1rem;
    border: 1px solid #00000033;
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
