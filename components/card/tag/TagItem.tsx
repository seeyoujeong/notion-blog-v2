import { COLOR_TABLE } from "@/const/const";
import { ParsedDatabaseItemType } from "@/utils/parseDatabaseItems";
import Link from "next/link";

interface TagItemProps {
  tagItem: ParsedDatabaseItemType["tags"][number];
}

function TagItem({ tagItem }: TagItemProps) {
  const { name, color } = tagItem;

  const replaceUnderbarName = name.includes("_")
    ? name.replaceAll("_", " ")
    : name;

  return (
    <li>
      <Link href={`/tags/${name}`}>
        <a
          className="text-sm font-light block hover:-translate-y-1 px-2 py-1 rounded-2xl hover:shadow-md transition-all hover:underline text-gray-800"
          style={{
            backgroundColor: COLOR_TABLE[color],
          }}
        >
          #{replaceUnderbarName}
        </a>
      </Link>
    </li>
  );
}

export default TagItem;
