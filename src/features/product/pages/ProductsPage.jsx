import { useState, useEffect } from "react";
import { useParams } from "react-router";
import FilterCom from "../components/FilterCom";
import { GetProduct } from "../service/ProductPageService";
import ProductSkelton from "../components/ProductSkelton";
import "react-loading-skeleton/dist/skeleton.css";
export default function ProductsPage() {
  const [isloading , setisloading] = useState(true)
  const [products, setproducts] = useState([]);
  const [pages, setpages] = useState([]);
  const [filters, setfilters] = useState({
    search : "",
    category: "",
    minPrice: "",
    maxPrice: "",
    sort: "",
    page: 1,
    limit: 3,
  });
  const {query} = useParams()
  console.log(query)
  const [showMode, setshowModel] = useState(false);
  const badgeClass =
    "text-xl p-1 px-4 rounded-full bg-blue-500/15 text-blue-400";

  useEffect(() => {
    setisloading(true)
    const res = GetProduct({ filters })
      .then((res) => {
        setproducts(res.products);
        setpages(
          Array.from({ length: res.totalPages }, (value, index) => index + 1),
        );
        setisloading(false)
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
      onClear: () => setfilters((prev) => ({ ...prev, category: "" })),
    },
    {
      key: "minPrice",
      value: filters.minPrice,
      label: filters.minPrice ? `min : ${filters.minPrice}` : "",
      onClear: () => setfilters((prev) => ({ ...prev, minPrice: "" })),
    },
    {
      key: "maxPrice",
      value: filters.maxPrice,
      label: filters.maxPrice ? `max : ${filters.maxPrice}` : "",
      onClear: () => setfilters((prev) => ({ ...prev, maxPrice: "" })),
    },
    {
      key: "sort",
      value: filters.sort,
      label: getSortLabel(filters.sort),
      onClear: () => setfilters((prev) => ({ ...prev, sort: "" })),
    },
  ].filter((item) => item.value);

  const clearAllFilters = () => {
    setfilters((prev) => ({
      ...prev,
      category: "",
      minPrice: "",
      maxPrice: "",
      sort: "",
    }));
  };

  return (
    <section className="">
  
      <div className="flex flex-col gap-5 mt-10 p-5 w-full xl:w-[85%] m-auto ">
        <div className="flex justify-between gap-5">
          <input
            type="text"
            value={filters.search}
            placeholder="Serach Product .."
            className="border border-3
         border-white/25 focus:border-violet-500 focus:outline-0 rounded-xl text-xl p-4 px-5 grow bg-[var(--surface-secondary)] "
         onChange={(e)=> setfilters({...filters , search : e.target.value})} />

          <button
            className="border xl:invisible"
            onClick={() => setshowModel(true)}
          >
            filter
          </button>
          {showMode && (
            <div className=" absolute  right-0 top-0 z-100  bg-[var(--surface)] w-115 p-6 h-screen ">
              <button
                className="ml-auto block mr-5 text-xl"
                onClick={() => setshowModel(false)}
              >
                close
              </button>
              <FilterCom
                filters={filters}
                setfilters={setfilters}
                products={products}
              />
            </div>
          )}
        </div>
        <div className="filtersShow flex gap-5 items-center">
          {activeFilters.map((filter) => (
            <button
              key={filter.key}
              className={badgeClass}
              onClick={filter.onClear}
            >
              {filter.label}
            </button>
          ))}

          {activeFilters.length > 0 && (
            <button
              className={` ${badgeClass} bg-transparent text-red-500 text-2xl `}
              onClick={clearAllFilters}
            >
              Clear
            </button>
          )}
        </div>
        <div className="mainContent flex gap-10">
          <div   className="filterSide hidden xl:block">
            <FilterCom
              filters={filters}
              setfilters={setfilters}
              products={products}
            />
          </div>
          <div className="cardsSide flex justify-center xl:justify-start gap-10 flex-wrap flex-grow ">


      <ProductSkelton isloading={isloading}>
              {products?.length > 0 ? products.map((item) => {
                return (
                  <div
                    key={item?.id}
                    className=" flex flex-col items-center justify-center h-150 border w-100 bg-blue-600 text-white"
                  >
                    <h5>{item?.name}</h5>
                    <p>{item?.category}</p>
                    <p>{item?.price}</p>
                  </div>
                );
              }) :( <div className=" flex w-full justify-center xl:ml-[-100px]   text-4xl">No Product Found</div>)}
</ProductSkelton>


          </div>
        </div>
      </div>

      <div className="pagination  w-[60%] px-10 p-5 m-auto flex justify-between items-center">
        <button
          disabled={filters.page === 1}
          className=" disabled:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-50 bg-sky-400 p-2 px-4 rounded-full "
          onClick={() => setfilters({ ...filters, page: filters.page - 1 })}
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
                onClick={() => setfilters({ ...filters, page: item })}
              >
                {item}
              </button>
            );
          })}
        </div>
        <button
          disabled={filters.page === pages.length}
          className="disabled:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-50 bg-sky-400 p-2 px-4 rounded-full "
          onClick={() => setfilters({ ...filters, page: filters.page + 1 })}
        >
          next
        </button>
      </div>
      
    </section>
  );
}
