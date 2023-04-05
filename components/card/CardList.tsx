import { ParsedDatabaseItem } from "@/utils/parseDatabaseItems";
import CardItem from "./CardItem";

interface CardListProps {
  cardItems: ParsedDatabaseItem[];
}

function CardList({ cardItems }: CardListProps) {
  return (
    <ul className="flex flex-col gap-8">
      {cardItems.map((cardItem) => (
        <CardItem key={cardItem.id} cardItem={cardItem} />
      ))}
    </ul>
  );
}

export default CardList;
