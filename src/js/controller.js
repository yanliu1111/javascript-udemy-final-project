import 'core-js/stable';
import 'regenerator-runtime/runtime';

import * as model from './model.js';

import { async } from 'regenerator-runtime';
import paginationView from './views/paginationView.js';
import recipeView from './views/recipeView.js';
import resultsView from './views/resultsView.js';
import searchView from './views/searchView.js';

//core-js is for polyfilling modern JS features
// regnerator-runtime is for polyfilling async/await

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
// come from parcel
// if (module.hot) {
//   module.hot.accept();
// }
const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();
    // 0. Update results view to mark selected search result
    resultsView.update(model.getSearchResultsPage());
    // 1. Loading recipe
    await model.loadRecipe(id);
    // console.log(model.state.search.results);
    // 2. Rendering recipe
    // twp options: 1 recipeView.render(model.stat.recipe); 2 const recipeView = new RecipeView(model.stat.recipe);
    recipeView.render(model.state.recipe);
    // controlServings();
  } catch (err) {
    // from model.js load recipe function, then renderError function from recipeView.js
    recipeView.renderError();
  }
};
const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    // 1. Get search query
    const query = searchView.getQuery();
    if (!query) return;
    // 2. Load search results
    await model.loadSearchResults(query);
    // 3. Render results
    //console.log(model.state.search.results);
    // resultsView.render(model.state.search.results);
    resultsView.render(model.getSearchResultsPage(4));
    // 4. Render initial pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (goToPage) {
  // console.log('page controller');
  //5. Render new results
  // resultsView.render(model.state.search.results);
  resultsView.render(model.getSearchResultsPage(goToPage));
  // 6. Render new pagination buttons, same, because the page is changed
  paginationView.render(model.state.search);
};
// window.addEventListener('hashchange', controlRecipes);
const controlServings = function (newServings) {
  // Update the recipe servings (in state)
  model.updateServings(newServings);
  // Update the recipe view
  // recipeView.render(model.state.recipe);
  //update function in View.js
  recipeView.update(model.state.recipe);
};
const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerServings(controlServings);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};
init();
