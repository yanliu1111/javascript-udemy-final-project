import 'core-js/stable';
import 'regenerator-runtime/runtime';

import * as model from './model.js';

import { MODAL_CLOSE_SEC } from './config.js';
import addRecipeView from './views/addRecipeView.js';
import { async } from 'regenerator-runtime';
import bookMarksView from './views/bookMarksView.js';
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
    // 1 Update bookmarks view
    bookMarksView.update(model.state.bookmarks);

    // 2. Loading recipe
    await model.loadRecipe(id);
    // console.log(model.state.search.results);
    // 3. Rendering recipe
    // twp options: 1 recipeView.render(model.stat.recipe); 2 const recipeView = new RecipeView(model.stat.recipe);
    recipeView.render(model.state.recipe);
    // controlServings();
  } catch (err) {
    // from model.js load recipe function, then renderError function from recipeView.js
    recipeView.renderError();
    console.error(err);
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
    resultsView.render(model.getSearchResultsPage());
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

const constrolAddBookmark = function () {
  // 1) Add/remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  // model.addBookmark(model.state.recipe);
  // console.log(model.state.bookmarks);
  // 2) Update recipe view
  recipeView.update(model.state.recipe);
  // 3) Render bookmarks
  bookMarksView.render(model.state.bookmarks);
};

const constrolAddBookmarks = function () {
  bookMarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    // Show loading spinner
    addRecipeView.renderSpinner();
    // Upload the new recipe data
    await model.uploadRecipe(newRecipe);
    // console.log(model.state.recipe);
    // Render recipe
    recipeView.render(model.state.recipe);
    //success message
    addRecipeView.renderMessage();
    // Render bookmark view
    bookMarksView.render(model.state.bookmarks);
    // Change ID in URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`);
    // close form window
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    console.error('💥', err);
    addRecipeView.renderError(err.message);
  }
};
// publisher sabscribe pattern
const init = function () {
  bookMarksView.addHandlerRender(constrolAddBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerServings(controlServings);
  recipeView.addHandlerBookmark(constrolAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();
