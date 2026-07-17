import React, { useEffect, useState } from "react";
import { getorders } from "../services/ordersApi";
import OrderHeader from "../components/OrderHeader.jsx";
import Orders from "../components/Orders.jsx";
import OrderEmpty from "../components/OrderEmpty.jsx";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
const OrderPage=()=>{
    const[myorders,setMyorders]=useState([])
    const[loading,setLoading]=useState(true)
    const getmyorders=async()=>{
        try{
            const res=await getorders()
            setMyorders(res.data.orders)
        }catch(err){
            console.log(err)
        }finally{
            setLoading(false)
        }
    }
    useEffect(()=>{
        getmyorders()
    },[])
    return(
        <div className="w-[90%] md:w-[85%] lg:w-[78%] xl:w-[70%] mx-auto my-10">
            {
                loading?(<div className="flex justify-center items-center min-h-[300px]">
  <div className="w-10 h-10 border-4 border-[var(--border)] border-t-[var(--primary)] rounded-full animate-spin"></div></div>):(
                     myorders.length>0?(
                    <div>
                        <OrderHeader/>
                        <Orders orders={myorders}/>
                    </div>
                ):(
                    <OrderEmpty/>
                )
                )
            }
        </div>
    )
}
export default OrderPage;