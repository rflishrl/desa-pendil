import Hero from "./Home/Hero";
import Event from "./Home/Event";
import VillageData from "./Home/VillageData";
import Excellence from "./Home/Advantage";
import Culture from "./Home/Culture";
import Structural from "./Home/Structural";
import Leader from "./Home/Leader";
import Article from "./Home/Article";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export default function Home() {
  return (
    <main className={`${montserrat.variable} font-sans`}>
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
