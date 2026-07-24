import React, { useEffect, useState } from "react";
import { getorders } from "../services/ordersApi";
import OrderHeader from "../components/OrderHeader.jsx";
import Orders from "../components/orders/Orders.jsx";
import OrderEmpty from "../components/orders/OrderEmpty.jsx";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Loading from "../../../components/common/Loading.jsx";
const OrderPage = () => {
  const [myorders, setMyorders] = useState([]);
  const [loading, setLoading] = useState(true);
  const getmyorders = async () => {
    try {
      const res = await getorders();
      setMyorders(res.data.orders);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getmyorders();
  }, []);
  return (
    <div className=" px-4 lg:px-0 md:w-[85%] lg:w-[78%] xl:w-[70%] mx-auto ">
      {loading ? (
        <div className=" min-h-[100vh] flex justify-center items-center ">
          <Loading />
        </div>
      ) : myorders.length > 0 ? (
        <div className=" pt-30 pb-10 min-h-[100vh]">
          <OrderHeader title={"My Orders"} />
          <Orders orders={myorders} />
        </div>
      ) : (
        <div className="min-h-[100vh] flex justify-center items-center ">
          <OrderEmpty />
        </div>
      )}
    </div>
  );
};
export default OrderPage;
