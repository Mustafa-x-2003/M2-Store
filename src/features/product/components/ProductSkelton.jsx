import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
export default function ProductSkelton({ isloading, children }) {
  if (isloading) {
    return (
       <div className="grid w-full grid-cols-1 gap-7 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 9 }).map((item) => (
          <div className=" border border-[var(--border)]   bg-[var(--surface-secondary)] rounded-xl w-full pb-3 rounded flex flex-col gap-3 animate-pulse">
            <div
              className="dark:bg-[#475569]   bg-gray-300  h-55 rounded-t-xl "
            />
          <div  className="dark:bg-[#475569]  bg-gray-300 h-7 rounded w-[75%] mt-8 ml-5"/>
          <div  className="dark:bg-[#475569]  bg-gray-300 h-6  rounded w-[50%] mt-2  ml-5"/>
          <div  className="dark:bg-[#475569] bg-gray-300/90 h-12  rounded w-[85%] mt-2  ml-5"/>
          </div>
        ))}
      </div>
    );
  } else return children;
}
