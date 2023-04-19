const recipeInput = document.querySelector("#recipe-input");
const searchBtn = document.querySelector("#search");
let recipeContainer = document.querySelector("#recipe-container");

const URL = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

searchBtn.addEventListener("click", searchRecipe);

function searchRecipe() {
  const inputValue = recipeInput.value.trim();

  if (!inputValue) {
    recipeContainer.innerHTML = "<h3>You should enter the dish!</h3>";
    return;
  }

  fetch(URL + inputValue)
    .then((response) => response.json())
    .then((data) => {
      if (!data.meals) {
        recipeContainer.innerHTML =
          "<h3>Sorry, we don't have this dish. Try again!</h3>";
        return;
      }

      const meal = data.meals[0];
      console.log(meal);

      const recipeHtml = `
      <div class="details">
        <h2>${meal.strMeal}</h2>
        <h4>${meal.strArea}</h4>
      </div>
      <img src=${meal.strMealThumb}>
      <div>
        <h2>Ingredients:</h2>
        <ul>${getIngredients(meal)}</ul>
      </div>
      `;

      recipeContainer.innerHTML = recipeHtml;
    });
}

function getIngredients(meal) {}
