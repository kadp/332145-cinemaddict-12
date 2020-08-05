import {createFilmCardTemplate} from "./view/createfilmcardtemplate.js";

export const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

export const renderFilmCard = (cardCount, filmList) => {
  for (let i = 0; i < cardCount; i++) {
    render(filmList, createFilmCardTemplate(), `beforeend`);
  }
};
