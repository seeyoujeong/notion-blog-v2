import dynamic from "next/dynamic";
import nextImage from "next/image";
import nextLink from "next/link";
import { ExtendedRecordMap } from "notion-types";
import { NotionRenderer } from "react-notion-x";

const Code = dynamic(
  () => import("react-notion-x/build/third-party/code").then((m) => m.Code),
  {
    ssr: false,
  }
);

const Collection = dynamic(() =>
  import("react-notion-x/build/third-party/collection").then(
    (m) => m.Collection
  )
);

const Equation = dynamic(() =>
  import("react-notion-x/build/third-party/equation").then((m) => m.Equation)
);

const Pdf = dynamic(
  () => import("react-notion-x/build/third-party/modal").then((m) => m.Modal),
  {
    ssr: false,
  }
);

const Modal = dynamic(
  () => import("react-notion-x/build/third-party/modal").then((m) => m.Modal),
  {
    ssr: false,
  }
);

interface NotionPageRendererProps {
  recordMap: ExtendedRecordMap;
}

function NotionPageRenderer({ recordMap }: NotionPageRendererProps) {
  return (
    <NotionRenderer
      recordMap={recordMap}
      disableHeader
      fullPage
      showTableOfContents
      components={{
        Code,
        Collection,
        Equation,
        Pdf,
        Modal,
        nextLink,
        nextImage,
      }}
    />
  );
}

export default NotionPageRenderer;
