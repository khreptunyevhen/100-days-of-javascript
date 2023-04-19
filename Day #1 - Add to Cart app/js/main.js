import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL: "https://playground-5cb5e-default-rtdb.firebaseio.com/",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDb = ref(database, "shoppingList");

const addButtonEl = document.querySelector("#add-button");
const inputFieldEl = document.querySelector("#input-field");
const shoppingList = document.querySelector("#shopping-list");

onValue(shoppingListInDb, function (snapshot) {
  if (snapshot.exists()) {
    let productArray = Object.entries(snapshot.val());

    clearElement(shoppingList);

    for (const [currentItemID, currentValue] of productArray) {
      appendItemToShoppingList(shoppingList, currentValue, currentItemID);
    }
  } else {
    shoppingList.innerHTML = "No items here... yet";
  }
});

addButtonEl.addEventListener("click", function () {
  let inputValue = inputFieldEl.value;

  if (inputValue) {
    push(
      shoppingListInDb,
      inputValue[0].toUpperCase() + inputValue.slice(1).toLowerCase()
    );
    console.log(shoppingListInDb);
    clearInputFieldEl(inputFieldEl);
  }
});

function clearInputFieldEl(input) {
  input.value = "";
}

function clearElement(el) {
  el.innerHTML = "";
}

function appendItemToShoppingList(list, itemValue, itemID) {
  let newEl = document.createElement("li");

  newEl.textContent = itemValue;
  list.append(newEl);

  newEl.addEventListener("dblclick", function () {
    let currentLocation = ref(database, `shoppingList/${itemID}`);

    remove(currentLocation);
  });
}
