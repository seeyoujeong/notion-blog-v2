import got from "got";
import lqip from "lqip-modern";
import { ExtendedRecordMap, PreviewImage, PreviewImageMap } from "notion-types";
import { ParsedDatabaseItemType } from "./parseDatabaseItems";
import { getPageImageUrls } from "notion-utils";
import { defaultMapImageUrl } from "react-notion-x";

export async function makePreviewImage(url: string) {
  const bufferBody = await got(url, {
    responseType: "buffer",
    resolveBodyOnly: true,
  });

  try {
    const {
      metadata: { dataURIBase64, originalWidth, originalHeight },
    } = await lqip(bufferBody);

    const previewImage: PreviewImage = {
      dataURIBase64,
      originalWidth,
      originalHeight,
    };

    return previewImage;
  } catch (error) {
    return null;
  }
}

export type PreviewImageType = Awaited<ReturnType<typeof makePreviewImage>>;

export async function insertPreviewImage(
  parsedItems: ParsedDatabaseItemType[]
) {
  const itemsWithPreviewImage = await Promise.all(
    parsedItems.map(async (item) => {
      const previewImage = await makePreviewImage(item.cover);

      return {
        ...item,
        previewImage,
      };
    })
  );

  return itemsWithPreviewImage;
}

export async function insertPreviewImageToRecordMap(
  recordMap: ExtendedRecordMap
): Promise<PreviewImageMap> {
  const urls = getPageImageUrls(recordMap, {
    mapImageUrl: defaultMapImageUrl,
  });

  const previewImageMap = await Promise.all(
    urls.map(async (url) => [url, await makePreviewImage(url)])
  );

  return Object.fromEntries(previewImageMap);
}
