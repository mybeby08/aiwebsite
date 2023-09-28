import Image from "next/image";
import React from "react";

const Loader = () => {
  return (
    <div className="h-full w-full flex flex-col gap-y-4 items-center justify-center">
      <div className="w-10 h-10 relative animate-spin">
        <Image priority alt="loading" fill src="logo.svg" />
      </div>
      <p className="text-sm">AI.betsy is gathering the data...</p>
    </div>
  );
};

export default Loader;
