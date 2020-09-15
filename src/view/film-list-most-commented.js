import AbstractView from "./abstract.js";

const createFilmsMostCommentedTemplate = () => {
  return (
    `<section class="films-list--extra">
      <h2 class="films-list__title">Most commented</h2>
      <div class="films-list__container">
      </div>
     </section>`
  );
};

export default class FilmListMostCommented extends AbstractView {
  getTemplate() {
    return createFilmsMostCommentedTemplate();
  }
}
