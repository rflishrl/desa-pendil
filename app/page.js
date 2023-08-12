import Hero from "./Home/Hero";
import News from "./Home/News";
import VillageHead from "./Home/VillageHead";
import { Montserrat } from "@next/font/google";
import VillageApparatus from "./Home/VillageApparatus";
import Event from "./Home/Event";
import VillageData from "./Home/VillageData";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: "400",
});

export default function Home() {
  return (
    <main className={montserrat.className}>
      <Hero />
      <News />
      <VillageHead />
      <VillageApparatus />
      <Event />
      <VillageData />
    </main>
  );
}
