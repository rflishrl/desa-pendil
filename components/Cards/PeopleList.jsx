import PeopleCard from "./PeopleCard";

const PeopleList = ({ data }) => {
  return (
    <div className="flex flex-wrap lg:mx-10 justify-center items-center">
      {data.map((card, index) => (
        <PeopleCard
          key={index}
          image={card.image}
          title={card.title}
          position={card.position}
        />
      ))}
    </div>
  );
};

export default PeopleList;
