import AbstractView from "./abstract.js";

const createFooterStatistics = (value) => {
  return (`<p> ${value} movies inside</p>`);
};

export default class FooterStatistics extends AbstractView {
  constructor(value) {
    super();
    this._value = value;
  }

  getTemplate() {
    return createFooterStatistics(this._value);
  }
}
