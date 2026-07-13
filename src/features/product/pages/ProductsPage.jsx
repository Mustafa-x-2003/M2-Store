import {useState , useEffect} from 'react'
import FilterCom from '../components/FilterCom'

export default function ProductsPage() {
  const [category , setcategory] = useState(["all"])
  const [filters , setfilters] = useState({
    category:"",
    minPrice : "",
    maxPrice : "",
    sort : "",
    page : "",
    limit : "" ,

  })
  const [showMode , setshowModel] = useState(false)
  return (
    <section className=''>
     <div className='flex flex-col gap-5 mt-10 p-5 w-full xl:w-[85%] m-auto '>
      <div className='flex justify-between gap-5'>
        <input type="text" placeholder="Serach Product .." className='border border-3
         border-white/25 focus:border-violet-500 focus:outline-0 rounded-xl text-xl p-4 px-5 grow bg-[var(--surface-secondary)] ' />
        
        <button className='border xl:invisible' onClick={()=> setshowModel(true)}>filter</button>
        {showMode &&(
          <div className=' absolute  right-0 top-0 z-100  bg-[var(--surface)] w-115 p-6 h-screen '>
            <button className='ml-auto block mr-5 text-xl' onClick={()=> setshowModel(false)}>close</button>
            <FilterCom filters={filters} setfilters={setfilters}/>
          </div>
        )}
      </div>
      <div className='filtersShow'>
        {filters.category  &&(
            <button  className=" p-1 px-4 rounded-full bg-blue-500/15 text-blue-400" onClick={()=>{
              setfilters({...filters , category : ""})
            }}>{filters.category}</button>
        )}

        {filters.minPrice  &&(
            <button  className=" p-1 px-4 rounded-full bg-blue-500/15 text-blue-400" onClick={()=>{
              setfilters({...filters , minPrice : ""})
            }}>min : {filters.minPrice}</button>
        )}

        {filters.maxPrice  &&(
            <button  className=" p-1 px-4 rounded-full bg-blue-500/15 text-blue-400" onClick={()=>{
              setfilters({...filters , maxPrice : ""})
            }}>max : {filters.maxPrice}</button>
        )}
        {filters.sort  &&(
            <button  className=" p-1 px-4 rounded-full bg-blue-500/15 text-blue-400" onClick={()=>{
              setfilters({...filters , sort : ""})
            }}>{()=>{
              if(filters.sort === "oldest"){
                return "Created At"
              } 
              else if(filters.sort === "price_asc"){
                return "price"
              }else if (filters.sort === "price_desc"){
                return "- price"
              }
            }}</button>
        )}
      </div>
      <div className="mainContent flex gap-10">
        <div className="filterSide invisible xl:visible">
          <FilterCom filters={filters} setfilters={setfilters}/>
        </div>
        <div className="cardsSide">

        </div>
      </div>
     </div>
    </section>
  )
}
