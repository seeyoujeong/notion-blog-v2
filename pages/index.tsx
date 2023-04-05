import { getDatabaseItems } from "@/cms/notionClient";
import CardSection from "@/components/intro/CardSection";
import HeroSection from "@/components/intro/HeroSection";
import {
  ParsedDatabaseItem,
  parseDatabaseItems,
} from "@/utils/parseDatabaseItems";
import { GetStaticProps } from "next";

interface HomeProps {
  databaseItems: ParsedDatabaseItem[];
}

function Home({ databaseItems }: HomeProps) {
  return (
    <div>
      <HeroSection />
      <CardSection cardItems={databaseItems} />
    </div>
  );
}

export default Home;

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  if (!process.env.DATABASE_ID) {
    throw new Error("DATABASE_ID is not defined.");
  }

  const databaseItems = await getDatabaseItems(process.env.DATABASE_ID);

  const parsedDatabaseItems = parseDatabaseItems(databaseItems);

  return {
    props: {
      databaseItems: parsedDatabaseItems,
    },
  };
};
