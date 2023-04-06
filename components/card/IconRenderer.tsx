import { ParsedDatabaseItem } from "@/utils/parseDatabaseItems";
import Image from "next/image";

interface IconRendererProps {
  icon: ParsedDatabaseItem["icon"];
  alt: string;
}

function IconRenderer({ icon, alt }: IconRendererProps) {
  if (!icon) return null;

  if (icon.type === "emoji") return <span>{icon.emoji}</span>;

  const iconUrl = icon.type === "file" ? icon.file.url : icon.external.url;

  return (
    <Image
      src={iconUrl}
      alt={`${alt} icon`}
      width={28}
      height={28}
      className="rounded-full"
    />
  );
}

export default IconRenderer;
