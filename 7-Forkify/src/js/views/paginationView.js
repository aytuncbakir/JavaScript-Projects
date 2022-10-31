import View from './View.js';
import icons from 'url:../../img/icons.svg'; // PArcel 2

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const currentPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    console.log(numPages);
    // There are 4 placement choices for buttons
    // Page 1, and there are other pages (start )
    if (currentPage === 1 && numPages > 1) {
      return (
        this._generateTotalPageMarkup('btn--center', numPages) +
        this._generateButtonMarkup('btn--next', currentPage + 1, 'right')
      );
    }
    // Other page (between)
    if (currentPage < numPages) {
      return (
        this._generateButtonMarkup('btn--prev', currentPage - 1, 'left') +
        this._generateTotalPageMarkup('btn--center', numPages) +
        this._generateButtonMarkup('btn--next', currentPage + 1, 'right')
      );
    }
    // Last page (end)
    if (currentPage === numPages && numPages > 1) {
      return (
        this._generateButtonMarkup('btn--prev', currentPage - 1, 'left') +
        this._generateTotalPageMarkup('btn--center', numPages)
      );
    }

    // Page 1, and there are NO other pages (only 1 page)
    return '';
  }

  _generateButtonMarkup(btn, goToPage, rightOrLeftArrow) {
    return `
        <button data-goto="${goToPage}" class="btn--inline pagination__${btn}">
            <span>Page ${goToPage}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-${rightOrLeftArrow}"></use>
            </svg>
          </button>
      `;
  }

  _generateTotalPageMarkup(btn, numPages) {
    return `
        <button data-goto="${numPages}" class="btn--inline pagination__${btn}">
            <span> ${numPages} pages</span>
          </button>
      `;
  }
}
export default new PaginationView();
