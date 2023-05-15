import { ParsedDatabaseItemType } from "@/utils/parseDatabaseItems";
import CardItem from "./CardItem";
import { TfiFaceSad } from "react-icons/tfi";

interface CardListProps {
  cardItems: ParsedDatabaseItemType[];
}

function CardList({ cardItems }: CardListProps) {
  if (cardItems.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center">
        <TfiFaceSad size={"3rem"} />
        <p className="text-xl text-center pt-2 break-keep">
          검색어와 일치하는 제목이 없어요!
        </p>
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
