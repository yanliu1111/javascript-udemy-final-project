// this class is not going to render anything, all I want is to get the query and eventually to listen the click event
class SearchView {
  _parentElement = document.querySelector('.search');
  getQuery() {
    const query = this._parentElement.querySelector('.search__field').value;
    this._clearInput();
    return query;
  }
  _clearInput() {
    this._parentElement.querySelector('.search__field').value = '';
  }
  addHandlerSearch(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault(); // when we submit the form, the page will reload, so we need to prevent that
      handler();
    });
  }
}
export default new SearchView();
