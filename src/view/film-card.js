import AbstractView from "./abstract.js";

const createFilmCardTemplate = (filmCards) => {
  const {filmName, poster, description, rating, year, genre, duration, commentsCount} = filmCards;

  return (
    `<article class="film-card">
      <h3 class="film-card__title">${filmName}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${year}</span>
        <span class="film-card__duration">${duration}</span>
        <span class="film-card__genre">${genre}</span>
      </p>
      <img src="./images/posters/${poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${description}</p>
      <a class="film-card__comments"> ${commentsCount} comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist film-card__controls-item--active">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
      </form>
     </article>`
  );
};

export default class FilmCard extends AbstractView {
  constructor(filmCards) {
    super();
    this._filmCards = filmCards;
    this._setTitleClickHandler = this._setTitleClickHandler.bind(this);
    this._setPosterClickHandler = this._setPosterClickHandler.bind(this);
    this._setCommentsCardClickHandler = this._setCommentsCardClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._historyClickHandler = this._historyClickHandler.bind(this);
    this._watchListClickHandler = this._watchListClickHandler.bind(this);
  }

  getTemplate() {
    return createFilmCardTemplate(this._filmCards);
  }

  _setTitleClickHandler(evt) {
    evt.preventDefault();
    this._callback.titleClick();
  }

  setTitleClickHandler(callback) {
    this._callback.titleClick = callback;
    this.getElement().querySelector(`.film-card__title`).addEventListener(`click`, this._setTitleClickHandler);
  }

  _setPosterClickHandler(evt) {
    evt.preventDefault();
    this._callback.posterClick();
  }

  setPosterClickHandler(callback) {
    this._callback.posterClick = callback;
    this.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, this._setPosterClickHandler);
  }

  _setCommentsCardClickHandler(evt) {
    evt.preventDefault();
    this._callback.commentsClick();
  }

  setCommentsCardClickHandler(callback) {
    this._callback.commentsClick = callback;
    this.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, this._setCommentsCardClickHandler);
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector(`.film-card__controls-item--favorite`).addEventListener(`click`, this._favoriteClickHandler);
  }

  _historyClickHandler(evt) {
    evt.preventDefault();
    this._callback.historyClick();
  }

  setHistoryClickHandler(callback) {
    this._callback.historyClick = callback;
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`).addEventListener(`click`, this._historyClickHandler);
  }


  _watchListClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchListClick();
  }

  setWatchListClickHandler(callback) {
    this._callback.watchListClick = callback;
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`).addEventListener(`click`, this._watchListClickHandler);
  }

}
