import {getRandomInteger} from "../utils.js";
import {LEVEL_VALUE} from "../const.js";

export const generateLevelProfile = () => {
  let level = LEVEL_VALUE[getRandomInteger(0, LEVEL_VALUE.length - 1)];
  if (level === 0) {
    return false;
  }
  if (level >= 1 && level <= 10) {
    return `novice`;
  }
  if (level >= 11 && level <= 20) {
    return `fan`;
  }
  if (level >= 21) {
    return `movie buff`;
  } else {
    return ``;
  }
};

