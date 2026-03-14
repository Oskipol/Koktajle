"use client";
import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { LoaderOne } from "./Loader";
import { IoStarOutline } from "react-icons/io5";
import { IoWineSharp } from "react-icons/io5";
import { IoStar } from "react-icons/io5";
import { Ulubione } from "./Favorites";
import { useAtom } from "jotai";
import { ulubioneAtom } from "../atoms/UlubioneAtom";
import { IngredientsAtom } from "../atoms/IngredientsAtom";
import { CocktailAtom } from "../atoms/CocktailAtom";
import { IoSearchSharp } from "react-icons/io5";
import { useDebounce } from "use-debounce";
import { IoChevronDownCircleSharp } from "react-icons/io5";
import { IngredientAtom } from "../atoms/IngredientAtom";
import { searchAtom } from "../atoms/searchAtom";
import { inFilterAtom } from "../atoms/inFilterAtom";
import { div } from "motion/react-client";
import { inNameAtom } from "../atoms/inNameAtom";
import { IoTrashSharp } from "react-icons/io5";

const fetchKoktajle = async (
  ingredients: boolean,
  alcoholic: number,
  categories: string,
  glasses: string,
  type: string,
  inFilter: string,
) => {
  categories.replace(" ", "%20");
  glasses.replace(" ", "%20");
  const alkohol =
    alcoholic === 0
      ? ""
      : alcoholic === 1
        ? "alcoholic=true&"
        : "alcoholic=false&";
  const glas = glasses ? "glass=" + glasses + "&" : "";
  const Ing = inFilter ? `ingredientId=${inFilter}&` : "";
  const cocoktails = ingredients
    ? alcoholic === 0
      ? "ingredients?"
      : alcoholic === 1
        ? "ingredients?alcohol=true&"
        : "ingredients?alcohol=false&"
    : "cocktails?ingredients=true&";
  const category = categories ? "category=" + categories + "&" : "";
  const typeParam = type ? "type=" + type + "&" : "";
  const res = await fetch(
    `https://cocktails.solvro.pl/api/v1/${cocoktails}${alkohol}${glas}${Ing}${category}${typeParam}page=1&perPage=9999999999999`,
  );
  const json = await res.json();
  return json.data;
};

const fetchCategories = async () => {
  const res = await fetch(
    "https://cocktails.solvro.pl/api/v1/cocktails/categories",
  );
  const json = await res.json();
  return json.data;
};
const fetchGlasses = async () => {
  const res = await fetch(
    "https://cocktails.solvro.pl/api/v1/cocktails/glasses",
  );
  const json = await res.json();
  return json.data;
};

const fetchType = async () => {
  const res = await fetch(
    "https://cocktails.solvro.pl/api/v1/ingredients/types",
  );
  const json = await res.json();
  return json.data;
};

const Koktajle = () => {
  const [cocktail, setCocktail] = useAtom(CocktailAtom);
  const [ingredients, setIngredients] = useAtom(IngredientsAtom);
  const [ulubione] = useAtom(ulubioneAtom);
  const [categories, setCategories] = useState("");
  const [glasses, setGlasses] = useState("");
  const { Zmien, isFavorite } = Ulubione();
  const [alcoholic, setAlcoholic] = useState(0);
  const [search, setSearch] = useAtom(searchAtom);
  const [debouncedSearch] = useDebounce(search, 300);
  const [inName, setInName] = useAtom(inNameAtom);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [type, setType] = useState("");
  const [ingredient, setIngredient] = useAtom(IngredientAtom);
  const [inFilter, setInFilter] = useAtom(inFilterAtom);
  const {
    data: DataCocktails,
    isLoading: isLoadingCocktails,
    error: errorCocktails,
  } = useQuery({
    queryKey: [
      "cocktails",
      ingredients,
      alcoholic,
      categories,
      glasses,
      type,
      inFilter,
    ],
    queryFn: () =>
      fetchKoktajle(
        ingredients,
        alcoholic,
        categories,
        glasses,
        type,
        inFilter,
      ),
  });
  const {
    data: DataCategories,
    isLoading: isLoadingCategories,
    error: errorCategories,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });
  const {
    data: DataGlasses,
    isLoading: isLoadingGlasses,
    error: errorGlasses,
  } = useQuery({
    queryKey: ["glasses"],
    queryFn: fetchGlasses,
  });
  const {
    data: DataType,
    isLoading: isLoadingType,
    error: errorType,
  } = useQuery({
    queryKey: ["type"],
    queryFn: fetchType,
  });

  if (isLoadingCocktails)
    return (
      <div className="w-full h-[50vh] mt-10 flex items-center justify-center">
        <LoaderOne />
      </div>
    );
  if (errorCocktails)
    return (
      <p className="text-red-500 w-full h-[50vh] mt-10 flex font-bold text-4xl md:text-6xl lg:text-8xl items-center justify-center">
        Error
      </p>
    );

  const filteredData = ulubione
    ? DataCocktails.filter((cocktail: any) => isFavorite(cocktail.id))
    : DataCocktails;
  const filteredData1 = filteredData.filter(
    (cocktail: any) => cocktail.imageUrl !== null,
  );
  const filteredData2 = filteredData1.filter((cocktail: any) =>
    cocktail.name.toLowerCase().includes(debouncedSearch.toLowerCase()),
  );

  const sugestions = filteredData2.slice(0, 5);

  return (
    <div className="w-full mt-20">
      <div className="w-full h-[10%] mb-5 min-h-10 flex relative justify-center items-center">
        <span className="lg:w-[60%] md:w-[70%] w-[80%] h-full relative border-2 hover:border-white duration-300 text-white border-[rgba(255,255,255,0.5)] bg-[rgba(201,55,250,0.3)] rounded-2xl text-center">
          <input
            value={search}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            onChange={(e) => {
              setSearch(e.target.value);
              setShowSuggestions(true);
            }}
            type="text"
            name="search"
            id=""
            className="w-full h-full min-h-10 text-center"
            placeholder={
              ingredients
                ? "Search ingredients..."
                : ulubione
                  ? "Search favorites..."
                  : "Search cocktails..."
            }
          />
          <span className="absolute right-0 top-[50%] translate-y-[-50%] scale-150 mr-[2%]">
            <IoSearchSharp />
          </span>
        </span>
        {debouncedSearch && (
          <div className="absolute lg:w-[59%] md:w-[69%] w-[79%] top-full z-10 bg-fuchsia-500 border rounded shadow">
            {showSuggestions && (
              <div>
                {sugestions?.map((cocktail: any) => (
                  <div
                    key={cocktail.id}
                    className="p-2 hover:bg-[rgba(201,55,250,1)] cursor-pointer"
                    onClick={() => {
                      setSearch(cocktail.name);
                      setShowSuggestions(false);
                    }}
                  >
                    {cocktail.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      <div className="w-full flex min-h-15 p-5 justify-center items-center gap-5 h-[10%] mb-5 ">
        {!ingredients && (
          <>
            <div className="border-2 min-h-10 font-Roboto relative font-bold border-fuchsia-900 hover:border-fuchsia-500 duration-300 w-auto max-w-[38%] h-full flex rounded-2xl bg-[rgba(201,55,250,0.5)]">
              <select
                name="category"
                className="text-white z-1 overflow-hidden text-left ml-2 cursor-pointer flex justify-center"
                value={""}
                onChange={(e) => {
                  setCategories(e.target.value);
                }}
              >
                <option
                  disabled
                  className="bg-[rgba(201,55,250,1)] text-black font-bold"
                  value=""
                >
                  {categories ? categories : "Categories"}
                </option>
                <option className="bg-[rgba(201,55,250,1)]" value="">
                  All
                </option>
                {DataCategories.map((category: any, index: number) => (
                  <option
                    key={index}
                    className="bg-[rgba(201,55,250,1)]"
                    value={category}
                  >
                    {category}
                  </option>
                ))}
              </select>
              <span className="absolute right-0 scale-150 top-[50%] translate-y-[-50%] mr-2 z-0">
                <IoChevronDownCircleSharp />
              </span>
            </div>
            <div className="border-2 relative w-auto max-w-[30%] min-h-10 font-Roboto font-bold border-fuchsia-900 hover:border-fuchsia-500 duration-300 h-full flex rounded-2xl bg-[rgba(201,55,250,0.5)]">
              <select
                name="category"
                className="text-white overflow-hidden z-1 ml-2 text-left cursor-pointer flex justify-center"
                value={""}
                onChange={(e) => setGlasses(e.target.value)}
              >
                <option
                  disabled
                  className="bg-[rgba(201,55,250,1)] text-black font-bold"
                  value=""
                >
                  {glasses ? glasses : "Glasses"}
                </option>
                <option className="bg-[rgba(201,55,250,1)]" value="">
                  All
                </option>
                {DataGlasses.map((glass: any, index: number) => (
                  <option
                    key={index}
                    className="bg-[rgba(201,55,250,1)]"
                    value={glass}
                  >
                    {glass}
                  </option>
                ))}
              </select>
              <span className="absolute right-0 scale-150 top-[50%] translate-y-[-50%] mr-2 z-0">
                <IoChevronDownCircleSharp />
              </span>
            </div>
          </>
        )}
        {ingredients && (
          <div className="border-2 min-h-10 font-Roboto relative font-bold border-fuchsia-900 hover:border-fuchsia-500 duration-300 w-auto max-w-[38%] h-full flex rounded-2xl bg-[rgba(201,55,250,0.5)]">
            <select
              name="category"
              className="text-white overflow-hidden z-1 text-left ml-2 cursor-pointer flex justify-center"
              value={""}
              onChange={(e) => {
                setType(e.target.value);
              }}
            >
              <option
                disabled
                className="bg-[rgba(201,55,250,1)] text-black font-bold"
                value=""
              >
                {type ? type : "Types"}
              </option>
              <option className="bg-[rgba(201,55,250,1)]" value="">
                All
              </option>
              {DataType.map((type: any, index: number) => (
                <option
                  key={index}
                  className="bg-[rgba(201,55,250,1)]"
                  value={type}
                >
                  {type}
                </option>
              ))}
            </select>
            <span className="absolute right-0 scale-150 top-[50%] translate-y-[-50%] mr-2 z-0">
              <IoChevronDownCircleSharp />
            </span>
          </div>
        )}
        <div
          className="min-h-10 border-2 border-fuchsia-900 z-1 relative hover:border-fuchsia-500 duration-300 text-white font-Roboto font-bold cursor-pointer flex justify-center items-center px-10 w-auto h-full rounded-2xl max-w-[30%]"
          onClick={() => {
            if (alcoholic == 0) setAlcoholic(1);
            else if (alcoholic == 1) setAlcoholic(2);
            else setAlcoholic(0);
          }}
          style={{
            background:
              alcoholic === 0
                ? "rgba(201,55,250,0.5)"
                : alcoholic === 1
                  ? "red"
                  : "green",
          }}
        >
          Alcoholic
        </div>
      </div>
      {inFilter && (
        <div className="w-full min-h-10 relative flex justify-center items-center">
          <div className="w-[50%] min-h-10 flex justify-around items-center text-shadow-lg text-shadow-black text-white text-2xl font-bold font-Roboto">
            <div>Cocktails that contains: {inName}</div>
            <div
              className="scale-150 cursor-pointer"
              onClick={() => {
                setInFilter("");
                setInName("");
              }}
            >
              <IoTrashSharp />
            </div>
          </div>
        </div>
      )}
      <div className="w-[90%] mx-auto h-full pb-[20vh] grid lg:grid-cols-3 lg:mt-50 md:mt-50 mt-30 md:grid-cols-2 grid-cols-1 gap-10">
        {filteredData2?.map((cocktail: any) => (
          <div
            key={cocktail.id}
            className="flex group duration-300 justify-start items-start"
          >
            <div
              key={cocktail.id}
              className="w-full h-full bg-[rgba(50,50,50,0.2)] backdrop-blur-xl rounded-[7%] group-hover:scale-105 p-5 text-white font-Roboto font-bold text-lg flex flex-col duration-300 justify-center items-center"
            >
              <img
                onClick={() => {
                  ingredients ? setIngredient(cocktail) : setCocktail(cocktail);
                }}
                src={
                  cocktail.imageUrl ? cocktail.imageUrl : "/Cocktails/no.png"
                }
                alt={cocktail.name}
                className="w-full cursor-pointer h-full p-[5%] rounded-[10%] object-cover object-center"
              />
              <div className="w-full h-auto mt-5 flex justify-between items-center">
                <div>
                  {cocktail.alcoholic ? (
                    <IoWineSharp />
                  ) : cocktail.alcohol && cocktail.percentage ? (
                    cocktail.percentage + "%"
                  ) : (
                    ""
                  )}
                </div>
                <h2 className="text-center text-xl md:text-2xl lg:text-3xl">
                  {cocktail.name}
                </h2>
                <div
                  className="scale-250 cursor-pointer m-5"
                  onClick={() => {
                    Zmien(cocktail.id);
                  }}
                >
                  {isFavorite(cocktail.id) ? <IoStar /> : <IoStarOutline />}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Koktajle;
