'use client'
import Image from "next/image";
import { QueryClientProvider } from "@tanstack/react-query";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Koktajle from "./components/Koktajle";
import { useAtom } from "jotai";
import { CocktailAtom } from "./atoms/CocktailAtom";
import Opis from "./components/OpisK";
import { IngredientsAtom } from "./atoms/IngredientsAtom";
import { IngredientAtom } from "./atoms/IngredientAtom";
import OpisI from "./components/OpisI";
import { div } from "motion/react-client";

export default function Home() {
  const [cocktail] = useAtom(CocktailAtom);
  const [ingredients]=useAtom(IngredientsAtom);
  const [ingredient]=useAtom(IngredientAtom);
  return (
    <main className="relative w-full overflow-hidden h-full flex flex-col h-min-screen mx-auto bg-[url('/Cocktails/tlo.jpg')] bg-cover bg-center bg-fixed">
      
      <Navbar/>
      <div className={`w-full min-h-screen ${cocktail||ingredient?"overflow-hidden":"overflow-y-scroll"} ${cocktail&&ingredients&&!ingredient?"overflow-scroll":""}`}>
        <Hero />
        <Koktajle/>
        {cocktail!==null && !ingredients&&(
        <Opis />
      )}
        {ingredient!==null&&ingredients&&(
          <OpisI/>
        )}
      </div>
      
      
    </main>
  );
}
