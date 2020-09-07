export const commentsCount = () => {
  const value = new Array(getRandomInteger(MIN_COMMENTS, MAX_COMMENTS)).fill().map(getComments);
  return value.length;
};

import SiteMenuView from "./view/site-menu.js";
import FilterView from "./view/filter.js";
import ProfileView from "./view/profile.js";
import FilmListView from "./view/film-list.js";
import FooterStatisticsView from "./view/create-footer-statistics.js";
import FilmPopupDetailsView from "./view/film-popup-details.js";
import ButtonShowMoreView from "./view/button-show-more.js";
import FilmListTopRatedView from "./view/film-list-top-rated.js";
import FilmListMostCommentedView from "./view/film-list-most-commented.js";
import FilmCardView from "./view/film-card.js";
import PopupCommentView from "./view/popup-comment.js";
import PopupCommentTitleView from "./view/popup-comment-title.js";
import FilmPopupDetailsGenresView from './view/film-popup-details-genres.js';
import FavoriteView from "./view/favorite.js";
import {getRandomInteger, render, RenderPosition} from "./utils.js";
import {generateCardFilm} from "./mock/card-film.js";
import {getComments} from "./mock/comments.js";
import {generateLevelProfile} from "./mock/profile.js";
import {getFilmDetail, getGenre} from "./mock/popup-film-detail.js";
import {MIN_COMMENTS, MAX_COMMENTS, CARD_COUNT, CARD_RENDER_STEP, EXTRA_CARD_COUNT} from "./constants.js";

const filmCards = new Array(CARD_COUNT).fill().map(generateCardFilm);
const comments = new Array(getRandomInteger(MIN_COMMENTS, MAX_COMMENTS)).fill().map(getComments);
const filmDetail = new Array(1).fill().map(getFilmDetail);

const siteBodyElement = document.querySelector(`body`);
const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const footerStatisticsElement = document.querySelector(`.footer__statistics`);

const favoriteArray = [];

const renderCardFilm = (cardListElement, filmCard) => {
  const cardComponent = new FilmCardView(filmCard);
  const FilmPopupDetailsComponent = new FilmPopupDetailsView(filmDetail[0], filmCards[0]);

  render(cardListElement, cardComponent.getElement(), RenderPosition.BEFOREEND);

  const showPopup = () => {
    siteBodyElement.appendChild(FilmPopupDetailsComponent.getElement());
    const createPopupFilmDetailsGenre = document.querySelector(`.film-details__row:last-of-type .film-details__cell`);
    render(createPopupFilmDetailsGenre, new FilmPopupDetailsGenresView(getGenre()).getElement(), RenderPosition.BEFOREEND);
    const commentsCountTemplate = document.querySelector(`.film-details__comments-title`);
    render(commentsCountTemplate, new PopupCommentTitleView(comments.length).getElement(), RenderPosition.BEFOREEND);
    const PlaceComments = document.querySelector(`.film-details__comments-list`);
    comments.forEach((comment) => render(PlaceComments, new PopupCommentView(comment).getElement(), RenderPosition.BEFOREEND));
  };

  const closePopup = () => {
    siteBodyElement.removeChild(siteBodyElement.lastChild);
  };

  cardComponent.getElement().querySelector(`.film-card__title`).addEventListener(`click`, () => {
    showPopup();
  });

  cardComponent.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, () => {
    showPopup();
  });

  cardComponent.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, () => {
    showPopup();
  });

  FilmPopupDetailsComponent.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, () => {
    closePopup();
  });
};

render(siteHeaderElement, new ProfileView(generateLevelProfile()).getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new SiteMenuView().getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new FilterView().getElement(), RenderPosition.BEFOREEND);

const filmListComponent = new FilmListView();
render(siteMainElement, filmListComponent.getElement(), RenderPosition.BEFOREEND);

render(footerStatisticsElement, new FooterStatisticsView().getElement(), RenderPosition.BEFOREEND);

const siteFilmsElement = document.querySelector(`.films`);
const siteFilmsListContainerTemplate = document.querySelector(`.films-list__container`);

filmCards
.slice(0, CARD_RENDER_STEP)
.forEach((filmCard) => renderCardFilm(siteFilmsListContainerTemplate, filmCard));

if (filmCards.length > CARD_RENDER_STEP) {
  let renderedCardCount = CARD_RENDER_STEP;

  const buttonShowMoreComponent = new ButtonShowMoreView();
  render(filmListComponent.getElement(), buttonShowMoreComponent.getElement(), RenderPosition.BEFOREEND);

  buttonShowMoreComponent.getElement().addEventListener(`click`, (evt) => {
    evt.preventDefault();
    filmCards
      .slice(renderedCardCount, renderedCardCount + CARD_RENDER_STEP)
      .forEach((filmCard) => renderCardFilm(siteFilmsListContainerTemplate, filmCard));

    renderedCardCount += CARD_RENDER_STEP;

    if (renderedCardCount >= filmCards.length) {
      buttonShowMoreComponent.getElement().remove();
      buttonShowMoreComponent.removeElement();
    }
  });

  render(siteFilmsElement, new FilmListTopRatedView().getElement(), RenderPosition.BEFOREEND);
  render(siteFilmsElement, new FilmListMostCommentedView().getElement(), RenderPosition.BEFOREEND);

  const filmsTopRated = document.querySelector(`.films-list--extra`);
  const topRatedList = filmsTopRated.querySelector(`.films-list__container`);
  const filmsMostCommented = document.querySelector(`.films-list--extra:nth-child(4)`);
  const mostCommentedList = filmsMostCommented.querySelector(`.films-list__container`);

  const renderFilmCard = (cardCount, filmList) => {
    for (let i = 0; i < cardCount; i++) {
      render(filmList, new FilmCardView(filmCards[i]).getElement(), RenderPosition.BEFOREEND);
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

const favoriteCountItem = document.querySelector(`[href='#favorites']`);
render(favoriteCountItem, new FavoriteView(favoriteArray.length).getElement(), RenderPosition.BEFOREEND);
