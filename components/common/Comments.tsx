import Giscus from "@giscus/react";

function Comments() {
  return (
    <section>
      <div className="w-4/5 max-w-5xl mx-auto pt-10 pb-8">
        <Giscus
          id="comments"
          repo="seeyoujeong/notion-blog"
          repoId="R_kgDOJMXcKA"
          category="giscus"
          categoryId="DIC_kwDOJMXcKM4CWMhG"
          mapping="pathname"
          strict="1"
          reactionsEnabled="1"
          emitMetadata="0"
          inputPosition="top"
          theme="light_protanopia"
          lang="ko"
          loading="lazy"
        />
      </div>
    </section>
  );
}

export default Comments;
