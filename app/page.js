import Hero from "./Home/Hero";
import News from "./Home/News";
import VillageHead from "./Home/VillageHead";
import { Montserrat } from "@next/font/google";
import VillageApparatus from "./Home/VillageApparatus";
import Event from "./Home/Event";
import VillageData from "./Home/VillageData";
import Excellence from "./Home/Excellence";
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
