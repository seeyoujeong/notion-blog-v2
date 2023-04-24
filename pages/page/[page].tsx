import { getDatabaseItems } from "@/cms/notionClient";
import { ITEMS_PER_PAGE } from "@/const/const";
import Home, { HomeProps } from "@/pages/index";
import { parseDatabaseItems } from "@/utils/parseDatabaseItems";
import { GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";

function HomeWithPage({ databaseItems, totalLength }: HomeProps) {
  return <Home databaseItems={databaseItems} totalLength={totalLength} />;
}

export default HomeWithPage;

interface HomeWithPageParams extends ParsedUrlQuery {
  page: string;
}

export const getStaticProps: GetStaticProps<
  HomeProps,
  HomeWithPageParams
> = async ({ params }) => {
  if (!process.env.DATABASE_ID) throw new Error("DATABASE_ID is not defined.");

  const databaseItems = await getDatabaseItems(process.env.DATABASE_ID);

  const page = params?.page ? Number(params.page) : 1;

  const parsedDatabaseItems = parseDatabaseItems(
    databaseItems.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)
  );

  return {
    props: {
      databaseItems: parsedDatabaseItems,
      totalLength: databaseItems.length,
    },
    revalidate: 180,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  if (!process.env.DATABASE_ID) throw new Error("DATABASE_ID is not defined.");

  const databaseItems = await getDatabaseItems(process.env.DATABASE_ID);

  const paths = Array.from(
    { length: Math.ceil(databaseItems.length / ITEMS_PER_PAGE) },
    (_, i) => ({
      params: {
        page: (i + 1).toString(),
      },
    })
  );

  return {
    paths,
    fallback: "blocking",
  };
};
