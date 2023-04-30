import { getDatabaseItems } from "@/cms/notionClient";
import CardSection from "@/components/intro/CardSection";
import TagHeroSection from "@/components/tags/TagHeroSection";
import { ITEMS_PER_PAGE } from "@/const/const";
import { getAllTags } from "@/utils/getAllTags";
import { parseDatabaseItems } from "@/utils/parseDatabaseItems";
import { ParsedDatabaseItemType } from "@/utils/parseDatabaseItems";
import { insertPreviewImage } from "@/utils/previewImage";
import { GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";

export interface TagNamePageProps {
  databaseItems: ParsedDatabaseItemType[];
  totalLength: number;
  tagName: string;
}

function TagNamePage({
  databaseItems,
  totalLength,
  tagName,
}: TagNamePageProps) {
  return (
    <div className="min-h-[calc(100vh-72px-88px)]">
      <TagHeroSection title={`#${tagName}`} />
      <CardSection cardItems={databaseItems} totalLength={totalLength} />
    </div>
  );
}

export default TagNamePage;

export interface TagNamePageParams extends ParsedUrlQuery {
  tagName: string;
}

export const getStaticProps: GetStaticProps<
  TagNamePageProps,
  TagNamePageParams
> = async ({ params }) => {
  if (!process.env.DATABASE_ID) {
    throw new Error("DATABASE_ID is not defined.");
  }

  const { tagName } = params!;

  const databaseItems = await getDatabaseItems(process.env.DATABASE_ID, {
    filter: { tagName },
  });

  const parsedDatabaseItems = parseDatabaseItems(
    databaseItems.slice(0, ITEMS_PER_PAGE)
  );

  const parsedDatabaseItemWithPreview = await insertPreviewImage(
    parsedDatabaseItems
  );

  return {
    props: {
      databaseItems: parsedDatabaseItemWithPreview,
      totalLength: databaseItems.length,
      tagName,
    },
    revalidate: 180,
  };
};

export async function getStaticPaths(): Promise<ReturnType<GetStaticPaths>> {
  if (!process.env.DATABASE_ID) {
    throw new Error("DATABASE_ID is not defined.");
  }

  const databaseItems = await getDatabaseItems(process.env.DATABASE_ID);

  const allTags = getAllTags(databaseItems);

  const paths = allTags.map(({ name: tagName }) => ({
    params: {
      tagName,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
}
