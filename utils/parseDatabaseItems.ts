import { getDatabaseItems } from "@/cms/notionClient";
import {
  MultiSelectPropertyItemObjectResponse,
  PageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { PreviewImageType } from "./previewImage";

export interface ParsedDatabaseItemType {
  id: string;
  cover: string;
  icon: PageObjectResponse["icon"];
  tags: MultiSelectPropertyItemObjectResponse["multi_select"];
  published: string;
  description: string;
  title: string;
  previewImage?: PreviewImageType;
  proxy: {
    cover: string;
    icon: string;
  };
}

export function parseDatabaseItems(
  items: Awaited<ReturnType<typeof getDatabaseItems>>
) {
  const parsedItems = items.reduce<ParsedDatabaseItemType[]>((acc, item) => {
    if (!("properties" in item)) {
      return acc;
    }

    if (item.parent.type !== "database_id") return acc;

    const { id, cover, icon, last_edited_time } = item;
    const { Tags, Published, Description, Name } = item.properties;

    const parsedCover =
      cover?.type === "file" ? cover.file.url : cover?.external.url ?? "";

    const published =
      (Published.type === "date" ? Published.date?.start : "") ?? "";

    const description =
      (Description.type === "rich_text"
        ? Description.rich_text[0]?.plain_text
        : "") ?? "";

    const title =
      (Name.type === "title" ? Name.title[0]?.plain_text : "") ?? "";

    const tags = Tags.type === "multi_select" ? Tags.multi_select : [];

    const proxyCoverUrl = `/api/getImage?type=cover&pageId=${id}&lastEditedTime=${last_edited_time}`;
    const proxyIconUrl = `/api/getImage?type=icon&pageId=${id}&lastEditedTime=${last_edited_time}`;

    const parsedResult: ParsedDatabaseItemType = {
      id,
      cover: parsedCover,
      icon,
      tags,
      published,
      description,
      title,
      proxy: {
        cover: proxyCoverUrl,
        icon: proxyIconUrl,
      },
    };

    return [...acc, parsedResult];
  }, []);

  return parsedItems;
}
