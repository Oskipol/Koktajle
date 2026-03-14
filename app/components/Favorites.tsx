import { useEffect, useState } from "react";

export function Ulubione() {
  const [favorites, setFavorites] = useState<Set<number>>(new Set());

  useEffect(() => {
    const ulubione = localStorage.getItem("favorites");

    if (ulubione) {
      setFavorites(new Set(JSON.parse(ulubione)));
    }
  }, []);

  const Zmien = (id: number) => {
    const updated = new Set(favorites);

    if (updated.has(id)) updated.delete(id);
    else updated.add(id);

    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify([...updated]));
  };

  const isFavorite = (id: number) => favorites.has(id);

  return { favorites, Zmien, isFavorite };
}
