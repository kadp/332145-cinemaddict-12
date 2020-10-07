import SmartView from "./smart.js";

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

export default class FilmCard extends SmartView {
  constructor(filmCards) {
    super();
    this._data = filmCards;
    this._setTitleClickHandler = this._setTitleClickHandler.bind(this);
    this._setPosterClickHandler = this._setPosterClickHandler.bind(this);
    this._setCommentsCardClickHandler = this._setCommentsCardClickHandler.bind(this);

    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._historyClickHandler = this._historyClickHandler.bind(this);
    this._watchListClickHandler = this._watchListClickHandler.bind(this);

    this._setInnerHandlers();
  }

  restoreHandlers() {
    this._setInnerHandlers();
  }

  _setInnerHandlers() {
    this.getElement()
      .querySelector(`.film-card__controls-item--add-to-watchlist`)
      .addEventListener(`click`, this._watchListClickHandler);
    this.getElement()
      .querySelector(`.film-card__controls-item--mark-as-watched`)
      .addEventListener(`click`, this._historyClickHandler);
    this.getElement()
      .querySelector(`.film-card__controls-item--favorite`)
      .addEventListener(`click`, this._favoriteClickHandler);
    this.getElement()
      .querySelector(`.film-card__comments`)
      .addEventListener(`click`, this._setCommentsCardClickHandler);
    this.getElement()
      .querySelector(`.film-card__poster`)
      .addEventListener(`click`, this._setPosterClickHandler);
    this.getElement()
      .querySelector(`.film-card__title`)
      .addEventListener(`click`, this._setTitleClickHandler);
  }

  getTemplate() {
    return createFilmCardTemplate(this._data);
  }

  _setTitleClickHandler(evt) {
    evt.preventDefault();
    this._callback.titleClick();
  }

  setTitleClickHandler(callback) {
    this._callback.titleClick = callback;
  }

  _setPosterClickHandler(evt) {
    evt.preventDefault();
    this._callback.posterClick();
  }

  setPosterClickHandler(callback) {
    this._callback.posterClick = callback;
  }

  _setCommentsCardClickHandler(evt) {
    evt.preventDefault();
    this._callback.commentsClick();
  }

  setCommentsCardClickHandler(callback) {
    this._callback.commentsClick = callback;
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this.updateData({isFavorite: !this._data.isFavorite});
  }

  _historyClickHandler(evt) {
    evt.preventDefault();
    this.updateData({isArchive: !this._data.isArchive});
  }

  _watchListClickHandler(evt) {
    evt.preventDefault();
    this.updateData({isWatch: !this._data.isWatch});
  }

}
