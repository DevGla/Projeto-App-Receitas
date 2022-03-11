export const fetchRecipe = (type) => (
  fetch(`https://www.the${type}db.com/api/json/v1/1/search.php?s=`)
    .then((response) => response.json())
    .then((recipes) => recipes)
);

export const fetchRecipeCategories = (type) => (
  fetch(`https://www.the${type}db.com/api/json/v1/1/list.php?c=list`)
    .then((response) => response.json())
    .then((categories) => categories)
);

export const fetchFilterByCategories = (type, category) => (
  fetch(`https://www.the${type}db.com/api/json/v1/1/filter.php?c=${category}`)
    .then((response) => response.json())
    .then((categories) => categories)
    .catch((error) => error)
);

export const fetchingId = async (string, func) => {
  try {
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${string}`);
    const result = await data.json();
    func(result.meals[0]);
  } catch (error) {
    console.error(error);
  }
};

export const fetchingDrinkId = async (string, func) => {
  try {
    const data = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${string}`);
    const result = await data.json();
    func(result.drinks[0]);
  } catch (error) {
    console.error(error);
  }
};

export const fetchingRecomendation = async (func) => {
  try {
    const data = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const result = await data.json();
    func(result.drinks);
  } catch (error) {
    console.error(error);
  }
};

export const fetchingDrinkRecomendation = async (func) => {
  try {
    const data = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const result = await data.json();
    func(result.meals);
  } catch (error) {
    console.error(error);
  }
};
export const fetchRecipeByIngredient = (type, ingredient) => (
  fetch(`https://www.the${type}db.com/api/json/v1/1/filter.php?i=${ingredient}`)
    .then((response) => response.json())
    .then((recipes) => recipes)
    .catch((error) => error)
);

export const fetchIngredients = (type) => (
  fetch(`https://www.the${type}db.com/api/json/v1/1/list.php?i=list`)
    .then((response) => response.json())
    .then((ingredients) => ingredients)
    .catch((error) => error)
);

export const fetchNationalities = (type) => (
  fetch(`https://www.the${type}db.com/api/json/v1/1/list.php?a=list`)
    .then((response) => response.json())
    .then((nationalities) => nationalities)
    .catch((error) => error)
);

export const fetchRecipeByNationality = (type, nationality) => (
  fetch(`https://www.the${type}db.com/api/json/v1/1/filter.php?a=${nationality}`)
    .then((response) => response.json())
    .then((recipes) => recipes)
    .catch((error) => error)
);
