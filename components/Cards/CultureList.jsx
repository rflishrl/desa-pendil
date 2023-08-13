import React from "react";
import CultureCard from "./CultureCard";

const CultureList = ({ data }) => {
  return (
    <div className="flex flex-wrap -m-4">
      {data.map((data, index) => (
        <CultureCard
          key={index}
          image={data.image}
          title={data.title}
          description={data.description}
        />
      ))}
    </div>
  );
};

export default CultureList;
