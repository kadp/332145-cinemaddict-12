export const createPopupComment = (comment) => {

  const {emoji, text, author, date} = comment;

  return (
    `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${emoji}.png" width="55" height="55" alt="emoji-smile">
      </span>
      <div>
        <p class="film-details__comment-text">${text}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${author}</span>
          <span class="film-details__comment-day">${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}/ ${date.getHours()}:${date.getMinutes()}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
     </li>
    `);
};
