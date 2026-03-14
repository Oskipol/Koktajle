import React from "react";
import { useAtom } from "jotai";
import { IngredientAtom } from "../atoms/IngredientAtom";
import { image } from "motion/react-client";
import { inFilterAtom } from "../atoms/inFilterAtom";
import { CocktailAtom } from "../atoms/CocktailAtom";
import { IngredientsAtom } from "../atoms/IngredientsAtom";
import { searchAtom } from "../atoms/searchAtom";
import { inNameAtom } from "../atoms/inNameAtom";

const OpisI = () => {
  const [ingredient, setIngredient] = useAtom(IngredientAtom);
  const [inFilter, setInFilter] = useAtom(inFilterAtom);
  const [cocktail, setCocktail] = useAtom(CocktailAtom);
  const [ingredients, setIngredients] = useAtom(IngredientsAtom);
  const [search, setSearch] = useAtom(searchAtom);
  const [inName, setInName] = useAtom(inNameAtom);
  const szukaj = (id: number, name: string) => {
    setInName(name);
    setSearch("");
    setInFilter(id.toString());
    setIngredient(null);
    setIngredients(false);
    setCocktail(null);
  };
  const getDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleString("en-EN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  return (
    <div>
      {ingredient !== null && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
          <div
            className="backdrop-blur-xl absolute inset-0 bg-black/40"
            onClick={() => setIngredient(null)}
          />

          <div className="relative w-full max-w-5xl max-h-[90vh] rounded-2xl overflow-hidden shadow-2xl flex flex-col">
            <div
              className="absolute inset-0 z-0"
              style={{
                background:
                  "linear-gradient(to right, #00dbde 0%, #fc00ff 100%)",
              }}
            />
            <div className="absolute inset-0 z-0 bg-black/50 backdrop-blur-sm"></div>

            <button
              onClick={() => setIngredient(null)}
              className="absolute top-3 right-3 z-30 cursor-pointer w-9 h-9 flex items-center justify-center rounded-xl text-white border-2 border-white/60 bg-white/10 hover:bg-white/30 transition-all duration-200 text-lg font-bold shrink-0"
            >
              ✕
            </button>

            <div className="relative z-10 overflow-y-auto flex-1 scrollbar-thin">
              <div className="flex flex-col md:flex-row min-h-full">
                <div className="md:w-1/2 w-full px-6 py-10 md:px-10 flex flex-col gap-5 bg-black/30">
                  <div>
                    <h1
                      className="text-white font-bold cursor-pointer hover:text-fuchsia-300 duration-300 text-2xl sm:text-3xl md:text-4xl leading-tight break-words"
                      onClick={() => szukaj(ingredient.id, ingredient.name)}
                    >
                      {ingredient.name}
                    </h1>
                    <h3 className="text-white/70 text-sm sm:text-base mt-1">
                      {ingredient?.type}
                    </h3>
                  </div>
                  <div></div>
                  <div className="flex flex-col gap-3">
                    <p className="text-white/90 italic text-sm sm:text-base leading-relaxed">
                      {ingredient.description
                        ? ingredient.description
                        : "No description available."}
                    </p>
                    <div className="text-yellow-200/80 text-xs sm:text-sm space-y-0.5">
                      <p>Created at: {getDate(ingredient?.createdAt)}</p>
                      <p>Updated at: {getDate(ingredient?.updatedAt)}</p>
                    </div>
                  </div>
                </div>
                <div className="md:w-1/2 w-full flex items-center justify-center p-8 min-h-[240px]">
                  <div
                    style={{
                      background: `url(${ingredient.imageUrl})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                    className="w-full max-w-xs aspect-square rounded-2xl shadow-xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OpisI;
