import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateSort,
  setGridView,
  setListView,
} from "../redux/slices/materialProvidersSlice";
import { BsFillGridFill, BsList } from "react-icons/bs";
import styled from "styled-components";

const MaterialProviderSort = () => {
  const dispatch = useDispatch();

  // Accessing filteredProviders, sortOption, and gridView from the Redux store
  const { filteredProviders, sortOption, gridView } = useSelector(
    (state) => state.materialProviders
  );

  return (
    <Wrapper>
      <div className="btn-container">
        {/* Toggle between grid and list view */}
        <button
          type="button"
          className={`${gridView ? "active" : ""}`} // Using gridView correctly here
          onClick={() => dispatch(setGridView())} // Set Grid View
        >
          <BsFillGridFill />
        </button>
        <button
          type="button"
          className={`${!gridView ? "active" : ""}`} // Handle list view toggle
          onClick={() => dispatch(setListView())} // Set List View
        >
          <BsList />
        </button>
      </div>
      <div className="flex gap-2">
        <p> تامین کننده یافت شد </p>
        <p>{filteredProviders && filteredProviders.length}</p>
      </div>
      <hr />
      <form>
        <label htmlFor="sort">چینش</label>
        <select
          name="sort"
          id="sort"
          className="sort-input"
          value={sortOption} // Current sort option
          onChange={(e) => dispatch(updateSort(e.target.value))} // Update sort option in Redux
        >
          <option value="name-a">نام (a-z)</option>
          <option value="name-z">نام (z-a)</option>
        </select>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: grid;
  grid-template-columns: auto auto 1fr auto;
  align-items: center;
  margin-bottom: 2rem;
  column-gap: 2rem;
  @media (max-width: 576px) {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 0.75rem;
    .btn-container {
      width: 50px;
    }
    label {
      display: inline-block;
      margin-right: 0.5rem;
    }
  }
  @media (min-width: 768px) {
    column-gap: 2rem;
  }
  p {
    text-transform: capitalize;
    margin-bottom: 0;
  }

  .btn-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 0.5rem;
    button {
      background: transparent;
      border: 1px solid var(--clr-black);
      color: var(--clr-black);
      width: 1.5rem;
      border-radius: var(--radius);
      height: 1.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      svg {
        font-size: 1rem;
      }
    }
    .active {
      background: var(--clr-black);
      color: var(--clr-white);
    }
  }

  .sort-input {
    border-color: transparent;
    font-size: 1rem;
    text-transform: capitalize;
    padding: 0.25rem 0.5rem;
  }
  label {
    font-size: 1rem;
    text-transform: capitalize;
  }
`;

export default MaterialProviderSort;
