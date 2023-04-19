import IconButton from "../common/IconButton";
import { AiOutlineSearch } from "react-icons/ai";
import Link from "next/link";

const navLinks = [
  {
    name: "Tags",
    link: "/tags",
  },
  {
    name: "About",
    link: "/about",
  },
];

function Header() {
  return (
    <>
      <header className="bg-white fixed top-0 w-full z-50 drop-shadow">
        <nav className="p-4 flex flex-row justify-between max-w-5xl mx-auto">
          <h1 className="text-black font-black text-2xl leading-10">
            <Link href={"/"}>seeyoujeong</Link>
          </h1>
          <ul className="flex flex-row gap-2 items-center">
            {navLinks.map(({ name, link }) => (
              <li key={name} className="text-gray-600 font-medium">
                <Link href={link}>
                  <a className="p-3 hover:bg-gray-100 rounded-md hover:text-black">
                    {name}
                  </a>
                </Link>
              </li>
            ))}
            <Link href={"/search"}>
              <a>
                <IconButton
                  icon={<AiOutlineSearch size={"1.5rem"} color="white" />}
                />
              </a>
            </Link>
          </ul>
        </nav>
      </header>
      <div className="h-[72px]" />
    </>
  );
}

export default Header;
