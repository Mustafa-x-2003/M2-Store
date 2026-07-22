import axios from "axios";


export const GetProduct = async ({filters})=>{
const params = {};

if (filters.search){params.search = filters.search}
  if (filters.category){ params.category = filters.category}
  if (filters.minPrice !== undefined || "") {params.minPrice = filters.minPrice}
  if (filters.maxPrice !== undefined || ""){ params.maxPrice = filters.maxPrice}
  if (filters.sort) {params.sort = filters.sort}
  params.page = filters.page;
  params.limit = filters.limit;
    const url = "https://e-commerce-api-3wara.vercel.app"
  const response = await axios.get(`${url}/products/search` ,{ params})
  return response.data
}

export const GetAllCategory = async ()=>{
    const url = "https://e-commerce-api-3wara.vercel.app/products"
    const response = await  axios.get(url)
   return response.data
}