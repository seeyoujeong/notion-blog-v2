interface TagHeroSectionProps {
  title?: string;
}

function TagHeroSection({ title = "All Tags" }: TagHeroSectionProps) {
  const replaceUnderbarTitle = title.includes("_")
    ? title.replaceAll("_", " ")
    : title;

  return (
    <section>
      <div className="w-4/5 mx-auto max-w-5xl flex flex-col gap-4 py-12 px-4">
        <p className="font-medium text-gray-500 text-2xl leading-normal">
          Tag Collection
        </p>
        <h2 className="font-bold text-6xl">{replaceUnderbarTitle}</h2>
      </div>
    </section>
  );
}

export default TagHeroSection;
