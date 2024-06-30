import View from './View.js';
import icons from 'url:../../img/icons.svg'; // Parcel 2

class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _message = 'Recipe was successfully uploaded :)';
  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');

  constructor() {
    super(); // after super, the this keyword is available
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }
  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }
  // this in haddler function, attach event handler to the btnOpen, not overlay and window
  _addHandlerShowWindow(handler) {
    this._btnOpen.addEventListener(
      'click',
      // this._overlay.classList.toggle('hidden');
      // this._window.classList.toggle('hidden');
      this.toggleWindow.bind(this) // bind this keyword to the toggleWindow method
    );
  }
  _addHandlerHideWindow(handler) {
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  }
  addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      // console.log(this); // form
      // console.log(new FormData(this)); // FormData {}
      const dataArr = [...new FormData(this)]; // convert FormData to array
      const data = Object.fromEntries(dataArr); // fromEnries is opposite method of entries method, convert array to object
      handler(data); // handler is controlAddRecipe from controller.js
    });
  }
  _generateMarkup() {}
}

export default new AddRecipeView();
