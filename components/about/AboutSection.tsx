import IconButton from "@/components/common/IconButton";
import { AiOutlineGithub } from "react-icons/ai";
import Link from "next/link";

function AboutSection() {
  return (
    <section>
      <div className="w-4/5 mx-auto max-w-5xl flex flex-col gap-4 py-12 px-4">
        <h2 className="font-bold text-6xl">About</h2>
        <p>내용</p>

        <Link href={"https://github.com/seeyoujeong"} passHref>
          <a target="_blank" rel="noopener noreferroer">
            <IconButton
              icon={<AiOutlineGithub size={"1.5rem"} color="white" />}
            />
          </a>
        </Link>
      </div>
    </section>
  );
}

export default AboutSection;
