const getMealBtn = document.getElementById('get-meal')
const mealContainer = document.getElementById('meal')

getMealBtn.addEventListener('click', () => {
  fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    .then(res => res.json())
    .then(res => {
      createMeal(res.meals[0])
    })
})

function createMeal(meal){
  const ingredients = [] //Looping para pegar os ingredientes e tacar num array
  for(i=1; i<=20; i++){
    if(meal[`strIngredient${i}`]){
      ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`) //Ingrediente + Quantidade
    } else{
        break
    }
  }

  //Inserindo dados da API no HTML pelo id "meal"
  mealContainer.innerHTML = `
  <div class="meal-food">
    <div class="meal-info">
      <img src="${meal.strMealThumb}" alt="Meal Img" />
      <p><strong> Categoria: </strong>${meal.strCategory}</p>
      <p><strong> Area: </strong>${meal.strArea}</p>
      <p><strong> Tags: </strong>${meal.strTags.split(',').join(', ')}</p>

      <h5>Ingredientes</h5>
      <ul>
        ${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
      </ul>

    </div>
    <div class="meal-instructions">
      <h4>${meal.strMeal}</h4>
      <p>${meal.strInstructions}</p>
    </div>
  </div>
  <div class="meal-video">
    <h5>Video da Receita</h5>
    <div class="videoWrapper">
      <iframe src="http://www.youtube.com/embed/${meal.strYoutube.slice(-11)}" />
    </div>
  </div>
  `
}