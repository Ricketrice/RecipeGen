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

async function getFoodImage() {
    const response = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
    const foodData = await response.json();
    console.log(foodData);
    FoodImage.src = foodData.meals[0].strMealThumb;
    foodTitle.textContent = foodData.meals[0].strMeal;
    let unsupportURL = foodData.meals[0].strYoutube;
    let supportURl = unsupportURL.replace("watch?v=",  "embed/");//Iframe doesnt support watch?v=
    iframe.src = supportURl;
    instructionDetails.textContent = foodData.meals[0].strInstructions;


    for (let i = 1;i<20; i++) {
        /*
        let ingredientInfo = foodData.meals[0][`strIngredient${i}`];
        let ingredientMeasurment = foodData.meals[0][`strMeasure${i}`];*/
        if (foodData.meals[0][`strIngredient${i}`] && foodData.meals[0][`strMeasure${i}`] != null || foodData.meals[0][`strIngredient1${i}`] && foodData.meals[0][`strMeasure${i}`]!= " " || foodData.meals[0][`strIngredient${i}`] && foodData.meals[0][`strMeasure${i}`] != "") {
            const list = document.createElement("li");
            list.textContent = foodData.meals[0][`strIngredient${i}`] + " " + foodData.meals[0][`strMeasure${i}`];
            ingredientList.append(list);
        }
    }

}

let count = 0;
showIngButton.addEventListener("click", (event) => {
    event.preventDefault();
    showIngredientList.style.display = "block";
    count++;
    if (count > 1) {
        count = 0;
        showIngredientList.style.display = "none";
    }
})


let otherCount = 0; 
showIntButton.addEventListener("click", (event) => {
    event.preventDefault();
    instructionBlog.style.display = "block";
    otherCount++;
    if (otherCount > 1) {
        otherCount = 0;
        instructionBlog.style.display = "none";
    }
})


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
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`);
    const foodData = await response.json();
    console.log(foodData);
    console.log(value);
    let checkMeal = foodData.meals;
    if (checkMeal != null) {
        for (let i = 0; i<foodData.meals.length; i++) {
            const listMealName = document.createElement("li");
            listMealName.textContent = checkMeal[i].strMeal;
            searchList.append(listMealName);
        }
    } else {
        const listMealName = document.createElement("li");
        listMealName.textContent = "No meal found";
        searchList.append(listMealName);
    }


}

searchByText();


searchValue.addEventListener("input",() => {
    searchList.innerHTML = "";
    if (searchValue.value !== "") {
        shownResult.style.display = "block";
    } else {
        shownResult.style.display = "none";
    }
    searchByText();
    
    
})

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