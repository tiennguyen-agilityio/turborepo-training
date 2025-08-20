import React from "react";

const CopyRight = () => {
  return (
    <div className="container flex justify-between items-center mx-auto h-28 px-5">
      <div className="text-xs text-center">
        © {new Date().getFullYear()} Travelsy Ltd. All rights reserved.
      </div>
      <div className="text-xs text-center">Made in Kenya by Ralak</div>
    </div>
  );
};

export default CopyRight;
