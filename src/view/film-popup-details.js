import SmartView from "./smart.js";
import {replace, createElement, render, RenderPosition} from "../utils/render.js";
import {formatCommentDate} from "../mock/data.js";

const setNewComment = (filmCard, newComment) => {
  filmCard.comments.push(newComment);
};

const createPopupComment = (comment) => {

  return (
    `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${comment.emoji}.png" width="55" height="55" alt="emoji-smile">
      </span>
      <div>
        <p class="film-details__comment-text">${comment.text}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${comment.author}</span>
          <span class="film-details__comment-day">${formatCommentDate(comment.date)}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
     </li>`);
};

const createPopupComments = (comments) => {
  let commentsList = [];
  for (let i = 0; i < comments.length; i++) {
    commentsList.push(createPopupComment(comments[i]));
  }
  commentsList = commentsList.join(` `);
  return commentsList;
};

const createGenres = (genre) => {
  let genreList = ``;
  for (let i = 0; i < genre.length; i++) {
    genreList = genreList + `<span class="film-details__genre">` + genre[i] + `</span>`;
  }
  return genreList;
};

const createGenresCount = (count) => {
  if (count.length === 1) {
    return `Genre`;
  } else {
    return `Genres`;
  }
};

const createFavoritePopup = (isFavorite) => {
  return `
    <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${isFavorite !== true ? `` : `checked`}>
    <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
  `;
};

const createArchivePopup = (isArchive) => {
  return `
    <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${isArchive !== true ? `` : `checked`}>
    <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>
  `;
};

const createWatchListPopup = (isWatch) => {
  return `
  <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${isWatch !== true ? `` : `checked`}>
  <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>
  `;
};

const createPopupFilmDetails = (filmCard) => {
  const {filmName, poster, description, rating, year, duration, age, originalName, director, writers, actors, country, genre, commentsCount, isFavorite, isArchive, isWatch, comments} = filmCard;
  const genreTemplate = createGenres(genre);
  const favoriteTemplate = createFavoritePopup(isFavorite);
  const archiveTemplate = createArchivePopup(isArchive);
  const watchListTemplate = createWatchListPopup(isWatch);
  const genreCountTemplate = createGenresCount(genre);
  const createPopupTemplate = createPopupComments(comments);

  return (
    `<section class="film-details">
        <form class="film-details__inner" action="" method="get">
          <div class="form-details__top-container">
            <div class="film-details__close">
              <button class="film-details__close-btn" type="button">close</button>
            </div>
            <div class="film-details__info-wrap">
              <div class="film-details__poster">
                <img class="film-details__poster-img" src="./images/posters/${poster}" alt="">

                <p class="film-details__age">${age}</p>
              </div>

              <div class="film-details__info">
                <div class="film-details__info-head">
                  <div class="film-details__title-wrap">
                    <h3 class="film-details__title">${filmName}</h3>
                    <p class="film-details__title-original">Original: ${originalName}</p>
                  </div>

                  <div class="film-details__rating">
                    <p class="film-details__total-rating">${rating}</p>
                  </div>
                </div>

                <table class="film-details__table">
                  <tr class="film-details__row">
                    <td class="film-details__term">Director</td>
                    <td class="film-details__cell">${director}</td>
                  </tr>
                  <tr class="film-details__row">
                    <td class="film-details__term">Writers</td>
                    <td class="film-details__cell">${writers}</td>
                  </tr>
                  <tr class="film-details__row">
                    <td class="film-details__term">Actors</td>
                    <td class="film-details__cell">${actors}</td>
                  </tr>
                  <tr class="film-details__row">
                    <td class="film-details__term">Release Date</td>
                    <td class="film-details__cell">${year}</td>
                  </tr>
                  <tr class="film-details__row">
                    <td class="film-details__term">Runtime</td>
                    <td class="film-details__cell">${duration}</td>
                  </tr>
                  <tr class="film-details__row">
                    <td class="film-details__term">Country</td>
                    <td class="film-details__cell">${country}</td>
                  </tr>
                  <tr class="film-details__row">
                    <td class="film-details__term">${genreCountTemplate}</td>
                    <td class="film-details__cell">${genreTemplate}</td>
                  </tr>
                </table>

                <p class="film-details__film-description">
                  ${description}
                </p>
              </div>
            </div>

            <section class="film-details__controls">
              ${watchListTemplate}

              ${archiveTemplate}

              ${favoriteTemplate}
            </section>
          </div>

          <div class="form-details__bottom-container">
            <section class="film-details__comments-wrap">
              <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${commentsCount}</span></h3>

              <ul class="film-details__comments-list">${createPopupTemplate}</ul>

              <div class="film-details__new-comment">
                <div for="add-emoji" class="film-details__add-emoji-label"></div>

                <label class="film-details__comment-label">
                  <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
                </label>

                <div class="film-details__emoji-list">
                  <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
                  <label class="film-details__emoji-label" for="emoji-smile">
                    <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
                  </label>

                  <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
                  <label class="film-details__emoji-label" for="emoji-sleeping">
                    <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
                  </label>

                  <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
                  <label class="film-details__emoji-label" for="emoji-puke">
                    <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
                  </label>

                  <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
                  <label class="film-details__emoji-label" for="emoji-angry">
                    <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
                  </label>
                </div>
              </div>
            </section>
          </div>
        </form>
       </section>`
  );
};


export default class FilmPopupDetails extends SmartView {
  constructor(filmCard) {
    super();
    this._data = filmCard;
    this._setCloseClickHandler = this._setCloseClickHandler.bind(this);

    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._historyClickHandler = this._historyClickHandler.bind(this);
    this._watchListClickHandler = this._watchListClickHandler.bind(this);

    this._emojiClickHandler = this._emojiClickHandler.bind(this);

    this._enterKeyDownHandler = this._enterKeyDownHandler.bind(this);

    this._currentEmoji = null;
    this._prevEmoji = null;

    this._setInnerHandlers();
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setCloseClickHandler(this._callback.buttonClose);
  }

  _setInnerHandlers() {
    this.getElement()
      .querySelector(`.film-details__control-label--watchlist`)
      .addEventListener(`click`, this._watchListClickHandler);
    this.getElement()
      .querySelector(`.film-details__control-label--watched`)
      .addEventListener(`click`, this._historyClickHandler);
    this.getElement()
    .querySelector(`.film-details__control-label--favorite`)
    .addEventListener(`click`, this._favoriteClickHandler);
  }

  getTemplate() {
    return createPopupFilmDetails(this._data);
  }

  _setCloseClickHandler(evt) {
    evt.preventDefault();
    this._callback.buttonClose();
  }

  setCloseClickHandler(callback) {
    this._callback.buttonClose = callback;
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, this._setCloseClickHandler);
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

  _emojiClickHandler(evt) {
    evt.preventDefault();
    this._prevEmoji = this._currentEmoji;
    this._currentEmoji = createElement(`<img src="images/emoji/${evt.target.value}.png" width="55" height="55" alt="emoji-smile"></img>`);

    if (!this._prevEmoji) {
      this.getElement().querySelector(`.film-details__add-emoji-label`).appendChild(this._currentEmoji);
      return;
    }
    replace(this._currentEmoji, this._prevEmoji);
  }

  setEmojiClickHandler() {
    const emojiButtons = this.getElement().querySelectorAll(`.film-details__emoji-item`);
    emojiButtons.forEach((emojiButton) => {
      emojiButton.addEventListener(`change`, this._emojiClickHandler);
    });
  }

  _enterKeyDownHandler(evt) {
    if (evt.key === `Enter`) {
      evt.preventDefault();
      let newComment = {
        emoji: `puke`,
        text: `sss`,
        author: `RandomFromServer`,
        date: new Date(),
      };
      setNewComment(this._data, newComment);
      const placeComments = this.getElement().querySelector(`.film-details__comments-list`);

      render(placeComments, createPopupComments(this._data.comments), RenderPosition.BEFORE_END);
    }
  }
}
