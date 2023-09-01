import Card from "./Card";

const CardList = ({ data }) => {
  return (
    <div className="flex flex-wrap lg:mx-10 justify-center items-center">
      {data.map((card) => (
        <Card
          key={card.id}
          image={card.thumbnail}
          title={card.judul}
          date={card.createdAt}
        />
      ))}
    </div>
  );
};

export default CardList;
