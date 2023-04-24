import { getDatabaseItems } from "@/cms/notionClient";
import { ITEMS_PER_PAGE } from "@/const/const";
import TagNamePage, {
  TagNamePageParams,
  TagNamePageProps,
} from "@/pages/tags/[tagName]/index";
import { getAllTags } from "@/utils/getAllTags";
import { parseDatabaseItems } from "@/utils/parseDatabaseItems";
import { GetStaticPaths, GetStaticProps } from "next";

function TagNameWithPage({
  databaseItems,
  totalLength,
  tagName,
}: TagNamePageProps) {
  return (
    <TagNamePage
      databaseItems={databaseItems}
      tagName={tagName}
      totalLength={totalLength}
    />
  );
}

export default TagNameWithPage;

interface TagNameWithPageParams extends TagNamePageParams {
  page: string;
}

export const getStaticProps: GetStaticProps<
  TagNamePageProps,
  TagNameWithPageParams
> = async ({ params }) => {
  if (!process.env.DATABASE_ID) throw new Error("DATABASE_ID is not defined.");

  const tagName = params?.tagName ?? "";
  const page = params?.page ? Number(params.page) : 1;

  const databaseItems = await getDatabaseItems(process.env.DATABASE_ID, {
    filter: { tagName },
  });

  const parsedDatabaseItems = parseDatabaseItems(
    databaseItems.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)
  );

  return {
    props: {
      databaseItems: parsedDatabaseItems,
      totalLength: databaseItems.length,
      tagName,
    },
    revalidate: 180,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  if (!process.env.DATABASE_ID) throw new Error("DATABASE_ID is not defined.");

  const databaseItems = await getDatabaseItems(process.env.DATABASE_ID);

  const allTags = getAllTags(databaseItems);

  const parsedDatabaseItems = parseDatabaseItems(databaseItems);

  const lengthByTags = allTags.reduce<Record<string, number>>(
    (acc, { name, id }) => {
      const tagItems = parsedDatabaseItems.filter(
        (item) => item.tags.findIndex((tag) => tag.id === id) > -1
      );

      acc[name] = tagItems.length;

      return acc;
    },
    {}
  );

  const paths = allTags.flatMap(({ name: tagName }) =>
    Array.from(
      { length: Math.ceil(lengthByTags[tagName] / ITEMS_PER_PAGE) },
      (_, i) => ({
        params: {
          tagName,
          page: (i + 1).toString(),
        },
      })
    )
  );

  return {
    paths,
    fallback: "blocking",
  };
};
