import { useEffect, useState } from "react";
import { GetAllCategory } from "../service/ProductPageService";
import useProductsFilter from "../../../hooks/useProductsFilter";
import { number } from "motion";
export default function FilterCom({ setfilters, filters, products  , setshowModel}) {
  const { setFilter, getFilter, searchParams, setsearchParams } =
    useProductsFilter();
  const [categories, setcategories] = useState([]);
  useEffect(() => {
    GetAllCategory()
      .then((res) => {
        setcategories([...new Set(res.products.map((item) => item.category))]);
      })
      .catch((error) => {
        console.error("Error while fetching categories data", error);
      });
  }, []);

  const addCAt = (e) => {
    setFilter("category", e.target.id);
    setshowModel(false)
  };
  const Addsort = (e) => {
    setFilter("sort", e.target.value);
    setshowModel(false)
  };
  return (
    <div className="p-3  flex flex-col gap-6  text-xl ">
      <div className="text-[var(--text)] flex flex-col gap-6 ">
        <h5 className="text-2xl ">Category</h5>
        <div className="tracking-[.12rem] flex flex-col gap-3">
          <div className="flex gap-3 items-center">
            <input
              type="radio"
              id=""
              name="filter"
              checked={!filters.category}
              className="w-5 h-5"
              onChange={(e) => addCAt(e)}
            />
            <p>All </p>
          </div>

          {categories?.map((item) => {
            return (
              <div className="flex gap-3 items-center" key={item}>
                <input
                  type="radio"
                 checked={ filters.category == item}
                  name="filter"
                  className="w-5 h-5"
                  id={item}
                  onChange={(e) => addCAt(e)}
                />
                <p>{item}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <h5 className="text-2xl">Price Range</h5>
        <div className="flex justify-between gap-3  mt-6">
          <input
            type="number"
            placeholder="Min"
            className="border border-gray-600 w-40 p-2 rounded focus:border-[var(--primary)] focus:outline-none   bg-[var(--surface-secondary)]"
            value={filters.minPrice}
            onChange={(e) => setFilter("minPrice", Number(e.target.value))}
          />
          <input
            type="number"
            placeholder="Max"
            className="border border-gray-600 w-40 p-2 rounded focus:border-[var(--primary)] focus:outline-none  bg-[var(--surface-secondary)]"
            value={filters.maxPrice}
            onChange={(e) => {
              setFilter("maxPrice", Number(e.target.value));
            }}
          />
        </div>
      </div>

      <div className="flex flex-col gap-5   ">
        <h5 className="text-2xl">Sort By</h5>
        <select
          className="border rounded p-3 py-2 text-[19px] focus:border-[var(--primary)] focus:outline-none bg-[var(--surface-secondary)]"
          onChange={Addsort}
        >
          <option hidden>Default</option>
          <option value="oldest">Newest</option>
          <option value="price_asc">Price : low to High</option>
          <option value="price_desc">Price : High ot low</option>
          <option value="rating">Top Rated</option>
        </select>

        <button
          className="border border-[var(--primary)] text-[var(--primary)] rounded p-1 text-xl hover:bg-blue-500/15 mt-10"
          onClick={() => {
            setsearchParams({});
          }}
        >
          Clear All Filters
        </button>
      </div>
    </div>
  );
}
