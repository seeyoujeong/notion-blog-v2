import { getDatabaseItems, getPageContent } from "@/cms/notionClient";
import Comments from "@/components/common/Comments";
import PageHead, { PageHeadProps } from "@/components/layout/PageHead";
import NotionPageRenderer from "@/components/notion/NotionPageRenderer";
import { insertPreviewImageToRecordMap } from "@/utils/previewImage";
import { GetStaticProps } from "next";
import { ExtendedRecordMap } from "notion-types";
import { getPageProperty, getPageTitle } from "notion-utils";
import { ParsedUrlQuery } from "querystring";

interface DetailBlogPageProps {
  recordMap: ExtendedRecordMap;
  seo: PageHeadProps;
}

const BlogPage = ({
  recordMap,
  seo: { title, description, keywords, image },
}: DetailBlogPageProps) => {
  return (
    <div>
      <PageHead
        title={title}
        description={description}
        keywords={keywords}
        image={image}
      />
      <NotionPageRenderer recordMap={recordMap} />
      <Comments />
    </div>
  );
};

export default BlogPage;

interface DetailBlogPageParams extends ParsedUrlQuery {
  pageId: string;
}

export const getStaticProps: GetStaticProps<
  DetailBlogPageProps,
  DetailBlogPageParams
> = async ({ params }) => {
  const { pageId } = params!;

  const recordMap = await getPageContent(pageId);

  const previewImages = await insertPreviewImageToRecordMap(recordMap);

  const propertyBlock = Object.values(recordMap.block)[0].value;

  const title = getPageTitle(recordMap);
  const description = getPageProperty<string>(
    "Description",
    propertyBlock,
    recordMap
  );
  const keywords = getPageProperty<string[]>(
    "Tags",
    propertyBlock,
    recordMap
  ).join(", ");
  const image = `/api/getImage?type=cover&pageId=${pageId}`;

  return {
    props: {
      recordMap: {
        ...recordMap,
        preview_images: previewImages,
      },
      seo: {
        title,
        description,
        keywords,
        image,
      },
    },
    revalidate: 180,
  };
};

export const getStaticPaths = async () => {
  if (!process.env.DATABASE_ID) {
    throw new Error("DATABASE_ID is not defined.");
  }

  const databaseItems = await getDatabaseItems(process.env.DATABASE_ID);

  const paths = databaseItems.map(({ id: pageId }) => ({
    params: {
      pageId,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};
