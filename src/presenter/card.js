import FilmPopupDetailsView from "../view/film-popup-details.js";
import FilmCardView from "../view/film-card.js";
import {render, RenderPosition, remove, replace} from "../utils/render.js";

const siteBodyElement = document.querySelector(`body`);

export default class Card {
  constructor(cardListContainer, changeData) {
    this._cardListContainer = cardListContainer;
    this._changeData = changeData;

    this._cardComponent = null;
    this._filmPopupDetailsComponent = null;

    this._siteBodyElement = siteBodyElement;

    this._setTitleClickHandler = this._setTitleClickHandler.bind(this);
    this._setPosterClickHandler = this._setPosterClickHandler.bind(this);
    this._setCommentsCardClickHandler = this._setCommentsCardClickHandler.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(filmCard) {
    this._filmCard = filmCard;

    const prevCardComponent = this._cardComponent;
    const prevFilmPopupDetailsComponent = this._filmPopupDetailsComponent;

    this._cardComponent = new FilmCardView(filmCard);
    this._filmPopupDetailsComponent = new FilmPopupDetailsView(filmCard);

    this._cardComponent.setTitleClickHandler(this._setTitleClickHandler);
    this._cardComponent.setPosterClickHandler(this._setPosterClickHandler);
    this._cardComponent.setCommentsCardClickHandler(this._setCommentsCardClickHandler);
    this._filmPopupDetailsComponent.setEmojiClickHandler();

    if (prevCardComponent === null && prevFilmPopupDetailsComponent === null) {
      render(this._cardListContainer, this._cardComponent, RenderPosition.BEFORE_END);
      return;
    }

    if (this._cardListContainer.contains(prevCardComponent.getElement())) {
      replace(this._cardComponent, prevCardComponent);
    }

    if (siteBodyElement.contains(prevFilmPopupDetailsComponent.getElement())) {
      this._showPopup();
    }

    remove(prevCardComponent);
    remove(prevFilmPopupDetailsComponent);
  }

  destroy() {
    remove(this._cardComponent);
    remove(this._filmPopupDetailsComponent);
  }

  _showPopup() {
    render(siteBodyElement, this._filmPopupDetailsComponent, RenderPosition.BEFORE_END);
    this._filmPopupDetailsComponent.setCloseClickHandler(() => {
      this._closePopup();
    });
    document.addEventListener(`keydown`, this._escKeyDownHandler);
    document.addEventListener(`keydown`, this._filmPopupDetailsComponent._enterKeyDownHandler);
  }

  _closePopup() {
    this._siteBodyElement.removeChild(this._siteBodyElement.lastChild);
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._closePopup();
      document.removeEventListener(`keydown`, this._escKeyDownHandler);
    }
  }

  _setTitleClickHandler() {
    this._showPopup();
  }

  _setPosterClickHandler() {
    this._showPopup();
  }

  _setCommentsCardClickHandler() {
    this._showPopup();
  }
}
