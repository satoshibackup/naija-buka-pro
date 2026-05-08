import Hero from "@/components/Hero";
import MenuGrid from "@/components/MenuGrid";
import StatsBar from "@/components/StatsBar";
import Catering from "@/components/Catering";
import site from "@/../data/site.json";

export default function Home() {
  return (
    <div>
      <Hero />
      <StatsBar />
      <MenuGrid />
      {site.cateringEnabled && <Catering />}
    </div>
  );
}
