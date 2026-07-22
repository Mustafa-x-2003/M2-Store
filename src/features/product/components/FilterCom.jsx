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
    <div className="p-2 flex flex-col gap-6 text-base">
      <div className=" flex flex-col gap-6 ">
        <h5 className="text-xl font-semibold">Category</h5>
        <div className="flex flex-col gap-2 text-sm">
          <div className="flex gap-3 items-center">
            <input
              type="radio"
              id=""
              name="filter"
              checked={!filters.category}
              className="w-3 h-3"
              onChange={(e) => addCAt(e)}
            />
            <p>All </p>
          </div>

          {categories?.map((item) => {
            return (
              <div className="flex gap-3 items-center capitalize" key={item}>
                <input
                  type="radio"
                 checked={ filters.category == item}
                  name="filter"
                  className="w-3 h-3"
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
        <h5 className="text-xl font-semibold">Price Range</h5>
        <div className="flex  text-black dark:text-white justify-between gap-3  mt-3">
          <input
            type="number"
            placeholder="Min"
            className="w-full border border-gray-300 dark:border-gray-50/20 px-3 py-2 rounded-lg text-sm focus:border-[var(--primary)] focus:outline-none dark:bg-[var(--surface)] bg-white/70"
            value={filters.minPrice}
            onChange={(e) => setFilter("minPrice", Number(e.target.value))}
          />
          <input
            type="number"
            placeholder="Max"
            className="w-full border border-gray-300 dark:border-gray-50/20 px-3 py-2 rounded-lg text-sm focus:border-[var(--primary)] focus:outline-none dark:bg-[var(--surface)] bg-white/70" 
            value={filters.maxPrice}
            onChange={(e) => {
              setFilter("maxPrice", Number(e.target.value));
            }}
          />
        </div>
      </div>

      <div className="flex flex-col gap-3   ">
        <h5 className="text-xl font-semibold">Sort By</h5>
        <select
          className="border  border-gray-300 dark:border-gray-50/20 rounded-[12px] text-sm py-2 px-3 focus:border-[var(--primary)] focus:outline-none dark:bg-[var(--surface)] bg-white/70"
          onChange={Addsort}
        >
          <option hidden>Default</option>
          <option value="oldest">Newest</option>
          <option value="price_asc">Price : low to High</option>
          <option value="price_desc">Price : High ot low</option>
          <option value="rating">Top Rated</option>
        </select>

        <button
          className="border border-[var(--primary)] text-[var(--primary)] text-sm py-2 rounded-lg hover:bg-blue-500/15 mt-3"
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
