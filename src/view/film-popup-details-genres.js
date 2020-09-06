import {createElement} from "../utils.js";

const createPopupFilmDetailsGenres = (value) => {

  return (
    `<span class="film-details__genre">${value}</span>`
  );
};

export default class FilmPopupDetailsGenres {
  constructor(value) {
    this._value = value;
    this._element = null;
  }

  getTemplate() {
    return createPopupFilmDetailsGenres(this._value);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
