import React from "react";
const Loading = () => {
    return (
        <div className="flex justify-center items-center min-h-[60vh]">
            <div className="w-10 h-10 border-4 border-gray-300 border-t-[var(--primary)] rounded-full animate-spin"></div>
        </div>
    );
};

export default Loading;