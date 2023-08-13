import React from "react";
import AdvanCard from "./AdvanCard";

const AdvanList = ({ data }) => {
  return (
    <div className="flex flex-wrap -m-4">
      {data.map((data, index) => (
        <AdvanCard
          key={index}
          icon={data.icon}
          title={data.title}
          description={data.description}
        />
      ))}
    </div>
  );
};

export default AdvanList;
