import { getDatabaseItems } from "@/cms/notionClient";
import { MultiSelectPropertyItemObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { PreviewImageType } from "./previewImage";

export interface ParsedDatabaseItem {
  id: string;
  cover: string;
  icon: PageObjectResponse["icon"];
  tags: MultiSelectPropertyItemObjectResponse["multi_select"];
  published: string;
  description: string;
  title: string;
  previewImage?: PreviewImageType;
}

export function parseDatabaseItems(
  items: Awaited<ReturnType<typeof getDatabaseItems>>
) {
  const parsedItems = items.reduce<ParsedDatabaseItem[]>((acc, item) => {
    if (!("properties" in item)) {
      return acc;
    }

    if (item.parent.type !== "database_id") return acc;

    const { id, cover, icon } = item;
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

    const parsedResult: ParsedDatabaseItem = {
      id,
      cover: parsedCover,
      icon,
      tags,
      published,
      description,
      title,
    };

    return [...acc, parsedResult];
  }, []);

  return parsedItems;
}
