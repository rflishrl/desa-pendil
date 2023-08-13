import Hero from "./Home/Hero";
import News from "./Home/News";
import VillageHead from "./Home/Leader";
import { Montserrat } from "@next/font/google";
import VillageApparatus from "./Home/Structural";
import Event from "./Home/Event";
import VillageData from "./Home/VillageData";
import Excellence from "./Home/Advantage";
import Culture from "./Home/Culture";

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
      <Excellence />
      <Culture />
    </main>
  );
}
