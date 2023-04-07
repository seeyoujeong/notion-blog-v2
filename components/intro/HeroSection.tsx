import Link from "next/link";

function HeroSection() {
  return (
    <section>
      <div className="flex flex-col md:items-start gap-8 py-16 px-4 w-4/5 max-w-5xl mx-auto text-center md:text-left">
        <div className="relative">
          <span className="absolute left-1/2 -bottom-2 -translate-x-1/2 rotate-45 bg-black w-6 h-6" />
          <span className="font-bold text-white bg-black py-2 px-4 rounded-lg relative">
            WOW! 와우! わう!
          </span>
        </div>

        <h2 className="font-black text-6xl leading-[1.2] break-keep md:max-w-md">
          Hello World! 헬로, 월드! ハロー, ワールド!
        </h2>

        <p className="font-light text-xl text-gray-400 md: max-w-xl break-keep">
          공부한 내용을 정리하는 블로그입니다. 대부분 컴퓨터 관련 내용일 거
          같습니다.
        </p>

        <Link href={"/about"}>
          <button className="px-4 py-2 border border-black rounded-3xl font-semibold w-28 mx-auto md:mx-0 hover:bg-black hover:text-white">
            About Me
          </button>
        </Link>
      </div>
    </section>
  );
}

export default HeroSection;
