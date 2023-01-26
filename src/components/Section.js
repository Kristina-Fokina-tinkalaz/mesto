export { Section };
class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = containerSelector;
  }

  addItems(element) {
    this._container.append(element);
    // const trash = element.querySelector(".card__trash");
    // trash.remove();
  }
  addItem(element) {
    this._container.prepend(element);
  }
  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }
}
