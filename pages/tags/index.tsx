import { getDatabaseItems } from "@/cms/notionClient";
import TagContainer from "@/components/tags/TagContainer";
import TagHeroSection from "@/components/tags/TagHeroSection";
import { getAllTags } from "@/utils/getAllTags";
import { MultiSelectPropertyItemObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { GetStaticProps } from "next";

interface TagIndexProps {
  allTags: MultiSelectPropertyItemObjectResponse["multi_select"];
}

function TagIndex({ allTags }: TagIndexProps) {
  return (
    <div className="min-h-[calc(100vh-72px-88px)]">
      <TagHeroSection />
      <TagContainer tags={allTags} />{" "}
    </div>
  );
}

export default TagIndex;

export const getStaticProps: GetStaticProps<TagIndexProps> = async () => {
  if (!process.env.DATABASE_ID) {
    throw new Error("DATABASE_ID is not defined.");
  }

  const databaseItems = await getDatabaseItems(process.env.DATABASE_ID);

  const allTags = getAllTags(databaseItems);

  return {
    props: {
      allTags,
    },
  };
};
