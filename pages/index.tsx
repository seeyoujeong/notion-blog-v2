import { getDatabaseItems } from "@/cms/notionClient";
import { GetStaticProps } from "next";

function Home() {
  return <div>Home</div>;
}

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  if (!process.env.DATABASE_ID) {
    throw new Error("DATABASE_ID is not defined.");
  }

  const databaseItems = await getDatabaseItems(process.env.DATABASE_ID);

  console.log(databaseItems);

  return {
    props: {},
  };
};
