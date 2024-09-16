import React, { useEffect } from "react";
import styled from "styled-components";
// import { getUniqueValues } from "../utils/helpers";
import { useDispatch, useSelector } from "react-redux";
import {
  updateFilters,
  clearFilters,
  fetchMaterialGrades,
  fetchMaterialGroups,
  fetchMaterialNames,
} from "../redux/slices/materialProvidersSlice";

const MaterialFilters = () => {
  const dispatch = useDispatch();
  const { filters, materialGroups, materialNames, materialGrades } =
    useSelector((state) => state.materialProviders);

  useEffect(() => {
    dispatch(fetchMaterialGroups());
    dispatch(fetchMaterialNames());
    dispatch(fetchMaterialGrades());
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log("name", name, "value", value);
    dispatch(updateFilters({ name, value }));
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
  };

  return (
    <Wrapper>
      <div className="content border p-4 rounded-2xl">
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="form-control">
            <input
              type="text"
              name="searchProviderName"
              placeholder="جستجوی تامین کننده"
              className="search-input text-right"
              value={filters.searchProviderName}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-control">
            <input
              type="text"
              name="searchMaterialGroup"
              placeholder="جستجوی گروه"
              className="search-input text-right"
              value={filters.searchMaterialGroup}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-control">
            <input
              type="text"
              name="searchMaterialName"
              placeholder="جستجوی نام مواد"
              className="search-input text-right"
              value={filters.searchMaterialName}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-control">
            <input
              type="text"
              name="searchMaterialGrade"
              placeholder="جستجوی گرید مواد"
              className="search-input text-right"
              value={filters.searchMaterialGrade}
              onChange={handleInputChange}
            />
          </div>
          <div className="my-5">
            <h5>گروه ماده</h5>
            <select
              name="materialGroup"
              value={filters.materialGroup}
              onChange={handleInputChange}
              className="w-full border rounded-lg p-2 text-right  text-sm"
            >
              <option value="">انتخاب گروه ماده</option>
              {materialGroups &&
                materialGroups.map((group) => (
                  <option key={group._id} value={group.title}>
                    {group.title}
                  </option>
                ))}
            </select>
          </div>

          {/* Material Name Dropdown */}
          <div className="my-5">
            <h5>نام ماده</h5>
            <select
              name="materialName"
              value={filters.materialName}
              onChange={handleInputChange}
              className="w-full border rounded-lg p-2 text-right  text-sm"
            >
              <option value="">انتخاب نام ماده</option>
              {materialNames &&
                materialNames.map((name) => (
                  <option key={name._id} value={name.title}>
                    {name.title}
                  </option>
                ))}
            </select>
          </div>

          {/* Material Grade Dropdown */}
          <div className="my-5">
            <h5>درجه ماده</h5>
            <select
              name="materialGrade"
              value={filters.materialGrade}
              onChange={handleInputChange}
              className="w-full border rounded-lg p-2 text-right  text-sm"
            >
              <option value="">انتخاب درجه ماده</option>
              {materialGrades &&
                materialGrades.map((grade) => (
                  <option key={grade._id} value={grade.title}>
                    {grade.title}
                  </option>
                ))}
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

export default MaterialFilters;
