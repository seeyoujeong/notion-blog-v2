import { useRouter } from "next/router";
import CardList from "../card/CardList";
import { GetSearchResponse } from "@/pages/api/getSearch";
import useSWR from "swr";
import LoadingSpinner from "../common/LoadingSpinner";
import { AiOutlineFileSearch } from "react-icons/ai";

function SearchResultSection() {
  const { query } = useRouter();
  const searchQuery = query.query?.toString();
  const { data, error, isLoading } = useSWR(
    `/api/getSearch?query=${searchQuery}`,
    async (url) => {
      if (!searchQuery) {
        return;
      }

      const result = await fetch(url);

      if (result.ok) {
        const { databaseItems }: GetSearchResponse = await result.json();
        return databaseItems;
      }
    }
  );

  return (
    <section>
      <div className="w-4/5 max-w-5xl mx-auto py-16">
        {data ? <CardList cardItems={data} /> : <NotDataIndicator />}
        {isLoading ? <LoadingIndicator /> : null}
        {error ? <ErrorIndicator /> : null}
      </div>
    </section>
  );
}

export default SearchResultSection;

function NotDataIndicator() {
  return (
    <div className="flex flex-col justify-center items-center">
      <AiOutlineFileSearch size={"4rem"} />
      <p className="text-2xl font-bold">Please Search Title!</p>
    </div>
  );
}

function LoadingIndicator() {
  return (
    <div className="flex justify-center items-center">
      <LoadingSpinner />
    </div>
  );
}

interface ErrorIndicatorProps {
  error?: Error;
}

function ErrorIndicator({ error }: ErrorIndicatorProps) {
  return (
    <p className="text-center font-semibold text-xl text-red-400">
      Something went wrong! <br /> {error?.message}
    </p>
  );
}
