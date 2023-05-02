import { ParsedDatabaseItemType } from "@/utils/parseDatabaseItems";
import Image from "next/image";
import Link from "next/link";
import IconRenderer from "./IconRenderer";
import TagList from "./tag/TagList";
import { DEFAULT_BLUR_BASE64 } from "@/const/const";

interface CardItemProps {
  cardItem: ParsedDatabaseItemType;
}

function CardItem({ cardItem }: CardItemProps) {
  const { description, icon, id, published, tags, title, previewImage, proxy } =
    cardItem;

  return (
    <li className="rounded-2xl overflow-hidden shadow-lg group flex flex-col">
      <Link href={`/blog/${id}`}>
        <a className="flex-grow">
          <div className="relative aspect-[1.3/1]">
            <Image
              src={proxy.cover}
              alt={title}
              layout="fill"
              objectFit="cover"
              placeholder="blur"
              blurDataURL={previewImage?.dataURIBase64 ?? DEFAULT_BLUR_BASE64}
              className="group-hover:scale-105 transition-transform object-center"
            />
          </div>

          <div className="p-4 flex flex-col gap-4">
            <h4 className="font-bold text-2xl group-hover:text-gray-700 transition-colors flex flex-row items-center gap-2">
              <IconRenderer icon={icon} alt={title} proxyIconUrl={proxy.icon} />
              <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                {title}
              </span>
            </h4>
            {description ? (
              <p className="font-medium text-gray-600 overflow-hidden text-ellipsis whitespace-nowrap">
                {description}
              </p>
            ) : null}
            <time className="font-medium text-gray-700">{published}</time>
          </div>
        </a>
      </Link>
      {tags.length > 0 ? <TagList tags={tags} /> : null}
    </li>
  );
}

export default CardItem;
