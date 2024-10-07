import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  updateFilters,
  clearFilters,
  fetchPartGeneralIds,
  fetchPartGroups,
  fetchPartNames,
} from "../redux/slices/partProvidersSlice";

const PartFilters = () => {
  const dispatch = useDispatch();
  const { filters, partGroups, partNames, partGeneralIds } = useSelector(
    (state) => state.partProviders
  );

  useEffect(() => {
    dispatch(fetchPartGeneralIds());
    dispatch(fetchPartGroups());
    dispatch(fetchPartNames());
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateFilters({ name, value })); // Make sure this action is dispatched correctly
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
  };

  return (
    <Wrapper>
      <div className="content border p-4 rounded-2xl w-full">
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="form-control">
            <input
              type="text"
              name="searchPartProviderName"
              placeholder="جستجوی تامین کننده"
              className="search-input text-right"
              value={filters.searchPartProviderName}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-control">
            <input
              type="text"
              name="searchPartGroup"
              placeholder="جستجوی گروه قطعه"
              className="search-input text-right"
              value={filters.searchPartGroup}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-control">
            <input
              type="text"
              name="searchPartName"
              placeholder="جستجوی نام قطعه "
              className="search-input text-right"
              value={filters.searchPartName}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-control">
            <input
              type="text"
              name="searchPartGeneralId"
              placeholder="جستجوی مشخصه عمومی "
              className="search-input text-right"
              value={filters.searchPartGeneralId}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-control">
            <h5>گروه قطعه</h5>
            <div className="">
              <select
                name="partGroup"
                value={filters.partGroup}
                onChange={handleInputChange}
                className="w-full border rounded-lg p-2 text-right  text-sm"
              >
                <option value="">انتخاب گروه</option>

                {partGroups &&
                  partGroups.map((group) => {
                    return (
                      <option value={group.title} key={group._id}>
                        {group.title}
                      </option>
                    );
                  })}
              </select>
            </div>
          </div>
          <div className="form-control">
            <h5>نام قطعه</h5>
            <select
              name="partName"
              value={filters.partName}
              onChange={handleInputChange}
              className="w-full border rounded-lg p-2 text-right  text-sm"
            >
              <option value="">انتخاب نام</option>

              {partNames &&
                partNames.map((name) => {
                  return (
                    <option value={name.title} key={name._id}>
                      {name.title}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="form-control">
            <h5>مشخصه عمومی قطعه</h5>
            <select
              name="partGeneralId"
              value={filters.partGeneralId}
              onChange={handleInputChange}
              className="w-full border rounded-lg p-2 text-right text-sm"
            >
              <option value="">انتخاب مشخصه</option>
              {partGeneralIds &&
                partGeneralIds.map((id) => {
                  return (
                    <option value={id.title} key={id._id}>
                      {id.title}
                    </option>
                  );
                })}
            </select>
          </div>

          <button
            type="button"
            className="clear-btn text-center w-full"
            onClick={handleClearFilters}
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
