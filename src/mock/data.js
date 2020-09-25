import {getRandomInteger, generateRandomText} from "../utils/common.js";
import {FILM_NAMES, DESCRIPTIONS, POSTERS_URL, MIN_DESCRIPTION, MAX_DESCRIPTION, MAX_RATING, MIN_RATING, FILM_YEAR, MIN_COMMENTS, MAX_COMMENTS} from "../constants.js";
import {getComment} from "./comments.js";

const AGE = [`0+`, `16+`, `18+`];
const ORIGINAL_FILM_NAME = [
  `Созданы друг для друга`,
  `Попай встречает Синдбада`,
  `Тропа полыни`,
  `Дед мороз покоряет марсиан`,
  `Танец Иф`,
  `Большой фламарион`,
  `Человек с золотой рукой`,
  `Созданы друг для друга`,
  `Попай встречает Синдбада`,
  `Тропа полыни`,
  `Дед мороз покоряет марсиан`,
  `Танец Иф`,
  `Большой фламарион`,
  `Человек с золотой рукой`,
];
const DIRECTOR = [`ДЖЕЙ ДЖЕЙ АБРАМС`, `ПАТРИК ДЖЕЙ АДАМС`, `ВУДИ АЛЛЕН`, `БЕН АФФЛЕК`, `Квентин Тарантино`, `Хаяо Миядзаки`, `Алехандро Гонсалес Иньярриту`];
const WRITER = [`Итан Коэн`, `Джоэл Коэн`, `Билли Уайлдер`, `Роберт Таун`];
const ACTOR = [`Алан Рикман`, `Бенедикт Камбербэтч`, `Бенисио Дель Торо`, `Венсан Кассель`, `Вигго Мортенсен`, `Джеймс МакЭвой`, `Джейк Джилленхол`, `Дэниэл Дэй-Льюис`];
const COUNTRY = [`USA`, `USSR`, `Japan`, `Belarus`];
const GENRE = [`Ужасы`, `Комедия`, `Триллер`, `Фантастика`, `Боевик`];

const getComments = () => {
  const comments = new Array(getRandomInteger(MIN_COMMENTS, MAX_COMMENTS)).fill().map(getComment);
  return comments;
};

const getFilmName = (i) => FILM_NAMES[i];
const getPoster = (i) => POSTERS_URL[i];
const getRating = () => getRandomInteger(MIN_RATING, MAX_RATING);
const getYear = () => FILM_YEAR[getRandomInteger(0, FILM_YEAR.length - 1)];

const getDuration = () => {
  const time = getRandomInteger(1, 190);
  const minInHour = 60;
  if (time <= minInHour) {
    return time + ` m`;
  } else if (time > minInHour) {
    return Math.floor(time / minInHour) + `h` + ` ` + time % minInHour + `m`;
  } else {
    return ``;
  }
};

export const isFilmFavorite = () => Boolean(getRandomInteger(0, 1));
export const isWatchList = () => Boolean(getRandomInteger(0, 1));
export const isWatched = () => Boolean(getRandomInteger(0, 1));
const getAge = () => AGE[getRandomInteger(0, AGE.length - 1)];
const getOriginalFilmName = (i) => ORIGINAL_FILM_NAME[i];
const getDirector = () => DIRECTOR[getRandomInteger(0, DIRECTOR.length - 1)];
const getWriter = () => WRITER[getRandomInteger(0, WRITER.length - 1)];
const getActor = () => ACTOR[getRandomInteger(0, ACTOR.length - 1)];
const getCountry = () => COUNTRY[getRandomInteger(0, COUNTRY.length - 1)];
const getGenre = () => {
  const arr = [];
  for (let i = 0; i < getRandomInteger(1, 3); i++) {
    arr.push(GENRE[getRandomInteger(0, GENRE.length - 1)]);
  }

  return arr;
};

export const generateCardFilm = (film, i) => {
  const isFavorite = isFilmFavorite();
  const isWatch = isWatchList();
  const isArchive = isWatched();
  const comments = getComments();
  return {
    id: i,
    filmName: getFilmName(i),
    poster: getPoster(i),
    description: generateRandomText(MIN_DESCRIPTION, MAX_DESCRIPTION, DESCRIPTIONS),
    rating: getRating(),
    year: getYear(),
    duration: getDuration(),
    genre: getGenre(),
    comments,
    commentsCount: comments.length,
    isFavorite,
    isWatch,
    isArchive,
    age: getAge(),
    originalName: getOriginalFilmName(0),
    director: getDirector(),
    writers: getWriter(),
    actors: getActor(),
    country: getCountry(),
  };
};

