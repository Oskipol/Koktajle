import { atom } from "jotai";

export interface Ingredient{
    id: number;
    name: string;
    description: string;
    alcohol: boolean;
    type: string;
    percentage: number;
    imageUrl: string;
    createdAt: string;
    updatedAt: string;
}
export const IngredientAtom=atom<Ingredient | null>(null); 