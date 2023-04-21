const recipeInput = document.querySelector("#recipe-input");
const searchBtn = document.querySelector("#search");
const recipeContainer = document.querySelector("#recipe-container");

const URL = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

searchBtn.addEventListener("click", searchRecipe);

function searchRecipe() {
  const inputValue = recipeInput.value.trim();

  if (!inputValue) {
    recipeContainer.innerHTML =
      "<h3 class='attention'>You should enter the dish!</h3>";
    return;
  }

  fetch(URL + inputValue)
    .then((response) => response.json())
    .then((data) => {
      if (!data.meals) {
        recipeContainer.innerHTML =
          "<h3 class='attention'>Sorry, we don't have this dish. Try again!</h3>";
        return;
      }

      const meal = data.meals[0];

      const recipeHtml = `
        <div class="recipe-info">
          <h2 class="recipe-title">${meal.strMeal}</h2>
          <h4 class="recipe-area">
            ${meal.strArea}
            <span class="material-symbols-outlined">
              schedule
            </span>
            <span>
            ${getPrepareTime(getItem)}</span>
          </h4>
        </div>
        <img src=${meal.strMealThumb}>
        <div class="recipe-buttons">
          <button class="hide active">Ingredients<button>
          <button class="show">Instruction</button></div>
        <div class="recipe-ingredients">
          <h4 class="ingredients-title">Ingredients:</h4>
          <ul class="ingredients-list">${buildIngredients(getItem)}</ul>
        </div>
      `;
      const instructionHtml = `
        <div class="recipe-instruction">
          <p>${meal.strInstructions}</p>
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

      function getPrepareTime(getIngredients) {
        const ingredients = getIngredients(meal, "strIngredient");
        let time = 0;
        if (getIngredients.length > 0) {
          for (const ingredient of ingredients) {
            time += 5;
          }
        }

        if (time === 60) {
          return `0:${time}`;
        }

        if (time > 60) {
          let hours = Math.trunc(time / 60);
          let minutes = time % 60;
          if (minutes < 60) {
            minutes = `0${minutes}`;
          }
          return `${hours}:${minutes}`;
        }

        return `0:${time}`;
      }

      const showBtn = document.querySelector(".show");
      showBtn.addEventListener("click", showInstruction);

      const hideBtn = document.querySelector(".hide");
      hideBtn.addEventListener("click", hideInstruction);
    })
    .catch(() => {
      recipeContainer.innerHTML = `<h3 class='attention'>Sorry, the server doesn't available now. Try late!</h3>`;
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

function showInstruction(event) {
  const recipeInstruction = document.querySelector(".recipe-instruction");
  const recipeIngredients = document.querySelector(".recipe-ingredients");

  recipeInstruction.style.display = "block";
  recipeIngredients.style.display = "none";
}

function hideInstruction(event) {
  const recipeInstruction = document.querySelector(".recipe-instruction");
  const recipeIngredients = document.querySelector(".recipe-ingredients");

  recipeInstruction.style.display = "none";
  recipeIngredients.style.display = "block";
}
