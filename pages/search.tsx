import SearchInputSection from "@/components/search/SearchInputSection";
import SearchResultSection from "@/components/search/SearchResultSection";

function Search() {
  return (
    <div className="min-h-[calc(100vh-72px-88px)]">
      <SearchInputSection />
      <SearchResultSection />
    </div>
  );
}

export default Search;
