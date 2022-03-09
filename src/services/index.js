// const filterURL = (option) => {
//   switch (option) {
//   case 'ingredient':
//     return 'ingredient';
//   case 'name':
//     return 'name';
//   case 'first-letter':
//     return 'first-letter';
//   default:
//     return null;
//   }
// };

// const URL = (type, searchInput) => (
//   `https://www.the${type}db.com/api/json/v1/1/filter.php?i=${searchInput}`
// );

export const fetchRecipe = (type) => (
  fetch(`https://www.the${type}db.com/api/json/v1/1/search.php?s=`)
    .then((response) => response.json())
    .then((recipes) => recipes)
);

export const b = () => (
  null
);

export const c = () => (
  null
);
