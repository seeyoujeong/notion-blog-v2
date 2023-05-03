import { getPage } from "@/cms/notionClient";
import got from "got";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { type, pageId } = req.query;

  if (!type) throw new Error("Type is required");
  if (!pageId) throw new Error("Page ID is required");

  const pageItem = await getPage(pageId.toString());

  if (!("properties" in pageItem)) throw new Error("pageItem is not exist");

  const { cover, icon } = pageItem;

  const parsedCover =
    (cover?.type === "file" ? cover.file.url : cover?.external.url) ?? "";

  let url = "";

  switch (type.toString()) {
    case "cover":
      url = parsedCover;
      break;
    case "icon":
      if (icon?.type === "emoji") {
        url = "";
        break;
      }

      url =
        (icon?.type === "external" ? icon.external.url : icon?.file.url) ?? "";
      break;
  }

  const response = await got(url, {
    responseType: "buffer",
  });
  const contentType = response.headers["content-type"];

  if (!contentType) throw new Error("Content type is not found");

  res.setHeader("Content-Type", contentType);
  res.send(response.body);
}
