import React from "react";
import AdvantageCard from "./AdvantageCard";

const AdvanList = ({ data }) => {
  return (
    <div className="flex flex-wrap -m-4">
      {data.map((data) => (
        <AdvantageCard
          key={data.id}
          icon={data.icon}
          title={data.title}
          description={data.description}
        />
      ))}
    </div>
  );
};

export default AdvanList;
