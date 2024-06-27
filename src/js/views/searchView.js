// this class is not going to render anything, all I want is to get the query and eventually to listen the click event
class SearchView {
  #parentElement = document.querySelector('.search');
  getQuery() {
    const query = this.#parentElement.querySelector('.search__field').value;
    this.#clearInput();
    return query;
  }
  #clearInput() {
    this.#parentElement.querySelector('.search__field').value = '';
  }
  addHandlerSearch(handler) {
    this.#parentElement.addEventListener('submit', function (e) {
      e.preventDefault(); // when we submit the form, the page will reload, so we need to prevent that
      handler();
    });
  }
}
export default new SearchView();
