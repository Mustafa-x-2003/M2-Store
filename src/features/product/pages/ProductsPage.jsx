import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import FilterCom from "../components/FilterCom";
import { GetProduct } from "../service/ProductPageService";
import ProductSkelton from "../components/ProductSkelton";
import "react-loading-skeleton/dist/skeleton.css";
import ProductCard from "../../../components/common/ProductCards/ProductCard";
import useProductsFilter from "../../../hooks/useProductsFilter";
import { LuSlidersHorizontal } from "react-icons/lu";
import { RxCross2 } from "react-icons/rx";
import { CiSearch } from "react-icons/ci";
export default function ProductsPage() {
  const [isloading, setisloading] = useState(true);
  const [products, setproducts] = useState([]);
  const [pages, setpages] = useState([]);
  const [filters, setfilters] = useState({
    search: "",
    category: "",
    minPrice: "",
    maxPrice: "",
    sort: "",
    page: 1,
    limit: 6,
  });
  const { setFilter, getFilter, serachParams, setsearchParams } =
    useProductsFilter();
  const [showMode, setshowModel] = useState(false);
  useEffect(() => {
    setfilters({
      ...filters,
      search: serachParams.get("search") || "",
      category: serachParams.get("category") || "",
      minPrice: serachParams.get("minPrice") || "",
      maxPrice: serachParams.get("maxPrice") || "",
      sort: serachParams.get("sort") || "",
      page: Number(serachParams.get("page")) || 1,
    });
  }, [serachParams]);
  useEffect(() => {
    setisloading(true);
    const res = GetProduct({ filters })
      .then((res) => {
        setproducts(res.products);
        setpages(
          Array.from({ length: res.totalPages }, (value, index) => index + 1),
        );
        setisloading(false);
      })
      .catch((err) => {
        console.error("error while fetching product data " + err);
      });
  }, [filters]);

  const getSortLabel = (sort) => {
    switch (sort) {
      case "oldest":
        return "Created At";
      case "price_asc":
        return "Price";
      case "price_desc":
        return "- Price";
      case "rating":
        return "Top Rating";
      default:
        return sort;
    }
  };

  const activeFilters = [
    {
      key: "category",
      value: filters.category,
      label: filters.category,
      onClear: () => setFilter("category", ""),
    },
    {
      key: "minPrice",
      value: filters.minPrice,
      label: filters.minPrice ? `min : ${filters.minPrice}` : "",
      onClear: () => setFilter("minPrice", ""),
    },
    {
      key: "maxPrice",
      value: filters.maxPrice,
      label: filters.maxPrice ? `max : ${filters.maxPrice}` : "",
      onClear: () => setFilter("maxPrice", ""),
    },
    {
      key: "sort",
      value: filters.sort,
      label: getSortLabel(filters.sort),
      onClear: () => setFilter("sort", ""),
    },
  ].filter((item) => item.value);

  const clearAllFilters = () => {
    if (getFilter("search")) {
      setsearchParams({ search: getFilter("search") });
    } else {
      setsearchParams({});
    }
  };

  const badgeClass =
    "text-xl p-1 px-4 rounded-full bg-blue-500/15 text-blue-400";

  return (
    <section className="  pt-20 bg-[var(--surface)] ">
      <div className="flex flex-col gap-2 max-w-7xl mx-auto w-full px-5">
        {/* Search */}
        <div className="flex justify-between gap-4 relative mt-5">
          <CiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-xl text-gray-400" />

          <input
            type="text"
            value={filters.search}
            placeholder="Search products..."
            className="w-full h-12 rounded-xl border border-[var(--border)] bg-[var(--input-bg)]  pl-12 pr-4 text-base font-medium text-[var(--text)]  shadow-sm focus:outline-none focus:border-[var(--input-focus)]  transition-colors duration-300"
            onChange={(e) => {
              setFilter("search", e.target.value);
            }}
          />

          <button
            className="lg:hidden w-12 h-12 rounded-xl border border-gray-300 bg-[var(--surface-secondary)] flex items-center justify-center"
            onClick={() => setshowModel(true)}
          >
            <LuSlidersHorizontal className="text-2xl" />
          </button>

          {showMode && (
            <div className="absolute right-0 top-0 z-50 bg-[var(--surface)] w-[320px] p-5 h-screen shadow-xl">
              <button
                className="ml-auto block"
                onClick={() => setshowModel(false)}
              >
                <RxCross2 className="text-2xl" />
              </button>

              <FilterCom
                filters={filters}
                setfilters={setfilters}
                products={products}
                setshowModel={setshowModel}
              />
            </div>
          )}
        </div>

        {/* Active Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {activeFilters.map((filter) => (
            <button
              key={filter.key}
              className="px-3 py-1 rounded-full bg-blue-100 text-blue-600 text-sm font-medium hover:bg-blue-200 transition"
              onClick={filter.onClear}
            >
              {filter.label}
            </button>
          ))}

          {activeFilters.length > 0 && (
            <button
              className="px-3 py-1 rounded-full border border-red-300 text-red-500 text-sm font-medium hover:bg-red-50 transition"
              onClick={clearAllFilters}
            >
              Clear
            </button>
          )}
        </div>
        <div className="flex gap-8 items-start">
          <div className="hidden lg:block w-[280px] shrink-0">
            <FilterCom
              filters={filters}
              setfilters={setfilters}
              products={products}
            />
          </div>
          <div className="cardsSide flex-1">
            <ProductSkelton isloading={isloading}>
              <div className="grid w-full grid-cols-1 gap-4  md:grid-cols-2 lg:grid-cols-4 ">
                {products?.length > 0 ? (
                  products.map((item) => {
                    return <ProductCard key={item._id} product={item} />;
                  })
                ) : (
                  <div className=" flex col-span-4  justify-center xl:ml-[-230px]   text-4xl">
                    No Product Found
                  </div>
                )}
              </div>
            </ProductSkelton>

            <div className="pagination  w-[100%]  py-5  flex justify-between items-center">
              <button
                disabled={filters.page === 1}
                className=" disabled:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-50 bg-sky-400 p-2 px-4 rounded-full "
                onClick={() => setFilter("page", filters.page - 1)}
              >
                pervious
              </button>

              <div className="flex gap-2">
                {pages?.map((item) => {
                  return (
                    <button
                      key={item}
                      className={
                        item === filters.page
                          ? " bg-sky-400 p-2 px-4 rounded-full"
                          : " rounded-full p-2 px-4"
                      }
                      onClick={() => setFilter("page", item)}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>
              <button
                disabled={filters.page === pages.length}
                className="disabled:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-50 bg-sky-400 p-2 px-4 rounded-full "
                onClick={() => setFilter("page", filters.page + 1)}
              >
                next
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
