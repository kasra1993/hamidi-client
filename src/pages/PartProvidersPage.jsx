import React from "react";
import styled from "styled-components";

import PartFilters from "../components/PartFilters";
import PartProvidersList from "../components/PartProviderList";
import PartProviderSort from "../components/PartProviderSort";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const PartProvidersPage = () => {
  const navigate = useNavigate();
  return (
    <main>
      <Navbar />
      <Wrapper className="page">
        <button
          onClick={() => navigate(-1)}
          className="absolute border top-2 left-2 z-50 bg-white hover:bg-black hover:text-white text-black font-bold py-2 px-4 rounded"
        >
          بازگشت
        </button>
        <div className="section-center products">
          <PartFilters />
          <div>
            <PartProviderSort />
            <PartProvidersList />
          </div>
        </div>
      </Wrapper>
    </main>
  );
};

const Wrapper = styled.div`
  .products {
    display: grid;
    gap: 3rem 1.5rem;
    margin: 4rem auto;
  }
  @media (min-width: 768px) {
    .products {
      grid-template-columns: 200px 1fr;
    }
  }
`;

export default PartProvidersPage;
