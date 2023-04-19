import { type ParsedDatabaseItem } from "@/utils/parseDatabaseItems";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CardList from "../card/CardList";
import { GetSearchResponse } from "@/pages/api/getSearch";

function SearchResultSection() {
  const { query } = useRouter();
  const searchQuery = query.query?.toString();
  const [searchResult, setSearchResult] = useState<ParsedDatabaseItem[]>([]);

  useEffect(() => {
    const getSearchWithQuery = async () => {
      if (!searchQuery) {
        return;
      }

      const result = await fetch(`/api/getSearch?query=${searchQuery}`);

      if (result.ok) {
        const { databaseItems }: GetSearchResponse = await result.json();
        setSearchResult(databaseItems);
      }
    };

    getSearchWithQuery();
  }, [searchQuery]);

  return (
    <section>
      <div className="w-4/5 max-w-5xl mx-auto py-16">
        {searchResult.length ? <CardList cardItems={searchResult} /> : null}
      </div>
    </section>
  );
}

export default SearchResultSection;
