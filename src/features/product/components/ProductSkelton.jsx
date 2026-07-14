import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
export default function ProductSkelton({ isloading, children }) {
  if (isloading) {
    return (
      <div className="flex gap-10 flex-wrap">
        {Array.from({ length: 9 }).map((item) => (
          <div className=" bg-[var(--surface-secondary)] w-[450px] h-100 rounded flex flex-col p-5 py-0  gap-7">
            <Skeleton
              width={410}
                 baseColor="#334155" highlightColor="#475569"
              className=" h-20 mt-10"
            />
            <Skeleton
             baseColor="#334155" highlightColor="#475569"
             enableAnimation={true}
              width={250}
            />
            <Skeleton
            baseColor="#334155" highlightColor="#475569"
              width={390}
              count={3}
            />
          </div>
        ))}
      </div>
    );
  } else return children;
}
