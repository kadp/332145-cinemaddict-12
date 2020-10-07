import FilmListView from "../view/film-list.js";
import ButtonShowMoreView from "../view/button-show-more.js";
import NoDataView from "../view/no-data.js";
import SortView from "../view/sort.js";
import CardPresenter from "../presenter/card.js";
import {render, RenderPosition, remove} from "../utils/render.js";
import {sortDate, sortRating} from "../utils/sort.js";
import FavoriteView from "../view/favorite.js";
import HistoryView from "../view/history.js";
import WatchListView from "../view/watchlist.js";
import {SortType, MenuItem} from "../constants.js";
import {updateItem} from "../utils/common.js";

const CARD_RENDER_STEP = 5;

const siteBodyElement = document.querySelector(`body`);
const siteMainElement = document.querySelector(`.main`);

export default class MovieList {
  constructor(movieListContainer, cardsModel) {
    this._cardsModel = cardsModel;
    this._movieListContainer = movieListContainer;
    this._cardRenderStep = CARD_RENDER_STEP;
    this._filmList = new FilmListView();
    this._noDataComponent = new NoDataView();
    this._siteBodyElement = siteBodyElement;
    this._sortComponent = new SortView();
    this._buttonShowMoreComponent = new ButtonShowMoreView();
    this._currentSortType = SortType.DEFAULT;
    this._cardPresenter = {};
    this._handleModeChange = this._handleModeChange.bind(this);


    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleCardDataChange = this._handleCardDataChange.bind(this);
  }

  init(menuItem) {
    this._menuItem = menuItem;
    this._clearFilmList();
    this._renderSort();

    render(siteMainElement, this._filmList, RenderPosition.BEFORE_END);

    const favoriteArray = [];
    const historyArray = [];
    const watchListArray = [];

    const favoriteCount = (filmCard) => {
      if (filmCard.isFavorite) {
        favoriteArray.push(filmCard);
      }
    };

    this._cardsModel.getCards().slice().forEach((filmCard) => favoriteCount(filmCard));


    const historyCount = (filmCard) => {
      if (filmCard.isArchive) {
        historyArray.push(filmCard);
      }
    };

    this._cardsModel.getCards().slice().forEach((filmCard) => historyCount(filmCard));


    const watchlistCount = (filmCard) => {
      if (filmCard.isWatch) {
        watchListArray.push(filmCard);
      }
    };

    this._cardsModel.getCards().slice().forEach((filmCard) => watchlistCount(filmCard));


    switch (this._menuItem) {
      case MenuItem.ALL_MOVIES:
        this._filmCards = this._sourcedFilmCards;
        this._clearFilmList();
        this._renderFilmList(this._filmCards);
        break;
      case MenuItem.WATCHLIST:
        this._filmCards = watchListArray;
        this._clearFilmList();
        this._renderFilmList();
        break;
      case MenuItem.HISTORY:
        this._filmCards = historyArray;
        this._clearFilmList();
        this._renderFilmList();
        break;
      case MenuItem.FAVORITES:
        this._filmCards = favoriteArray;
        this._clearFilmList();
        this._renderFilmList();
        break;
      default:
        this._filmCards = this._sourcedFilmCards;
        this._clearFilmList();
        this._renderFilmList();
    }

    if (this._favorite) {
      remove(this._favorite);
    }

    if (this._history) {
      remove(this._history);
    }

    if (this._watchList) {
      remove(this._watchList);
    }

    this._favorite = new FavoriteView(favoriteArray.length);
    this._history = new HistoryView(historyArray.length);
    this._watchList = new WatchListView(watchListArray.length);

    const favoriteCountItem = document.querySelector(`[href='#favorites']`);

    render(favoriteCountItem, this._favorite, RenderPosition.BEFORE_END);

    const historyCountItem = document.querySelector(`[href='#history']`);
    render(historyCountItem, this._history, RenderPosition.BEFORE_END);

    const watchListCountItem = document.querySelector(`[href='#watchlist']`);
    render(watchListCountItem, this._watchList, RenderPosition.BEFORE_END);
  }

  _getCards() {
    switch (this._currentSortType) {
      case SortType.DATE:
        return this._cardsModel.getCards().slice().sort(sortDate);
      case SortType.RATING:
        return this._cardsModel.getCards().slice().sort(sortRating);
    }
    return this._cardsModel.getCards();

    /*
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
    */
  }

  _handleModeChange() {
    Object
      .values(this._cardPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _handleCardDataChange(updatedCard) {
    this._filmCards = updateItem(this._filmCards, updatedCard);
    this._sourcedFilmCards = updateItem(this._sourcedFilmCards, updatedCard);
  }

  _handleSortTypeChange(sortType) {
    this._currentSortType = sortType;
    this._clearFilmList();
    this._renderFilmList();
  }


  _renderSort() {
    if (this._sortComponent !== null) {
      remove(this._sortComponent);
    }
    render(siteMainElement, this._sortComponent, RenderPosition.BEFORE_END);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);

  }

  _renderCardFilm(filmCard) {
    const cardPresenter = new CardPresenter(this._siteFilmsListContainerTemplate, this._handleCardDataChange, this._handleModeChange);
    cardPresenter.init(filmCard);
    this._cardPresenter[filmCard.id] = cardPresenter;
  }

  _renderCardsFilm(cards) {
    cards.forEach((card) => this._renderCardFilm(card));
  }

  _renderNoData() {
    render(this._filmList, this._noDataComponent, RenderPosition.AFTER_BEGIN);
  }

  _renderLoadMoreButton(cards) {
    const cardCount = this._getCards().length;
    this._buttonShowMorePlace = document.querySelector(`.films-list`);
    render(this._buttonShowMorePlace, this._buttonShowMoreComponent, RenderPosition.BEFORE_END);

    this._buttonShowMoreComponent.setClickHandler(() => {
      this._renderCardsFilm(cards, this._cardRenderStep, this._cardRenderStep + CARD_RENDER_STEP);

      this._cardRenderStep += CARD_RENDER_STEP;

      if (this._cardRenderStep >= cardCount) {
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
    const cardCount = this._getCards().length;

    if (cardCount.length === 0) {
      this._renderNoData();
      return;
    }

    this._siteFilmsListContainerTemplate = document.querySelector(`.films-list__container`);
    const cards = this._getCards().slice(0, Math.min(cardCount, this._cardRenderStep));

    this._renderCardsFilm(cards);

    if (cardCount > this._cardRenderStep) {
      this._renderLoadMoreButton(cards);
    }
  }
}
