import AboutSection from "@/components/about/AboutSection";
import PageHead from "@/components/layout/PageHead";

function AboutIndex() {
  return (
    <div className="min-h-[calc(100vh-72px-88px)]">
      <PageHead title="About" />
      <AboutSection />
    </div>
  );
}

export default AboutIndex;
