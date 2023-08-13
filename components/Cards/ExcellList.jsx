import React from "react";
import ExcellCard from "./ExcellCard";

const ExcellList = ({ data }) => {
  return (
    <div className="flex flex-wrap -m-4">
      {data.map((data, index) => (
        <ExcellCard
          key={index}
          icon={data.icon}
          title={data.title}
          description={data.description}
        />
      ))}
    </div>
  );
};

export default ExcellList;
