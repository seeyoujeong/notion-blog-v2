import { PAGINATION_RANGE } from "@/const/const";
import Link from "next/link";
import { useRouter } from "next/router";

interface PaginationItemProps {
  to: number;
  value: React.ReactNode;
  disabled?: boolean;
  active?: boolean;
}

function PaginationItem({
  to,
  value,
  disabled = false,
  active = false,
}: PaginationItemProps) {
  const { pathname, query } = useRouter();

  const paginationRoute = "/page/[page]";
  const extendedPathname =
    pathname.indexOf(paginationRoute) === -1
      ? `${pathname.replace(/\/$/, "")}${paginationRoute}`
      : pathname;

  return (
    <Link
      href={{
        pathname: extendedPathname,
        query: { ...query, page: to },
      }}
    >
      <button
        className={`px-4 py-2 rounded-lg hover:bg-gray-100 hover:text-black hover:font-semibold disabled:text-gray-400 disabled:cursor-not-allowed ${
          active ? "bg-gray-100 text-black font-semibold" : "text-gray-500"
        }`}
        disabled={disabled}
      >
        {value}
      </button>
    </Link>
  );
}

interface PaginationProps {
  totalPage: number;
}

function Pagination({ totalPage }: PaginationProps) {
  const { query } = useRouter();

  const currentPage = query.page ? Number(query.page) : 1;

  return (
    <div>
      <ul className="flex flex-row gap-2 justify-center">
        <li>
          <PaginationItem
            to={currentPage - 1}
            value="&lt;"
            disabled={currentPage === 1}
          />
        </li>

        {Array.from(
          { length: PAGINATION_RANGE },
          (_, i) => currentPage - PAGINATION_RANGE + i + 2
        ).map((page) =>
          page > 0 && page <= totalPage ? (
            <li key={page}>
              <PaginationItem
                to={page}
                value={page}
                active={page === currentPage}
              />
            </li>
          ) : null
        )}

        <li>
          <PaginationItem
            to={currentPage + 1}
            value="&gt;"
            disabled={currentPage === totalPage}
          />
        </li>
      </ul>
    </div>
  );
}

export default Pagination;
