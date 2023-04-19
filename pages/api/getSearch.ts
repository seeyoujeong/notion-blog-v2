import { getSearchResults } from "@/cms/notionClient";
import {
  type ParsedDatabaseItem,
  parseDatabaseItems,
} from "@/utils/parseDatabaseItems";
import type { NextApiRequest, NextApiResponse } from "next";

export interface GetSearchResponse {
  databaseItems: ParsedDatabaseItem[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetSearchResponse>
) {
  const { query } = req.query;

  if (!query) {
    throw new Error("Query is required.");
  }

  const searchQuery = query.toString();

  const searchResults = await getSearchResults(searchQuery);

  const parsedDatabaseItems = parseDatabaseItems(searchResults);

  res.json({ databaseItems: parsedDatabaseItems });
}
