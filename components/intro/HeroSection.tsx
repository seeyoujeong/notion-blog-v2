import Link from "next/link";

function HeroSection() {
  return (
    <section>
      <div className="flex flex-col md:items-start gap-8 py-12 px-4 w-4/5 max-w-5xl mx-auto text-center md:text-left">
        <div className="relative">
          <span className="absolute left-1/2 -bottom-2 -translate-x-1/2 rotate-45 bg-black w-6 h-6" />
          <span className="font-bold text-white bg-black py-2 px-4 rounded-lg relative">
            see you!
          </span>
        </div>

        <h2 className="font-black text-6xl leading-[1.2] break-keep">
          안녕, ワールド!
        </h2>

        <p className="font-light text-xl text-gray-600 md:max-w-xl break-keep">
          정리와 기록을 위한 블로그
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
