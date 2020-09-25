import FilmListView from "../view/film-list.js";
import ButtonShowMoreView from "../view/button-show-more.js";
import NoDataView from "../view/no-data.js";
import SortView from "../view/sort.js";
import CardPresenter from "../presenter/card.js";
import {render, RenderPosition, remove} from "../utils/render.js";
import {sortDate, sortRating} from "../utils/sort.js";
import {SortType} from "../constants.js";
import {updateItem} from "../utils/common.js";

const CARD_RENDER_STEP = 5;

const siteBodyElement = document.querySelector(`body`);
const siteMainElement = document.querySelector(`.main`);

export default class MovieList {
  constructor(movieListContainer) {
    this._movieListContainer = movieListContainer;
    this._cardRenderStep = CARD_RENDER_STEP;
    this._filmList = new FilmListView();
    this._noDataComponent = new NoDataView();
    this._siteBodyElement = siteBodyElement;
    this._sortComponent = new SortView();
    this._buttonShowMoreComponent = new ButtonShowMoreView();
    this._currentSortType = SortType.DEFAULT;
    this._cardPresenter = {};


    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleCardChange = this._handleCardChange.bind(this);
  }

  init(filmCards) {
    this._filmCards = filmCards.slice();
    this._sourcedFilmCards = filmCards.slice();
    this._renderSort();

    render(siteMainElement, this._filmList, RenderPosition.BEFORE_END);
    this._renderFilmList(this._filmCards);
  }

  _handleCardChange(updatedCard) {
    this._filmCards = updateItem(this._filmCards, updatedCard);
    this._sourcedFilmCards = updateItem(this._sourcedFilmCards, updatedCard);
    this._cardPresenter[updatedCard.id].init(updatedCard);
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
    const cardPresenter = new CardPresenter(this._siteFilmsListContainerTemplate, this._handleCardChange);
    cardPresenter.init(filmCard);
    this._cardPresenter[filmCard.id] = cardPresenter;
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
    Object
      .values(this._cardPresenter)
      .forEach((presenter) => presenter.destroy());
    this._cardPresenter = {};
    this._cardRenderStep = CARD_RENDER_STEP;
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
