import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
export default function ProductSkelton({ isloading, children }) {
  if (isloading) {
    return (
      // <div className="flex gap-5 flex-wrap">
      //   {Array.from({ length: 9 }).map((item) => (
      //     <div className=" bg-[var(--surface-secondary)] w-[450px] h-100 rounded flex flex-col p-5 py-0  gap-7">
      //       <Skeleton
      //         width={410}
      //            baseColor="#334155" highlightColor="#475569"
      //         className=" h-20 mt-10"
      //       />
      //       <Skeleton
      //        baseColor="#334155" highlightColor="#475569"
      //        enableAnimation={true}
      //         width={250}
      //       />
      //       <Skeleton
      //       baseColor="#334155" highlightColor="#475569"
      //         width={390}
      //         count={3}
      //       />
      //     </div>
      //   ))}
      // </div>

      // -------------------------

       <div className="grid grid-cols-1 sm:grid-cols-2  2xl:grid-cols-3 gap-7 w-full">
        {Array.from({ length: 9 }).map((item) => (
          <div className="bg-[#2b343f]  bg-[var(--surface-secondary)] rounded-xl w-full h-120 rounded flex flex-col gap-3 animate-pulse">
            <div
              className="bg-[#475569]   h-55 rounded-t-xl "
            />
          <div  className="bg-[#475569]  h-7 rounded w-[75%] mt-8 ml-5"/>
          <div  className="bg-[#475569]  h-6  rounded w-[50%] mt-2  ml-5"/>
          <div  className="bg-[#475569]  h-15  rounded w-[85%] mt-2  ml-5"/>
          </div>
        ))}
      </div>
    );
  } else return children;
}
