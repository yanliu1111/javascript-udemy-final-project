import View from './View.js';
import icons from 'url:../../img/icons.svg'; // Parcel 2
import previewView from './previewView.js';

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipes found for your query. Please try again!';
  _message = '';
  _generateMarkup() {
    // console.log(this._data); // model.state.search.results
    return this._data.map(this._generateMarkupPreview).join('');
  }
  _generateMarkup() {
    // console.log(this._data); // model.state.search.results
    return this._data.map(result => previewView.render(result, false)).join('');
  }
}

export default new ResultsView();
