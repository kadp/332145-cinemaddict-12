import {getRandomInteger, generateRandomText} from "../utils.js";
import {FILM_NAMES, DESCRIPTIONS, POSTERS_URL, MIN_DESCRIPTION, MAX_DESCRIPTION, MAX_RATING, MIN_RATING, FILM_YEAR, FILM_GENRE} from "../const.js";

const getFilmName = (i) => {
  return FILM_NAMES[i];
};

const getPoster = () => {
  return POSTERS_URL[getRandomInteger(0, POSTERS_URL.length - 1)];
};

const getRating = () => {
  return getRandomInteger(MIN_RATING, MAX_RATING);
};

const getYear = () => {
  return FILM_YEAR[getRandomInteger(0, FILM_YEAR.length - 1)];
};

const getDuration = () => {
  let time = getRandomInteger(1, 190);
  let minInHour = 60;
  if (time <= minInHour) {
    return time + ` m`;
  } if (time > minInHour) {
    return Math.floor(time / minInHour) + `h` + ` ` + time % minInHour + `m`;
  } else {
    return ``;
  }
};

const getGenre = () => {
  return FILM_GENRE[getRandomInteger(0, FILM_GENRE.length - 1)];
};

export const generateCardFilm = (film, i) => {
  return {
    filmName: getFilmName(i),
    poster: getPoster(),
    description: generateRandomText(MIN_DESCRIPTION, MAX_DESCRIPTION, DESCRIPTIONS),
    rating: getRating(),
    year: getYear(),
    duration: getDuration(),
    genre: getGenre(),
  };
};
