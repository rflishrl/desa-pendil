import Hero from "./home/Hero";
import Event from "./home/Event";
import VillageData from "./home/VillageData";
import Excellence from "./home/Advantage";
import Culture from "./home/Culture";
import Structural from "./home/Structural";
import Leader from "./home/Leader";
import Article from "./home/Article";
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
