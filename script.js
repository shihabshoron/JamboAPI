const search = document.getElementById('search');
const submit = document.getElementById('submit');
const mealsList = document.getElementById('search-result');
const meal = document.getElementsByClassName('meal-item');
const btn = document.getElementsByClassName('recipe-btn');
const detailsEl = document.getElementById('mealDetails');



function searchMeal(e){
    e.preventDefault();

   const term = search.value;

   if(term.trim()){
       fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${term}`)
       .then(res => res.json())
       .then(data => {
        let html = "";
        data.meals.forEach(meal => {
           html += `
           <div class="meal-item" data-id = "${meal.idMeal}">
                <div class="meal-img">
                    <img src="${meal.strMealThumb}" alt="">
                </div>
                <div class="meal-name">
                    <h3>${meal.strMeal}</h3>
                    <button onclick="displayRecipe('${meal.idMeal}')"class = recipe-btn>Get Recipe</button>
                </div>
            
            </div>
           
           `;

        });
        mealsList.innerHTML = html;
        
       });
   }else{
       alert("Please Write Your Meal");
   }
   
   
}

const displayRecipe = meals =>{
    // const recipeDetail = document.getElementsByClassName('recipe-btn');
    // recipeDetail.style.display = "block";
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meals}`
    fetch(url)
    .then(res => res.json())
    .then(data => {
        console.log(data);
        const meal = data.meals[0];
        addMealToDOM(meal);
    });


}
function addMealToDOM(meal){
    const ingredient = [];
    for (let i = 1; i <= 20; i++) {
       if(meal[`strIngredient${i}`]){
        ingredient.push(`
        ${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}
        `);
       }else{
           break;
       }      
    }

    detailsEl.innerHTML = `
         <div class="single-meal">
            <h1>${meal.strMeal}</h1>
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
            <div class="single-meal-info">
                ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}
                ${meal.strArea ? `<p>${meal.strArea}</p>` : ''}
            </div>
            <div class="main">
                <p>${meal.strInstructions}</p>
                <h2>Ingredients</h2>
                <ul>
                ${ingredient.map(ing => `<li>${ing}</li>`).join('')}
                </ul>
            </div>
         </div>
    
    `


}
// const displayInfo = meals => {
//     console.log(meals);
//     const mealsInfo = document.getElementById('mealDetails');
//     mealsInfo.innerHTML = `
//     <h1>${meals.strArea}</h1>
//     <p>${meals.strInstructions}
//     <img src = "${meals.strMealThumb}"`
// }







submit.addEventListener('submit',searchMeal);
