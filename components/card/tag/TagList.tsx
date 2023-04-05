import { ParsedDatabaseItem } from "@/utils/parseDatabaseItems";
import TagItem from "./TagItem";

interface TagListProps {
  tags: ParsedDatabaseItem["tags"];
}

function TagList({ tags }: TagListProps) {
  return (
    <ul className="py-4 px-6 flex flex-row flex-wrap gap-2">
      {tags.map((tag) => (
        <TagItem key={tag.id} tagItem={tag} />
      ))}
    </ul>
  );
}

export default TagList;
