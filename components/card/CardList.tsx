import { ParsedDatabaseItem } from "@/utils/parseDatabaseItems";
import CardItem from "./CardItem";
import { MdOutlineSearchOff } from "react-icons/md";

interface CardListProps {
  cardItems: ParsedDatabaseItem[];
}

function CardList({ cardItems }: CardListProps) {
  if (cardItems.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center">
        <MdOutlineSearchOff size={"4rem"} />
        <p className="text-2xl font-semibold">No Items Found!</p>
      </div>
    );
  }

  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {cardItems.map((cardItem) => (
        <CardItem key={cardItem.id} cardItem={cardItem} />
      ))}
    </ul>
  );
}

export default CardList;
