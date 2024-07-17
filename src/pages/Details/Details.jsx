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
      <div className="container mx-auto">
        <h1 className="text-center my-4 text-black font-bold">
          Food Recipe Details
        </h1>
        <div className="lg:flex lg:flex-col-2 justify-center items-center gap-20 bg-orange-100 shadow-orange-300 p-6 rounded-md">
          <div>
            <div className="h-80 overflow-hidden rounded-xl group lg:w-80">
              <img
                src={recipeDetailsData?.recipe?.image_url}
                alt=""
                className="w-full object-cover h-full block group-hover:scale-105 duration-300"
              />
            </div>
            <div className="my-4 text-center">
              <span className="text-sm text-cyan-700 font-medium">
                {recipeDetailsData?.recipe?.publisher}
              </span>
              <h2 className="font-bold text-2xl truncate text-black">
                {recipeDetailsData?.recipe?.title}
              </h2>
            </div>
          </div>
          <div className="text-center">
            <button
              onClick={() => handleAddToFavorite(recipeDetailsData?.recipe)}
              className="p-3 px-8 rounded-lg  text-sm uppercase font-bold tracking-wider shadow-md bg-red-300 text-white"
            >
              {favoritesList &&
              favoritesList.length &&
              favoritesList.findIndex(
                (item) => item.id === recipeDetailsData?.recipe?.id
              ) !== -1 ? (
                <span className="">
                  Remove From Favorites
                  <i className="fa fa-heart text-red-600 ml-3 text-xl"></i>
                </span>
              ) : (
                <span>
                  Add To Favorites
                  <i className="fa fa-heart ml-3"></i>
                </span>
              )}
            </button>
            <div>
              <h2 className="text-3xl my-4 font-semibold text-black">
                Ingredients:
              </h2>
              <ul className="flex flex-col gap-3">
                {recipeDetailsData?.recipe?.ingredients.map(
                  (ingredient, index) => (
                    <li key={index}>
                      <span className="font-semibold text-black">
                        {ingredient.quantity} {ingredient.unit}
                      </span>
                      <span className="font-semibold text-black">
                        {ingredient.description}
                      </span>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
