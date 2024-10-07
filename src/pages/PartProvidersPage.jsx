import React, { useEffect } from "react";
import styled from "styled-components";
import PartFilters from "../components/PartFilters";
import PartProvidersList from "../components/PartProviderList";
import PartProviderSort from "../components/PartProviderSort";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/Loading";
import { fetchPartProviders } from "../redux/slices/partProvidersSlice";

const PartProvidersPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error, filteredProviders, filters } = useSelector(
    (state) => state.partProviders
  );

  const areFiltersUpdated =
    filters.searchPartProviderName ||
    filters.searchPartGroup ||
    filters.searchPartName ||
    filters.searchPartGeneralId ||
    filters.partGroup ||
    filters.partName ||
    filters.partGeneralId;

  useEffect(() => {
    dispatch(fetchPartProviders());
  }, [dispatch]);

  if (loading)
    return (
      <div>
        <Loading />{" "}
      </div>
    );
  if (error) return <div>Error: {error}</div>;

  return (
    <main>
      {/* <Navbar /> */}
      <Wrapper className="page">
        <button
          onClick={() => navigate("/vendors")}
          className="absolute border top-2 left-2 z-50 bg-white hover:bg-black hover:text-white text-black font-bold py-2 px-4 rounded"
        >
          بازگشت
        </button>
        <div className="section-center products">
          <PartFilters />
          <div>
            <PartProviderSort />
            {areFiltersUpdated ? (
              filteredProviders.length > 0 ? (
                <PartProvidersList />
              ) : (
                <>
                  <p className="text-2xl mt-32">
                    {" "}
                    تامین کننده ای یافت نشد دوباره تلاش کنید
                  </p>
                </>
              )
            ) : (
              <p className="text-2xl mt-32">جستجوی خود را آغاز کنید</p>
            )}
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
