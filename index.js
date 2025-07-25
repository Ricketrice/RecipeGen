const randomFoodImage = document.getElementById("randomImage");

async function getFoodImage() {
    const response = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
    const foodImageData = await response.json();
    console.log(foodImageData);
    randomFoodImage.src = foodImageData.meals[0].strMealThumb;
}

getFoodImage();

