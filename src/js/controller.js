import 'core-js/stable';
import 'regenerator-runtime/runtime';

import * as model from './model.js';

import recipeView from './views/recipeView.js';

//core-js is for polyfilling modern JS features
// regnerator-runtime is for polyfilling async/await

const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();
    // 1. Loading recipe
    await model.loadRecipe(id);
    // 2. Rendering recipe
    // twp options: 1 recipeView.render(model.stat.recipe); 2 const recipeView = new RecipeView(model.stat.recipe);
    recipeView.render(model.state.recipe);
  } catch (err) {
    alert(err);
  }
};

controlRecipes();
['hashchange', 'load'].forEach(ev =>
  window.addEventListener(ev, controlRecipes)
);
// window.addEventListener('hashchange', controlRecipes);
