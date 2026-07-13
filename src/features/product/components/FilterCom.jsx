import React from 'react'

export default function FilterCom({setfilters , filters}) {
    const addCAt = (e)=>{
    setfilters({...filters , category : e.target.id})
    }
    const AddPrice = (e)=>{
        setfilters({...filters , maxPrice : e.target.value})
    }
    const Addsort = (e)=>{
      setfilters({...filters , sort : e.target.value})
    }
  return (
    <div className='p-3  flex flex-col gap-6  text-xl '>
      <div className='text-[var(--text)] flex flex-col gap-6 '>
        <h5 className='text-2xl '>Category</h5>
     <div className='tracking-[.12rem] flex flex-col gap-3'>
            <div className='flex gap-3 items-center'>
                <input type="radio" id="all" name="filter" className='w-5 h-5' onChange={(e)=>addCAt(e)} />
                <p>All </p>
            </div>
    
             <div className='flex gap-3 items-center'>
                <input type="radio" id="newest" name="filter"className='w-5 h-5' onChange={(e)=>addCAt(e)}/>
                <p>All</p>
            </div>
    
    
             <div className='flex gap-3 items-center'>
                <input type="radio" name="filter" className='w-5 h-5' id="expensive" onChange={(e)=>addCAt(e)}/>
                <p>All</p>
            </div>
    
             <div className='flex gap-3 items-center'>
                <input type="radio" name="filter" className='w-5 h-5' id="cheapest" onChange={(e)=>addCAt(e)}/>
                <p>All</p>
            </div>
    
     </div>
      </div>

      <div>
        <h5 className='text-2xl'>Price Range</h5>
        <div className='flex justify-between gap-3  mt-6'>
            <input type="number" placeholder='Min' className='border border-gray-600 w-40 p-2 rounded focus:border-[var(--primary)] focus:outline-none  bg-[var(--surface-secondary)]' onChange={(e)=> setfilters({...filters , minPrice : Number(e.target.value)})}/>
            <input type="number" placeholder='Max' className='border border-gray-600 w-40 p-2 rounded focus:border-[var(--primary)] focus:outline-none bg-[var(--surface-secondary)]'onChange={(e)=> setfilters({...filters , maxPrice : Number(e.target.value)})} />
        </div>
      </div>

      <div className='flex flex-col gap-5   '>
        <h5 className='text-2xl'>Sort By</h5>
        <select className='border rounded p-3 py-2 text-[19px] focus:border-[var(--primary)] focus:outline-none bg-[var(--surface-secondary)]' onChange={Addsort}>
            <option hidden>Default</option>
            <option value="oldest">Newest</option>
            <option value="price_asc">Price : low to High</option>
            <option value="price_desc">Price : High ot low</option>
            <option value="rating">Top Rated</option>
        </select>

        <button className='border border-[var(--primary)] text-[var(--primary)] rounded p-1 text-xl hover:bg-blue-500/15 mt-10' onClick={()=>{
          setfilters({
    category:"",
    minPrice : "",
    maxPrice : "",
    sort : "",
    page : "",
    limit : "" ,

  })
        }}>Clear All Filters</button>
      </div>
    </div>
  )
}
