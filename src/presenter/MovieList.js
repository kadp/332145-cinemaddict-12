import FilmListView from "../view/film-list.js";
import FilmPopupDetailsView from "../view/film-popup-details.js";
import SortView from "./view/sort.js";
import ButtonShowMoreView from "../view/button-show-more.js";
import FilmCardView from "../view/film-card.js";
import PopupCommentView from "../view/popup-comment.js";
import PopupCommentTitleView from "../view/popup-comment-title.js";
import FilmPopupDetailsGenresView from '../view/film-popup-details-genres.js';
import NoDataView from "../view/no-data.js";
import {render, RenderPosition, remove} from "../utils/render.js";

const CARD_RENDER_STEP = 5;

export default class MovieList {
  constructor(movieListContainer) {
    this._movieListContainer = movieListContainer;

    this._filmList = new FilmListView();
    this._filmPopupDetails = new FilmPopupDetailsView();
    this._filmCard = new FilmCardView();
    this._popupComment = new PopupCommentView();
    this._popupCommentTitle = new PopupCommentTitleView();
    this._filmPopupDetailsGenres = new FilmPopupDetailsGenresView();
    this._noDataComponent = new NoDataView();
    this._sortComponent = new SortView();

    this._handleLoadMoreButtonClick = this._handleLoadMoreButtonClick.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(filmCards) {
    this._filmCards = filmCards.slice();

    render(this._filmList, this._filmList, RenderPosition.BEFORE_END);
    render(this._filmCard, this._filmCard, RenderPosition.BEFORE_END);

    this._renderFilmList();
  }

  _renderSort() {
    render(this._filmList, this._sortComponent, RenderPosition.AFTER_BEGIN);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderCardFilm(cardFilm) {

    const cardComponent = new FilmCardView(filmCard);
    const FilmPopupDetailsComponent = new FilmPopupDetailsView(filmDetail[0], filmCards[0]);

    render(cardListElement, cardComponent, RenderPosition.BEFORE_END);

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        evt.preventDefault();
        closePopup();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    const showPopup = () => {
      siteBodyElement.appendChild(FilmPopupDetailsComponent);
      const createPopupFilmDetailsGenre = document.querySelector(`.film-details__row:last-of-type .film-details__cell`);
      render(createPopupFilmDetailsGenre, new FilmPopupDetailsGenresView(getGenre()), RenderPosition.BEFORE_END);
      const commentsCountTemplate = document.querySelector(`.film-details__comments-title`);
      render(commentsCountTemplate, new PopupCommentTitleView(comments.length), RenderPosition.BEFORE_END);
      const PlaceComments = document.querySelector(`.film-details__comments-list`);
      comments.forEach((comment) => render(PlaceComments, new PopupCommentView(comment), RenderPosition.BEFORE_END));
      FilmPopupDetailsComponent.setCloseClickHandler(() => {
        closePopup();
      });
      document.addEventListener(`keydown`, onEscKeyDown);
    };

    const closePopup = () => {
      siteBodyElement.removeChild(siteBodyElement.lastChild);
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

  _handleSortTypeChange(sortType) {

  }

  _renderCardsFilm(from, to) {
    // Метод для рендеринга N-задач за раз
  }

  _renderNoData() {
    render(this._filmList, this._noDataComponent, RenderPosition.AFTER_BEGIN);
  }

  _renderLoadMoreButton() {
    let renderedCardCount = CARD_RENDER_STEP;

    const buttonShowMoreComponent = new ButtonShowMoreView();
    render(this._filmList, buttonShowMoreComponent, RenderPosition.BEFORE_END);

    buttonShowMoreComponent.setClickHandler(() => {
      this._filmCards
        .slice(renderedCardCount, renderedCardCount + CARD_RENDER_STEP)
        .forEach((filmCard) => this._renderCardFilm(siteFilmsListContainerTemplate, filmCard));

      renderedCardCount += CARD_RENDER_STEP;

      if (renderedCardCount >= this._filmCards.length) {
        remove(buttonShowMoreComponent);
      }
    });
  }

  _renderFilmList() {
    if (this._filmCards.length === 0) {
      this._renderNoData();
      return;
    }

    this._renderSort();

    this._renderCardsFilm(0, Math.min(this._filmCards.length, CARD_RENDER_STEP));

    if (this._filmCards.length > CARD_RENDER_STEP) {
      this._renderLoadMoreButton();
    }
  }
}
