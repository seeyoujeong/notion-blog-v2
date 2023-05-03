import Head from "next/head";
import { useRouter } from "next/router";

const DEFAULT_TITLE = "seeyoujeong blog";
const DEFAULT_DESCRIPTION = "seeyoujoeng's devlog";
const DEFAULT_KEYWORDS =
  "Next.js, Notion, Blog, TypeScript, React, SWR, TailWind CSS, Vercel, SSG, ISR";
const DEFAULT_URL = "https://notion-blog-woad-nine.vercel.app";
const DEFAULT_AUTHOR = "seeyoujeong";

export interface PageHeadProps {
  title: string;
  description: string;
  keywords: string;
  image: string;
}

function PageHead({
  title,
  description,
  keywords,
  image,
}: Partial<PageHeadProps>) {
  const { asPath } = useRouter();

  const defaultOgImage = `/api/og?title=${DEFAULT_TITLE}`;

  const pageTitle = title ? `${title} | ${DEFAULT_TITLE}` : DEFAULT_TITLE;
  const pageDescription = description ?? DEFAULT_DESCRIPTION;
  const pageKeywords = keywords
    ? `${keywords}, ${DEFAULT_KEYWORDS}`
    : DEFAULT_KEYWORDS;
  const pageImage = `${process.env.SITE_URL ?? DEFAULT_URL}${
    image ?? defaultOgImage
  }`;
  const pageUrl = `${process.env.SITE_URL ?? DEFAULT_URL}${asPath}`;

  return (
    <Head>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta name="keywords" content={pageKeywords} />
      <meta name="author" content="seeyoujeong" />
      <link rel="canonical" href={pageUrl} />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:site_name" content={pageTitle} />
      <meta property="og:locale" content="ko_KR" />

      <meta property="og:image" content={pageImage} />
      <meta property="og:image:alt" content={pageTitle} />
      <meta property="og:image:width" content="640" />
      <meta property="og:image:height" content="425" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={DEFAULT_AUTHOR} />
      <meta name="twitter:creator" content={DEFAULT_AUTHOR} />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={pageImage} />
      <meta property="twitter:image:alt" content={pageTitle} />
    </Head>
  );
}

export default PageHead;
