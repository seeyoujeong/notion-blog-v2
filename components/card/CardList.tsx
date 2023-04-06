import { ParsedDatabaseItem } from "@/utils/parseDatabaseItems";
import CardItem from "./CardItem";

interface CardListProps {
  cardItems: ParsedDatabaseItem[];
}

function CardList({ cardItems }: CardListProps) {
  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {cardItems.map((cardItem) => (
        <CardItem key={cardItem.id} cardItem={cardItem} />
      ))}
    </ul>
  );
}

export default CardList;
