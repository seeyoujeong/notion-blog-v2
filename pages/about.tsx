import { getPageContent } from "@/cms/notionClient";
import PageHead from "@/components/layout/PageHead";
import NotionPageRenderer from "@/components/notion/NotionPageRenderer";
import { insertPreviewImageToRecordMap } from "@/utils/previewImage";
import { GetStaticProps } from "next";
import { ExtendedRecordMap } from "notion-types";

interface AboutPageProps {
  recordMap: ExtendedRecordMap;
  ogImage: string;
}

function AboutPage({ recordMap, ogImage }: AboutPageProps) {
  return (
    <div className="min-h-[calc(100vh-72px-96px)]">
      <PageHead title="About" image={ogImage} />
      <NotionPageRenderer recordMap={recordMap} />
    </div>
  );
}

export default AboutPage;

export const getStaticProps: GetStaticProps<AboutPageProps> = async () => {
  const profilePageId = process.env.PROFILE_ID;

  if (!profilePageId) {
    throw new Error("PROFILE_ID is not defined.");
  }

  const recordMap = await getPageContent(profilePageId);

  const previewImages = await insertPreviewImageToRecordMap(recordMap);

  const cover = `/api/getImage?type=cover&pageId=${profilePageId}`;

  return {
    props: {
      recordMap: {
        ...recordMap,
        preview_images: previewImages,
      },
      ogImage: cover,
    },
    revalidate: 180,
  };
};
