const FoodImage = document.getElementById("randomImage");
const foodTitle = document.querySelector(".foodTitle");
const ingredientList = document.querySelector(".ingredientList");

const showIngredientList = document.querySelector(".ingredient");
const showIngButton = document.querySelector(".showIng");

const iframe = document.querySelector("iframe");

const instructionDetails = document.querySelector(".instructionDetails");

const instructionBlog = document.querySelector(".instruction");
const showIntButton = document.querySelector(".showInt");

const generateInfo = document.querySelector(".generaterButton");

let arrayOfIngredient = [];
async function getFoodImage() {
  const response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/random.php"
  );
  const foodData = await response.json();
  console.log(foodData);
  FoodImage.src = foodData.meals[0].strMealThumb;
  foodTitle.textContent = foodData.meals[0].strMeal;
  let unsupportURL = foodData.meals[0].strYoutube;
  let supportURl = unsupportURL.replace("watch?v=", "embed/"); //Iframe doesnt support watch?v=
  iframe.src = supportURl;
  instructionDetails.textContent = foodData.meals[0].strInstructions;

  for (let i = 1; i < 20; i++) {
    /*
        let ingredientInfo = foodData.meals[0][`strIngredient${i}`];
        let ingredientMeasurment = foodData.meals[0][`strMeasure${i}`];*/
    if (
      (foodData.meals[0][`strIngredient${i}`] &&
        foodData.meals[0][`strMeasure${i}`] != null) ||
      (foodData.meals[0][`strIngredient1${i}`] &&
        foodData.meals[0][`strMeasure${i}`] != " ") ||
      (foodData.meals[0][`strIngredient${i}`] &&
        foodData.meals[0][`strMeasure${i}`] != "")
    ) {
      const list = document.createElement("li");
      list.textContent =
        foodData.meals[0][`strIngredient${i}`] +
        " " +
        foodData.meals[0][`strMeasure${i}`];
        arrayOfIngredient.push(foodData.meals[0][`strIngredient${i}`] + " " + foodData.meals[0][`strMeasure${i}`])
        
      ingredientList.append(list);
    }
  }
}

let count = 0;
showIngButton.addEventListener("click", (event) => {
  iframe.style.visibility = "visible";
  event.preventDefault();
  showIngredientList.style.display = "block";
  count++;
  if (count > 1) {
    count = 0;
    showIngredientList.style.display = "none";
  }
});

let otherCount = 0;
showIntButton.addEventListener("click", (event) => {
  event.preventDefault();
  instructionBlog.style.display = "block";
  otherCount++;
  if (otherCount > 1) {
    otherCount = 0;
    instructionBlog.style.display = "none";
  }
});

generateInfo.addEventListener("click", (event) => {
  event.preventDefault();
  getFoodImage();
});

/*
Log the return value of the data to get the data that you want. 
*/

//Toggle by search
let searchValue = document.getElementById("searchBar");
let searchList = document.querySelector(".resultList");
let shownResult = document.querySelector(".shownResults");

async function searchByText() {
  let value = searchValue.value;
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`
  );
  const foodData = await response.json();
  console.log(foodData);
  console.log(value);
  let checkMeal = foodData.meals;
  if (checkMeal != null) {
    for (let i = 0; i < foodData.meals.length; i++) {
      const listMealName = document.createElement("li");
      listMealName.textContent = checkMeal[i].strMeal;
      searchList.append(listMealName);

      listMealName.addEventListener("click", () => {
        shownResult.style.display = "none";
        FoodImage.src = foodData.meals[i].strMealThumb;
        foodTitle.textContent = foodData.meals[i].strMeal;

        let unsupportURL = foodData.meals[0].strYoutube;
        let supportURl = unsupportURL.replace("watch?v=", "embed/"); //Iframe doesnt support watch?v=
        iframe.src = supportURl;
        instructionDetails.textContent = foodData.meals[0].strInstructions;

        for (let j = 1; j < 20; j++) {
          let ingredientInfo = foodData.meals[0][`strIngredient${j}`];
          let ingredientMeasurment = foodData.meals[0][`strMeasure${j}`];
          if (
            (foodData.meals[0][`strIngredient${j}`] &&
              foodData.meals[0][`strMeasure${j}`] != null) ||
            (foodData.meals[0][`strIngredient1${j}`] &&
              foodData.meals[0][`strMeasure${j}`] != " ") ||
            (foodData.meals[0][`strIngredient${j}`] &&
              foodData.meals[0][`strMeasure${j}`] != "")
          ) {
            const list = document.createElement("li");
            list.textContent =
              foodData.meals[0][`strIngredient${j}`] +
              " " +
              foodData.meals[0][`strMeasure${j}`];
            arrayOfIngredient.push(foodData.meals[0][`strIngredient${i}`] + " " + foodData.meals[0][`strMeasure${i}`]);

            ingredientList.append(list);
            console.log(arrayOfIngredient[0]);
          }
        }
      });
    }
  } else {
    const listMealName = document.createElement("li");
    listMealName.textContent = "No meal found";
    searchList.append(listMealName);
  }
}

searchByText();

searchValue.addEventListener("input", () => {
  searchList.innerHTML = "";
  iframe.style.visibility = "visible";
  if (searchValue.value !== "") {
    shownResult.style.display = "block";
  } else {
    shownResult.style.display = "none";
  }
  searchByText();
});

/*
    searchValue.addEventListener("input", (event) => {
    searchByText();
    if (event.key == "Enter") {
        event.preventDefault();
        FoodImage.src = foodData.meals[0].strMealThumb;
        foodTitle.textContent = foodData.meals[0].strMeal;
        let unsupportURL = foodData.meals[0].strYoutube;
        let supportURl = unsupportURL.replace("watch?v=",  "embed/");//Iframe doesnt support watch?v=
        iframe.src = supportURl;
        instructionDetails.textContent = foodData.meals[0].strInstructions;

        
        for (let i = 1;i<20; i++) {
            
            let ingredientInfo = foodData.meals[0][`strIngredient${i}`];
            let ingredientMeasurment = foodData.meals[0][`strMeasure${i}`];
            if (foodData.meals[0][`strIngredient${i}`] && foodData.meals[0][`strMeasure${i}`] != null || foodData.meals[0][`strIngredient1${i}`] && foodData.meals[0][`strMeasure${i}`]!= " " || foodData.meals[0][`strIngredient${i}`] && foodData.meals[0][`strMeasure${i}`] != "") {
                const list = document.createElement("li");
                list.textContent = foodData.meals[0][`strIngredient${i}`] + " " + foodData.meals[0][`strMeasure${i}`];
                ingredientList.append(list);
            }
        }
    }
})

*/
//Save recipe

let savedMeal = {};
let foodID = 1;
let saveDiv = document.querySelector(".savedInfo");
function saveFood() {
    var imgDelete= document.createElement("img");
    imgDelete.src = "./images/delete.svg";
    imgDelete.style.width = "15px";
    imgDelete.style.height = "15px";
    if (foodTitle.textContent === "" || foodTitle.textContent === " ") {
        return;
    } else {
        for (let id in savedMeal) {
            if (savedMeal[id].title == foodTitle.textContent) {
                return;
            }
        }
    }

    savedMeal[foodID] = {
        title: foodTitle.textContent,
        Image: FoodImage.src,
        iframeURL: iframe.src,
        intDetails: instructionDetails.textContent,
        intList: arrayOfIngredient, 
    }

    console.log(savedMeal[foodID].intList);
    foodID++;
    const recipeSavedList = document.createElement("li");
    const savedRecipeMainContainer = document.getElementById("savedRecipeMainContainer");
    recipeSavedList.textContent = foodTitle.textContent;
    recipeSavedList.append(imgDelete);
    savedRecipeMainContainer.append(recipeSavedList);
}

savedRecipeMainContainer.addEventListener("click", (event) => {
    console.log(event.target.textContent);
    for (let id in savedMeal) {
        if (event.target.textContent == savedMeal[id].title) {
            FoodImage.src = savedMeal[id].Image;
            foodTitle.textContent = savedMeal[id].title;
            let unsupportURL = savedMeal[id].iframeURL;
            let supportURl = unsupportURL.replace("watch?v=",  "embed/");//Iframe doesnt support watch?v=
            iframe.src = supportURl;
            instructionDetails.textContent = savedMeal[id].intDetails;
            ingredientList.innerHTML = ""
            for (let i = 0; i<savedMeal[id].intList.length; i++) {
                const list = document.createElement("li");
                list.textContent = savedMeal[id].intList[i];
                ingredientList.append(list);
                console.log(savedMeal[id].intList);
            }
        }
    }

    if (event.target.tagName == "IMG") {
        let getTitle = event.target.parentElement.textContent;
        for (let id in savedMeal) {
            if (getTitle == savedMeal[id].title) {
                delete savedMeal[id];
                event.target.parentElement.remove()
            }
        }
    }
    
})


