const recipeInput = document.querySelector("#recipe-input");
const searchBtn = document.querySelector("#search");
const recipeContainer = document.querySelector("#recipe-container");

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

      const recipeHtml = `
        <div class="recipe-details">
          <h2>${meal.strMeal}</h2>
          <h4>${meal.strArea}</h4>
        </div>
        <img src=${meal.strMealThumb}>
        <div class="recipe-ingredients">
          <h2>Ingredients:</h2>
          <ul>${buildIngredients(getItem)}</ul>
          <button id="show">Show instruction<button>
        </div>
      `;
      const instructionHtml = `
        <div class="recipe-instruction">
          <p>${meal.strInstructions}</p>
          <button id="hide">Return</button>
        </div>
      `;

      recipeContainer.innerHTML = recipeHtml + instructionHtml;

      function buildIngredients(getItemArray) {
        const ingredients = getItemArray(meal, "strIngredient");
        const measure = getItemArray(meal, "strMeasure");
        let ingredientsHtml = "";

        for (let i = 0; i < ingredients.length; i++) {
          ingredientsHtml += `<li>${i + 1}. ${ingredients[i]} - ${
            measure[i]
          }.</li>`;
        }

        return (recipeContainer.innerHTML = ingredientsHtml);
      }

      const showBtn = document.querySelector("#show");
      showBtn.addEventListener("click", showInstruction);

      const hideBtn = document.querySelector("#hide");
      hideBtn.addEventListener("click", hideInstruction);
    })
    .catch(() => {
      recipeContainer.innerHTML = `<h3>Sorry, the server doesn't available now. Try late!</h3>`;
    });
}

function getItem(mealObject, itemName) {
  const getItemArray = [];
  const mealObjectLength = Object.keys(mealObject).length;

  for (let i = 0; i < mealObjectLength; i++) {
    if (mealObject[`${itemName}${i}`]) {
      getItemArray.push(mealObject[`${itemName}${i}`]);
    }
  }

  return getItemArray;
}

function showInstruction() {
  document.querySelector(".recipe-instruction").style.display = "block";
  document.querySelector(".recipe-ingredients").style.display = "none";
}

function hideInstruction() {
  document.querySelector(".recipe-instruction").style.display = "none";
  document.querySelector(".recipe-ingredients").style.display = "block";
}
