import { COLOR_TABLE } from "@/const/const";
import { ParsedDatabaseItem } from "@/utils/parseDatabaseItems";
import Link from "next/link";

interface TagItemProps {
  tagItem: ParsedDatabaseItem["tags"][number];
}

function TagItem({ tagItem }: TagItemProps) {
  const { name, color } = tagItem;

  return (
    <li>
      <Link href={`/tag/${name.toLowerCase()}`}>
        <a
          className="text-sm font-light block hover:-translate-y-1 px-2 py-1 rounded-2xl hover:shadow-md transition-all hover:underline text-gray-800"
          style={{
            backgroundColor: COLOR_TABLE[color],
          }}
        >
          #{name}
        </a>
      </Link>
    </li>
  );
}

export default TagItem;
