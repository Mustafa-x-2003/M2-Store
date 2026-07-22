import React from "react";
import { useSearchParams } from "react-router";

export default function useProductsFilter() {
  const [serachParams, setsearchParams] = useSearchParams();

  const setFilter = (key, value) => {
    const params = new URLSearchParams(serachParams);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    setsearchParams(params);
  };

  const getFilter = (key) => {
    const params = new URLSearchParams(serachParams);
    return params.get(key) || "";
  };
  return { setFilter, getFilter, serachParams, setsearchParams };
}
