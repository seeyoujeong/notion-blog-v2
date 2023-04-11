import { getDatabaseItems, getPageContent } from "@/cms/notionClient";
import NotionPageRenderer from "@/components/notion/NotionPageRenderer";
import { GetStaticProps } from "next";
import { ExtendedRecordMap } from "notion-types";
import { ParsedUrlQuery } from "querystring";

interface BlogPageProps {
  recordMap: ExtendedRecordMap;
}

const BlogPage = ({ recordMap }: BlogPageProps) => {
  return <NotionPageRenderer recordMap={recordMap} />;
};

export default BlogPage;

interface BlogPageParams extends ParsedUrlQuery {
  pageId: string;
}

export const getStaticProps: GetStaticProps<
  BlogPageProps,
  BlogPageParams
> = async ({ params }) => {
  const { pageId } = params!;

  console.log(params);

  const recordMap = await getPageContent(pageId);

  return {
    props: {
      recordMap,
    },
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
    fallback: true,
  };
};
