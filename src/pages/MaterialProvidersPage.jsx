import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { fetchMaterialProviders } from "../redux/slices/materialProvidersSlice";
import MaterialFilters from "../components/MaterialFilters";
import MaterialProvidersList from "../components/MaterialProviderList";
import MaterialProviderSort from "../components/MaterialProviderSort";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
// import Navbar from "../components/Navbar";

const MaterialProvidersPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, filteredProviders, filters } = useSelector(
    (state) => state.materialProviders
  );

  const areFiltersUpdated =
    filters.searchProviderName ||
    filters.searchMaterialGroup ||
    filters.searchMaterialName ||
    filters.searchMaterialGrade ||
    filters.materialGroup ||
    filters.materialName ||
    filters.materialGrade;

  useEffect(() => {
    dispatch(fetchMaterialProviders());
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
      <Wrapper className="page ">
        <button
          onClick={() => navigate("/vendors")}
          className="absolute border top-2 left-2 z-50 bg-white hover:bg-black hover:text-white text-black font-bold py-2 px-4 rounded"
        >
          بازگشت
        </button>
        <div className="section-center products">
          <MaterialFilters />

          <div>
            <MaterialProviderSort />
            {areFiltersUpdated ? (
              filteredProviders.length > 0 ? (
                <MaterialProvidersList />
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

export default MaterialProvidersPage;
