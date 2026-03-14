'use client';
import React from 'react'
import { IoStar } from "react-icons/io5";
import { IoStarOutline } from 'react-icons/io5';
import { IoSparkles } from "react-icons/io5";
import { IoSparklesOutline } from "react-icons/io5";
import { useAtom } from 'jotai';
import { ulubioneAtom } from '../atoms/UlubioneAtom';
import { IngredientsAtom } from '../atoms/IngredientsAtom';
import { CocktailAtom } from '../atoms/CocktailAtom';

const Navbar = () => {
  const [ulubione, setUlubione] = useAtom(ulubioneAtom);
  const [ingredients, setIngredients] = useAtom(IngredientsAtom);
  const [cocktail, setCocktail] = useAtom(CocktailAtom);
  return (
    <div className={`${cocktail ? 'absolute' : 'fixed'} w-full z-100 top-0 left-0 h-[7%] flex justify-between font-Roboto items-center min-h-15 bg-black/50 backdrop-blur-sm text-white text-lg contain-inline-size font-bold`}>
      <div className='cursor-pointer lg:text-2xl md:text-xl text-l mx-[5%] skladniki relative' onClick={()=>{setIngredients(!ingredients)}}><span className='hidden sm:block' style={{color: ingredients? "#c937fa":"white"}}>Ingredients</span>
        <span className='block scale-150 sm:hidden'>{ingredients ? <IoSparkles /> : <IoSparklesOutline />}</span>
      </div>
      <div className='cursor-pointer lg:text-5xl md:text-4xl text-3xl mx-[5%] [text-shadow:0_0_5px_#d4d4d4,0_0_10px_#d4d4d4,0_0_20px_#a6a6a6] relative'><a href="/Cocktails">Cocktails</a></div>
      <div className='cursor-pointer skladniki mx-[5%] relative lg:text-2xl md:text-xl text-l ' onClick={()=>{setUlubione(!ulubione)}}>
        <span className='hidden sm:block' style={{color: ulubione?"#c937fa":"white"}}>Favorite</span>
        <span className='block scale-150 sm:hidden'>{ulubione ? <IoStar /> : <IoStarOutline />}</span>
        </div>
    </div>
  )
}

export default Navbar