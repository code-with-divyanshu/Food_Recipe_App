import React, { useContext } from "react";
import RecipeItem from "../../components/RecipeItem/RecipeItem";
import { GlobalContext } from "../../context";

export default function Favorites() {
  const { favoritesList } = useContext(GlobalContext);

  return (
    <>
      <h1 className="text-center my-4 text-black font-bold">
        Favorite Recipes Lists
      </h1>
      <div className="py-8 container mx-auto flex flex-wrap justify-center gap-10">
        {favoritesList && favoritesList.length > 0 ? (
          favoritesList.map((item) => <RecipeItem item={item} />)
        ) : (
          <div>
            <p className="lg:tex-4xl text-xl text-center text-black font-extrabold">
              Nothing is added in Favorites.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
