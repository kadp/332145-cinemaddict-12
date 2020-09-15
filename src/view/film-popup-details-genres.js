import AbstractView from "./abstract.js";

const createPopupFilmDetailsGenres = (value) => {

  return (
    `<span class="film-details__genre">${value}</span>`
  );
};

export default class FilmPopupDetailsGenres extends AbstractView {
  constructor(value) {
    super();
    this._value = value;
  }

  getTemplate() {
    return createPopupFilmDetailsGenres(this._value);
  }
}
