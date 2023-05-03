import Link from "next/link";
import { AiOutlineGithub, AiOutlineInstagram } from "react-icons/ai";

function Footer() {
  return (
    <footer className="bg-gray-100">
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-0 justify-between items-center max-w-5xl mx-auto py-4 sm:p-8">
        <div className="text-gray-600">
          &copy; 2023 seeyoujeong All rights reserved.
        </div>
        <ul className="flex flex-row gap-2 items-center text-gray-600">
          <li key="github">
            <Link href={"https://github.com/seeyoujeong"} passHref>
              <a target="_blank" rel="noopener noreferroer">
                <AiOutlineGithub size={"2rem"} />
              </a>
            </Link>
          </li>
          <li key="instagram">
            <Link href={"https://www.instagram.com/seeyoujeong"} passHref>
              <a target="_blank" rel="noopener noreferroer">
                <AiOutlineInstagram size={"2rem"} />
              </a>
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
