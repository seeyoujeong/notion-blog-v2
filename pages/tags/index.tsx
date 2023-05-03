import { getDatabaseItems } from "@/cms/notionClient";
import PageHead from "@/components/layout/PageHead";
import TagContainer from "@/components/tags/TagContainer";
import TagHeroSection from "@/components/tags/TagHeroSection";
import { getAllTags } from "@/utils/getAllTags";
import { MultiSelectPropertyItemObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { GetStaticProps } from "next";

interface TagIndexProps {
  allTags: MultiSelectPropertyItemObjectResponse["multi_select"];
}

function TagIndex({ allTags }: TagIndexProps) {
  const keywords = allTags.map((tag) => tag.name).join(", ");

  return (
    <div className="min-h-[calc(100vh-72px-88px)]">
      <PageHead title="All Tags" keywords={keywords} />
      <TagHeroSection />
      <TagContainer tags={allTags} />
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
