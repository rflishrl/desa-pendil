import Card from "./Card";

const CardList = ({ data }) => {
  return (
    <div className="flex flex-wrap lg:mx-10 justify-center items-center">
      {data.map((card, index) => (
        <Card
          key={index}
          image={card.image}
          title={card.title}
          date={card.date}
        />
      ))}
    </div>
  );
};

export default CardList;
