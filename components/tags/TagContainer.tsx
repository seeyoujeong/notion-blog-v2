import { MultiSelectPropertyItemObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import TagList from "../card/tag/TagList";

interface TagContainerProps {
  tags: MultiSelectPropertyItemObjectResponse["multi_select"];
}

function TagContainer({ tags }: TagContainerProps) {
  return (
    <section>
      <div className="w-4/5 max-w-5xl mx-auto my-8 px-4">
        <div className="bg-gray-100 rounded-xl">
          <TagList tags={tags} />
        </div>
      </div>
    </section>
  );
}

export default TagContainer;
