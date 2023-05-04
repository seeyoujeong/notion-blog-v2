import { getDatabaseItems } from "@/cms/notionClient";
import CardSection from "@/components/intro/CardSection";
import HeroSection from "@/components/intro/HeroSection";
import { ITEMS_PER_PAGE } from "@/const/const";
import {
  ParsedDatabaseItemType,
  parseDatabaseItems,
} from "@/utils/parseDatabaseItems";
import { insertPreviewImage } from "@/utils/previewImage";
import { GetStaticProps } from "next";

export interface HomeProps {
  databaseItems: ParsedDatabaseItemType[];
  totalLength: number;
}

function Home({ databaseItems, totalLength }: HomeProps) {
  return (
    <div className="min-h-[calc(100vh-72px-96px)]">
      <HeroSection />
      <CardSection cardItems={databaseItems} totalLength={totalLength} />
    </div>
  );
}

export default Home;

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  if (!process.env.DATABASE_ID) {
    throw new Error("DATABASE_ID is not defined.");
  }

  const databaseItems = await getDatabaseItems(process.env.DATABASE_ID);

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
    },
    revalidate: 180,
  };
};
