import 'core-js/stable';
import 'regenerator-runtime/runtime';

import * as model from './model.js';

import { async } from 'regenerator-runtime';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';

//core-js is for polyfilling modern JS features
// regnerator-runtime is for polyfilling async/await

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();
    // 1. Loading recipe
    await model.loadRecipe(id);
    console.log(model.state.search.results);
    // 2. Rendering recipe
    // twp options: 1 recipeView.render(model.stat.recipe); 2 const recipeView = new RecipeView(model.stat.recipe);
    recipeView.render(model.state.recipe);
  } catch (err) {
    // from model.js load recipe function, then renderError function from recipeView.js
    recipeView.renderError();
  }
};
const controlSearchResults = async function () {
  try {
    // 1. Get search query
    const query = searchView.getQuery();
    if (!query) return;
    // 2. Load search results
    await model.loadSearchResults(query);
    // 3. Render results
    console.log(model.state.search.results);
  } catch (err) {
    console.log(err);
  }
};
// window.addEventListener('hashchange', controlRecipes);
const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
};
init();
