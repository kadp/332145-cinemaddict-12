import {getRandomInteger, generateRandomText} from "../utils.js";
import {EMOJI_URL, DESCRIPTIONS, MIN_COMMENTS, MAX_COMMENTS, AUTHOR_LIST} from "../const.js";

const getEmoji = () => {
  return EMOJI_URL[getRandomInteger(0, EMOJI_URL.length - 1)] + `.png`;
};

const getAuthor = () => {
  return AUTHOR_LIST[getRandomInteger(0, AUTHOR_LIST.length - 1)];
};

const setDate = () => {
  let date = new Date();
  // date.toLocaleDateString() как вариант.
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let time = date.toLocaleTimeString();
  return year + `/` + month + `/` + day + ` ` + time;
};
export const getComments = () => {
  return {
    emoji: getEmoji(),
    text: generateRandomText(MIN_COMMENTS, MAX_COMMENTS, DESCRIPTIONS),
    author: getAuthor(),
    date: setDate(),
  };
};
