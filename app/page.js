import { Montserrat } from "@next/font/google";
import Hero from "./Home/Hero";
import Event from "./Home/Event";
import VillageData from "./Home/VillageData";
import Excellence from "./Home/Advantage";
import Culture from "./Home/Culture";
import Structural from "./Home/Structural";
import Leader from "./Home/Leader";
import Article from "./Home/Article";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: "400",
});

export default function Home() {
  return (
    <main className={montserrat.className}>
      <Hero />
      <Article />
      <Leader />
      <Structural />
      <Event />
      <VillageData />
      <Excellence />
      <Culture />
    </main>
  );
}
