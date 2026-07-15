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
    <div className="p-3  flex flex-col gap-8  text-xl ">
      <div className=" flex flex-col gap-6 ">
        <h5 className="text-[28px] font-semibold">Category</h5>
        <div className="tracking-[.07rem] flex flex-col gap-3">
          <div className="flex gap-3 items-center">
            <input
              type="radio"
              id=""
              name="filter"
              checked={!filters.category}
              className="w-4.5 h-4.5"
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
                  className="w-4.5 h-4.5"
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
        <h5 className="text-[28px] font-semibold">Price Range</h5>
        <div className="flex  text-black dark:text-white justify-between gap-3  mt-6">
          <input
            type="number"
            placeholder="Min"
            className="border border-gray-300 w-47  dark:border-gray-50/20  p-3.5 rounded-[12px] focus:border-[var(--primary)] focus:outline-none   dark:bg-[var(--surface)] bg-white/70"
            value={filters.minPrice}
            onChange={(e) => setFilter("minPrice", Number(e.target.value))}
          />
          <input
            type="number"
            placeholder="Max"
            className="border border-gray-300 w-47   dark:border-gray-50/20  p-3.5  rounded-[12px] focus:border-[var(--primary)] focus:outline-none  dark:bg-[var(--surface)] bg-white/70"
            value={filters.maxPrice}
            onChange={(e) => {
              setFilter("maxPrice", Number(e.target.value));
            }}
          />
        </div>
      </div>

      <div className="flex flex-col gap-5   ">
        <h5 className="text-[28px] font-semibold">Sort By</h5>
        <select
          className="border  border-gray-300 dark:border-gray-50/20 rounded-[12px] p-3 text-[22px] focus:border-[var(--primary)] focus:outline-none dark:bg-[var(--surface)] bg-white/70"
          onChange={Addsort}
        >
          <option hidden>Default</option>
          <option value="oldest">Newest</option>
          <option value="price_asc">Price : low to High</option>
          <option value="price_desc">Price : High ot low</option>
          <option value="rating">Top Rated</option>
        </select>

        <button
          className="border border-[var(--primary)] text-[var(--primary)] rounded-xl p-2.5 text-2xl hover:bg-blue-500/15 mt-3"
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
