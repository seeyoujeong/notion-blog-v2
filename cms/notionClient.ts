import { Client } from "@notionhq/client";
import {
  PageObjectResponse,
  PartialPageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { NotionAPI } from "notion-client";

export const notionClient = new Client({
  auth: process.env.NOTION_TOKEN,
});

interface DatabaseQueryOption {
  filter?: {
    tagName?: string;
  };
}

export async function getDatabaseItems(
  databaseId: string,
  option?: DatabaseQueryOption
) {
  const response = await notionClient.databases.query({
    database_id: databaseId,
    filter: {
      and: [
        {
          property: "Public",
          checkbox: {
            equals: true,
          },
        },
        {
          property: "Tags",
          multi_select: {
            contains: option?.filter?.tagName ?? "",
          },
        },
      ],
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

export const unofficialNotionApi = new NotionAPI();

export const getPageContent = async (pageId: string) => {
  const recordMap = await unofficialNotionApi.getPage(pageId);

  return recordMap;
};

export async function getSearchResults(query: string) {
  const response = await notionClient.search({
    query,
    filter: {
      property: "object",
      value: "page",
    },
    sort: {
      direction: "descending",
      timestamp: "last_edited_time",
    },
  });

  return response.results as (PageObjectResponse | PartialPageObjectResponse)[];
}
