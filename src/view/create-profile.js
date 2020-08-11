import {getRandomInteger} from "../utils.js";

export const createProfileTemplate = () => {
  let render = Boolean(getRandomInteger(0, 1));

  if (render) {
    return (
      `<section class="header__profile profile">
        <p class="profile__rating">Movie Buff</p>
        <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
       </section>`
    );
  } else {
    return ``;
  }
};
