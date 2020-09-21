import FilmListView from "../view/film-list.js";
import FilmPopupDetailsView from "../view/film-popup-details.js";
import ButtonShowMoreView from "../view/button-show-more.js";
import FilmCardView from "../view/film-card.js";
import PopupCommentView from "../view/popup-comment.js";
import NoDataView from "../view/no-data.js";
import {render, RenderPosition, remove} from "../utils/render.js";

const CARD_RENDER_STEP = 5;

const siteBodyElement = document.querySelector(`body`);
const siteMainElement = document.querySelector(`.main`);

export default class MovieList {
  constructor(movieListContainer) {
    this._movieListContainer = movieListContainer;
    this._cardRenderStep = CARD_RENDER_STEP;
    this._filmList = new FilmListView();
    this._filmPopupDetails = new FilmPopupDetailsView();
    this._filmCard = new FilmCardView();
    this._noDataComponent = new NoDataView();
    this._siteBodyElement = siteBodyElement;
  }

  init(filmCards) {
    this._filmCards = filmCards;
    render(siteMainElement, this._filmList, RenderPosition.BEFORE_END);
    this._renderFilmList(this._filmCards);
  }

  _renderSort() {

  }

  _renderCardFilm(cardListElement, filmCard) {
    const cardComponent = new FilmCardView(filmCard);
    const FilmPopupDetailsComponent = new FilmPopupDetailsView(filmCard);

    render(cardListElement, cardComponent, RenderPosition.BEFORE_END);

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        evt.preventDefault();
        closePopup();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    const showPopup = () => {
      render(siteBodyElement, FilmPopupDetailsComponent, RenderPosition.BEFORE_END);
      const PlaceComments = document.querySelector(`.film-details__comments-list`);
      filmCard.comments.forEach((comment) => render(PlaceComments, new PopupCommentView(comment), RenderPosition.BEFORE_END));
      FilmPopupDetailsComponent.setCloseClickHandler(() => {
        closePopup();
      });
      document.addEventListener(`keydown`, onEscKeyDown);
    };

    const closePopup = () => {
      this._siteBodyElement.removeChild(this._siteBodyElement.lastChild);
      remove(FilmPopupDetailsComponent);
      document.removeEventListener(`keydown`, onEscKeyDown);
    };

    cardComponent.setTitleClickHandler(() => {
      showPopup();
    });

    cardComponent.setPosterClickHandler(() => {
      showPopup();
    });

    cardComponent.setCommentsCardClickHandler(() => {
      showPopup();
    });
  }

  _handleSortTypeChange() {

  }

  _renderCardsFilm(from, to) {
    this._filmCards
      .slice(from, to)
      .forEach((filmCard) => this._renderCardFilm(this._siteFilmsListContainerTemplate, filmCard));
  }

  _renderNoData() {
    render(this._filmList, this._noDataComponent, RenderPosition.AFTER_BEGIN);
  }

  _renderLoadMoreButton() {
    let renderedCardCount = this._cardRenderStep;

    const buttonShowMoreComponent = new ButtonShowMoreView();
    this._buttonShowMorePlace = document.querySelector(`.films-list`);
    render(this._buttonShowMorePlace, buttonShowMoreComponent, RenderPosition.BEFORE_END);

    buttonShowMoreComponent.setClickHandler(() => {
      this._renderCardsFilm(renderedCardCount, renderedCardCount + this._cardRenderStep);

      renderedCardCount += this._cardRenderStep;

      if (renderedCardCount >= this._filmCards.length) {
        remove(buttonShowMoreComponent);
      }
    });
  }

  _renderFilmList() {
    this._siteFilmsListContainerTemplate = document.querySelector(`.films-list__container`);

    if (this._filmCards.length === 0) {
      this._renderNoData();
      return;
    }

    this._renderSort();

    this._renderCardsFilm(0, Math.min(this._filmCards.length, this._cardRenderStep));

    if (this._filmCards.length > this._cardRenderStep) {
      this._renderLoadMoreButton();
    }
  }
}
