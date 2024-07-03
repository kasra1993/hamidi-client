import React from "react";
import styled from "styled-components";
import { usePartFilterContext } from "../context/part_filter_context";
import { getUniqueValues } from "../utils/helpers";
import { useProductsContext } from "../context/products_context";

const PartFilters = () => {
  const {
    filters: { text, partnames, partgroups, partgeneralids },
    updateFilters,
    clearFilters,
  } = usePartFilterContext();

  const { part_groups, part_names, part_generalids } = useProductsContext();

  const partGroups = getUniqueValues(part_groups);
  const partNames = getUniqueValues(part_names);
  const partGeneralIds = getUniqueValues(part_generalids);

  return (
    <Wrapper>
      <div className="content border p-4 rounded-2xl w-full">
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="form-control">
            <input
              type="text"
              name="text"
              placeholder="جستجو"
              className="search-input text-right"
              value={text}
              onChange={updateFilters}
            />
          </div>
          <div className="form-control">
            <input
              type="text"
              name="text"
              placeholder="جستجوی تامین کننده"
              className="search-input text-right"
              value={text}
              onChange={updateFilters}
            />
          </div>
          <div className="form-control">
            <input
              type="text"
              name="text"
              placeholder="جستجوی گروه"
              className="search-input text-right"
              // value={text}
              // onChange={updateFilters}
            />
          </div>
          <div className="form-control">
            <input
              type="text"
              name="text"
              placeholder="جستجوی نام مواد"
              className="search-input text-right"
              // value={text}
              // onChange={updateFilters}
            />
          </div>
          <div className="form-control">
            <input
              type="text"
              name="text"
              placeholder="جستجوی گرید مواد"
              className="search-input text-right"
              // value={text}
              // onChange={updateFilters}
            />
          </div>
          <div className="form-control">
            <h5>Part Groups</h5>
            <div className="">
              <select
                name="partgroups"
                value={partgroups}
                onChange={updateFilters}
                className="w-full border rounded-lg p-2"
              >
                {partGroups &&
                  partGroups.map((c, index) => {
                    return (
                      <option value={c} key={index}>
                        {c}
                      </option>
                    );
                  })}
              </select>
            </div>
          </div>
          <div className="form-control">
            <h5>Part Names</h5>
            <select
              name="partnames"
              value={partnames}
              onChange={updateFilters}
              className="w-full border rounded-lg p-2"
            >
              {partNames &&
                partNames.map((c, index) => {
                  return (
                    <option value={c} key={index}>
                      {c}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="form-control">
            <h5>Part General Ids</h5>
            <select
              name="partgeneralids"
              value={partgeneralids}
              onChange={updateFilters}
              className="w-full border rounded-lg p-2"
            >
              {partGeneralIds &&
                partGeneralIds.map((c, index) => {
                  return (
                    <option value={c} key={index}>
                      {c}
                    </option>
                  );
                })}
            </select>
          </div>

          <button
            type="button"
            className="clear-btn text-center w-full"
            onClick={clearFilters}
          >
            پاک کردن فیلتر ها
          </button>
        </form>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .form-control {
    margin-bottom: 1.25rem;
    h5 {
      margin-bottom: 0.5rem;
    }
  }

  .search-input {
    width: 100%;
    padding: 0.5rem;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }

  button {
    display: block;
    margin: 0.25em 0;
    padding: 0.25rem 0;
    text-transform: capitalize;
    background: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
  .active {
    border-color: var(--clr-grey-5);
  }
  .company {
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    padding: 0.25rem;
  }
  .colors {
    display: flex;
    align-items: center;
  }
  .color-btn {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.5rem;
      color: var(--clr-white);
    }
  }
  .all-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    opacity: 0.5;
  }
  .active {
    opacity: 1;
  }
  .all-btn .active {
    text-decoration: underline;
  }
  .price {
    margin-bottom: 0.25rem;
  }
  .shipping {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    text-transform: capitalize;
    column-gap: 0.5rem;
    font-size: 1rem;
    max-width: 200px;
  }
  .clear-btn {
    background: var(--clr-red-dark);
    color: var(--clr-white);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
  }
  @media (min-width: 768px) {
    .content {
      position: sticky;
      top: 1rem;
    }
  }
`;

export default PartFilters;
