import { Client } from "@notionhq/client";

export const notionClient = new Client({
  auth: process.env.NOTION_TOKEN,
});

export async function getDatabaseItems(databaseId: string) {
  const response = await notionClient.databases.query({
    database_id: databaseId,
    filter: {
      property: "Public",
      checkbox: {
        equals: true,
      },
    },
    sorts: [
      {
        property: "Published",
        direction: "descending",
      },
    ],
  });

  return response.results;
}
