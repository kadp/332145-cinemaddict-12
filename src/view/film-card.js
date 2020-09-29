import AbstractView from "./abstract.js";

const MIN_DESCRIPTION = 140;

const createFilmCardFavorite = (isFavorite) => {
  return `<button class="film-card__controls-item button film-card__controls-item--favorite ${isFavorite !== true ? `` : `film-card__controls-item--active`}">Mark as favorite</button>`;
};

const createFilmCardWatchList = (isWatch) => {
  return `<button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${isWatch !== true ? `` : `film-card__controls-item--active`}">Add to watchlist</button>`;
};

const createFilmCardarchive = (isArchive) => {
  return `<button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${isArchive !== true ? `` : `film-card__controls-item--active`}">Mark as watched</button>`;
};

const createSingleGenre = (genre) => genre[0];

const createMinDescription = (description) => {
  return `${description.length > MIN_DESCRIPTION ? description.slice(0, 140) + `...` : description}`;
};

const createFilmCardTemplate = (filmCards) => {
  const {filmName, poster, description, rating, year, genre, duration, commentsCount, isFavorite, isWatch, isArchive} = filmCards;
  const favoriteTemplate = createFilmCardFavorite(isFavorite);
  const watchListTemplate = createFilmCardWatchList(isWatch);
  const archiveTemplate = createFilmCardarchive(isArchive);
  const genreTemplate = createSingleGenre(genre);
  const mindescription = createMinDescription(description);

  return (
    `<article class="film-card">
      <h3 class="film-card__title">${filmName}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${year}</span>
        <span class="film-card__duration">${duration}</span>
        <span class="film-card__genre">${genreTemplate}</span>
      </p>
      <img src="./images/posters/${poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${mindescription}</p>
      <a class="film-card__comments"> ${commentsCount} comments</a>
      <form class="film-card__controls">
        ${watchListTemplate}
        ${archiveTemplate}
        ${favoriteTemplate}
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
