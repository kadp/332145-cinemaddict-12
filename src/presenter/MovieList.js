import FilmListView from "../view/film-list.js";
import FilmPopupDetailsView from "../view/film-popup-details.js";
import ButtonShowMoreView from "../view/button-show-more.js";
import FilmCardView from "../view/film-card.js";
import PopupCommentView from "../view/popup-comment.js";
import NoDataView from "../view/no-data.js";
import SortView from "../view/sort.js";
import {render, RenderPosition, remove} from "../utils/render.js";
import {sortDate, sortRating} from "../utils/sort.js";
import {SortType} from "../constants.js";

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
    this._sortComponent = new SortView();
    this._buttonShowMoreComponent = new ButtonShowMoreView();
    this._currentSortType = SortType.DEFAULT;

    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(filmCards) {
    this._filmCards = filmCards.slice();
    this._sourcedFilmCards = filmCards.slice();
    this._renderSort();

    render(siteMainElement, this._filmList, RenderPosition.BEFORE_END);
    this._renderFilmList(this._filmCards);
  }

  _sortFilmList(sortType) {
    switch (sortType) {
      case SortType.DATE:
        this._filmCards.sort(sortDate);
        break;
      case SortType.RATING:
        this._filmCards.sort(sortRating);
        break;
      default:
        this._filmCards = this._sourcedFilmCards.slice();
    }

    this._currentSortType = sortType;
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortFilmList(sortType);
    this._clearFilmList();
    this._renderFilmList();
  }

  _renderSort() {
    render(siteMainElement, this._sortComponent, RenderPosition.BEFORE_END);

    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
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


    this._buttonShowMorePlace = document.querySelector(`.films-list`);
    render(this._buttonShowMorePlace, this._buttonShowMoreComponent, RenderPosition.BEFORE_END);

    this._buttonShowMoreComponent.setClickHandler(() => {
      this._renderCardsFilm(renderedCardCount, renderedCardCount + this._cardRenderStep);

      renderedCardCount += this._cardRenderStep;

      if (renderedCardCount >= this._filmCards.length) {
        remove(this._buttonShowMoreComponent);
      }
    });
  }

  _clearFilmList() {
    this._siteFilmsListContainerTemplate.innerHTML = ``;
    this._cardRenderStep = CARD_RENDER_STEP;
    remove(this._buttonShowMoreComponent);
  }

  _renderFilmList() {
    this._siteFilmsListContainerTemplate = document.querySelector(`.films-list__container`);

    if (this._filmCards.length === 0) {
      this._renderNoData();
      return;
    }

    this._renderCardsFilm(0, Math.min(this._filmCards.length, this._cardRenderStep));

    if (this._filmCards.length > this._cardRenderStep) {
      this._renderLoadMoreButton();
    }
  }
}
