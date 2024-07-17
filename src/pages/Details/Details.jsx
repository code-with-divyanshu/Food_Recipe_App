import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GlobalContext } from "../../context";
import { data } from "autoprefixer";

export default function Details() {
  const { id } = useParams();
  const {
    recipeDetailsData,
    setRecipeDetailsData,
    handleAddToFavorite,
    favoritesList,
  } = useContext(GlobalContext);

  useEffect(() => {
    async function getRecipeDetails() {
      const res = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
      );
      const data = await res.json();

      console.log(data);
      if (data?.data) {
        setRecipeDetailsData(data?.data);
      }
    }

    getRecipeDetails();
  }, []);

  return (
    <>
      <div className="container mx-auto py-10 grid grid-cols-1 lg:grid-cols-2 gap-10 justify-center items-center">
        <div className="card">
          <div className="h-96 overflow-hidden rounded-xl group">
            <img
              src={recipeDetailsData?.recipe?.image_url}
              alt=""
              className="w-full object-cover h-full block group-hover:scale-105 duration-300"
            />
          </div>
          <div className="flex flex-row gap-10 justify-center items-center mt-3">
            <div>
              <span className="text-sm text-cyan-700 font-medium">
                {recipeDetailsData?.recipe?.publisher}
              </span>
              <h2 className="font-bold text-2xl truncate text-black">
                {recipeDetailsData?.recipe?.title}
              </h2>
            </div>
            <button
              onClick={() => handleAddToFavorite(recipeDetailsData?.recipe)}
              className="p-3 px-8 rounded-lg  text-sm uppercase font-medium tracking-wider mt-3 inline-block shadow-md bg-red-200 text-white"
            >
              {favoritesList &&
              favoritesList.length &&
              favoritesList.findIndex(
                (item) => item.id === recipeDetailsData?.recipe?.id
              ) !== -1 ? (
                <i className="fa fa-heart text-red-600 text-2xl"></i>
              ) : (
                <i className="fa fa-heart"></i>
              )}
            </button>
          </div>
        </div>
        <div className="text-center">
          <h2 className="text-3xl my-4 font-semibold text-black">
            Ingredients:
          </h2>
          <ul className="flex flex-col gap-3 justify-center items-center">
            {recipeDetailsData?.recipe?.ingredients.map((ingredient, index) => (
              <li key={index}>
                <span className="font-semibold text-black">
                  {ingredient.quantity} {ingredient.unit}
                </span>
                <span> - </span>
                <span className="font-semibold text-black">
                  {ingredient.description}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
