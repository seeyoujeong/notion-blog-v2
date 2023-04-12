import { getDatabaseItems } from "@/cms/notionClient";
import { MultiSelectPropertyItemObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export function getAllTags(
  databaseItems: Awaited<ReturnType<typeof getDatabaseItems>>
) {
  const tags = databaseItems.reduce<
    MultiSelectPropertyItemObjectResponse["multi_select"]
  >((acc, item) => {
    if (!("properties" in item)) {
      return acc;
    }

    const { Tags } = item.properties;

    const tags = Tags.type === "multi_select" ? Tags.multi_select : [];

    tags.forEach((tag) => {
      if (!acc.some((accTag) => accTag.id === tag.id)) {
        acc.push(tag);
      }
    });

    return acc;
  }, []);

  return tags;
}
