import { atom } from "jotai";

export interface Cocktail {
    id: string;
    name: string;
    instructions: string;
    imageUrl: string;
    alcoholic: boolean;
    glass: string;
    category: string;
    createdAt:string[];
    updatedAt:string[];
    ingredients: { name: string; type: string; alcohol: boolean; id:string; measure:string; percentage:number; createdAt:string[]; updatedAt:string[]; description:string; imageUrl:string }[];
}
export const CocktailAtom = atom<Cocktail | null>(null);