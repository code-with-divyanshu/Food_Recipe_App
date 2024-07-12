import React, { useContext } from "react";
import { GlobalContext } from "../../context";
import RecipeItem from "../../components/RecipeItem/RecipeItem";

export default function Home() {
  const { loading, recipeList } = useContext(GlobalContext);

  if (loading) return <div>Loadin... Please Wait!</div>;

  return (
    <>
      <div className="py-8 container mx-auto flex flex-wrap justify-center gap-10">
        {recipeList && recipeList.length > 0 ? (
          recipeList.map((item) => <RecipeItem item={item} />)
        ) : (
          <div>
            <p className="lg:tex-4xl text-xl text-center text-black font-extrabold">
              Nothing To Show, Searh For Recipe Items
            </p>
          </div>
        )}
      </div>
    </>
  );
}
