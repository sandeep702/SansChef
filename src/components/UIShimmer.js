import React from "react"
import ShimmerCard from "./ShimmerCard";
const UIShimmer = () => {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "15px" }}>
      {Array(14)
        .fill("")
        .map((_, index) => (
          <ShimmerCard key={index} />
        ))}
    </div>
  );
};

export default UIShimmer;


