import React from "react";
import { ColourfulText } from "./ColorfulText";
import { TextGenerateEffect } from "./GenerateText";
import { useAtom } from "jotai";
import { IngredientsAtom } from "../atoms/IngredientsAtom";
import { ulubioneAtom } from "../atoms/UlubioneAtom";
import { Ulubione } from "./Favorites";

const Hero = () => {
  const [ingredients] = useAtom(IngredientsAtom);
  const [ulubione] = useAtom(ulubioneAtom);
  return (
    <div className="w-full h-auto mt-[15vh] text-center flex flex-col justify-center items-center text-white ">
      <h1 className="font-bold text-4xl md:text-6xl lg:text-8xl">
        <TextGenerateEffect
          className="font-bold text-4xl md:text-6xl lg:text-8xl"
          words="Discover the world of "
        />
        <span className="opacity-0 animate-fadeIn">
          <ColourfulText text={ingredients ? "Ingredients" : "Cocktails"} />
        </span>
      </h1>
      <p className="text-center mt-[3%] font-bold text-white animate-fadeIn2 md:tracking-wider mb-4 opacity-0 text-sm md:text-lg lg:text-2xl">
        {ingredients
          ? "Explore flavors, mixers and essentials behind every great cocktail."
          : ulubione
            ? "All the drinks you love, saved in one place."
            : "Find recipes, ingredients and inspiration for your next drink."}
      </p>
      <s></s>
    </div>
  );
};

export default Hero;
