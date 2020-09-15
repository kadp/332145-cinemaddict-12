import SiteMenuView from "./view/site-menu.js";
import FilterView from "./view/filter.js";
import ProfileView from "./view/profile.js";
import FilmListView from "./view/film-list.js";
import FooterStatisticsView from "./view/footer-statistics.js";
import FilmPopupDetailsView from "./view/film-popup-details.js";
import ButtonShowMoreView from "./view/button-show-more.js";
import FilmListTopRatedView from "./view/film-list-top-rated.js";
import FilmListMostCommentedView from "./view/film-list-most-commented.js";
import FilmCardView from "./view/film-card.js";
import PopupCommentView from "./view/popup-comment.js";
import PopupCommentTitleView from "./view/popup-comment-title.js";
import FilmPopupDetailsGenresView from './view/film-popup-details-genres.js';
import FavoriteView from "./view/favorite.js";
import HistoryView from "./view/history.js";
import WatchListView from "./view/watchlist.js";
import NoDataView from "./view/no-data.js";
import {getRandomInteger} from "./utils/common.js";
import {render, RenderPosition, remove} from "./utils/render.js";
import {generateCardFilm} from "./mock/card-film.js";
import {getComments} from "./mock/comments.js";
import {generateLevelProfile} from "./mock/profile.js";
import {getFilmDetail, getGenre} from "./mock/popup-film-detail.js";
import {MIN_COMMENTS, MAX_COMMENTS, CARD_COUNT, CARD_RENDER_STEP, EXTRA_CARD_COUNT, FILM_IN_BASE} from "./constants.js";

const filmCards = new Array(CARD_COUNT).fill().map(generateCardFilm);

const comments = new Array(getRandomInteger(MIN_COMMENTS, MAX_COMMENTS)).fill().map(getComments);
const filmDetail = new Array(1).fill().map(getFilmDetail);

const siteBodyElement = document.querySelector(`body`);
const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const footerStatisticsElement = document.querySelector(`.footer__statistics`);

const favoriteArray = [];
const historyArray = [];
const watchListArray = [];

const renderCardFilm = (cardListElement, filmCard) => {
  const cardComponent = new FilmCardView(filmCard);
  const FilmPopupDetailsComponent = new FilmPopupDetailsView(filmDetail[0], filmCards[0]);

  render(cardListElement, cardComponent.getElement(), RenderPosition.BEFORE_END);

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      closePopup();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const showPopup = () => {
    siteBodyElement.appendChild(FilmPopupDetailsComponent.getElement());
    const createPopupFilmDetailsGenre = document.querySelector(`.film-details__row:last-of-type .film-details__cell`);
    render(createPopupFilmDetailsGenre, new FilmPopupDetailsGenresView(getGenre()).getElement(), RenderPosition.BEFORE_END);
    const commentsCountTemplate = document.querySelector(`.film-details__comments-title`);
    render(commentsCountTemplate, new PopupCommentTitleView(comments.length).getElement(), RenderPosition.BEFORE_END);
    const PlaceComments = document.querySelector(`.film-details__comments-list`);
    comments.forEach((comment) => render(PlaceComments, new PopupCommentView(comment).getElement(), RenderPosition.BEFORE_END));
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
};

render(siteHeaderElement, new ProfileView(generateLevelProfile()).getElement(), RenderPosition.BEFORE_END);
render(siteMainElement, new SiteMenuView().getElement(), RenderPosition.BEFORE_END);
render(siteMainElement, new FilterView().getElement(), RenderPosition.BEFORE_END);

const filmListComponent = new FilmListView();
render(siteMainElement, filmListComponent.getElement(), RenderPosition.BEFORE_END);

const FooterStatistics = new FooterStatisticsView(FILM_IN_BASE);
render(footerStatisticsElement, FooterStatistics.getElement(), RenderPosition.BEFORE_END);

const siteFilmsElement = document.querySelector(`.films`);
const siteFilmsListContainerTemplate = document.querySelector(`.films-list__container`);
const buttonShowMorePlace = document.querySelector(`.films-list`);

if (filmCards.length === 0) {
  render(buttonShowMorePlace, new NoDataView().getElement(), RenderPosition.BEFORE_END);
  remove(FooterStatistics);
  render(footerStatisticsElement, new FooterStatisticsView(0).getElement(), RenderPosition.BEFORE_END);
}

filmCards
.slice(0, CARD_RENDER_STEP)
.forEach((filmCard) => renderCardFilm(siteFilmsListContainerTemplate, filmCard));

if (filmCards.length > CARD_RENDER_STEP) {
  let renderedCardCount = CARD_RENDER_STEP;

  const buttonShowMoreComponent = new ButtonShowMoreView();
  render(buttonShowMorePlace, buttonShowMoreComponent.getElement(), RenderPosition.BEFORE_END);

  buttonShowMoreComponent.setClickHandler(() => {
    filmCards
      .slice(renderedCardCount, renderedCardCount + CARD_RENDER_STEP)
      .forEach((filmCard) => renderCardFilm(siteFilmsListContainerTemplate, filmCard));

    renderedCardCount += CARD_RENDER_STEP;

    if (renderedCardCount >= filmCards.length) {
      remove(buttonShowMoreComponent);
    }
  });

  render(siteFilmsElement, new FilmListTopRatedView().getElement(), RenderPosition.BEFORE_END);
  render(siteFilmsElement, new FilmListMostCommentedView().getElement(), RenderPosition.BEFORE_END);

  const filmsTopRated = document.querySelector(`.films-list--extra`);
  const topRatedList = filmsTopRated.querySelector(`.films-list__container`);
  const filmsMostCommented = document.querySelector(`.films-list--extra:nth-child(3)`);
  const mostCommentedList = filmsMostCommented.querySelector(`.films-list__container`);

  const renderFilmCard = (cardCount, filmList) => {
    for (let i = 0; i < cardCount; i++) {
      render(filmList, new FilmCardView(filmCards[i]).getElement(), RenderPosition.BEFORE_END);
    }
  };

  renderFilmCard(EXTRA_CARD_COUNT, topRatedList);
  renderFilmCard(EXTRA_CARD_COUNT, mostCommentedList);
}

const favoriteCount = (filmCard) => {
  if (filmCard.isFavorite) {
    favoriteArray.push(filmCard);
  }
};

filmCards.forEach((filmCard) => favoriteCount(filmCard));


const historyCount = (filmCard) => {
  if (filmCard.isSaw) {
    historyArray.push(filmCard);
  }
};

filmCards.forEach((filmCard) => historyCount(filmCard));


const watchlistCount = (filmCard) => {
  if (filmCard.isWatch) {
    watchListArray.push(filmCard);
  }
};

filmCards.forEach((filmCard) => watchlistCount(filmCard));


const favoriteCountItem = document.querySelector(`[href='#favorites']`);
render(favoriteCountItem, new FavoriteView(favoriteArray.length).getElement(), RenderPosition.BEFORE_END);

const historyCountItem = document.querySelector(`[href='#history']`);
render(historyCountItem, new HistoryView(historyArray.length).getElement(), RenderPosition.BEFORE_END);

const watchListCountItem = document.querySelector(`[href='#watchlist']`);
render(watchListCountItem, new WatchListView(watchListArray.length).getElement(), RenderPosition.BEFORE_END);
