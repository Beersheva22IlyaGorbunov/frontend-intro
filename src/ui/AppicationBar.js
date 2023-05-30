// Constants
const MENU_BTN_CLASS = "menu-btn";
const ACTIVE_BTN_CLASS = "btn_active";

export default class ApplicationBar {
  #buttons;
  #activeIndex;
  #sectionElements;
  #onChangingCallback;

  constructor(parentId, sections, onChangingCallback) {
    //sections - array of objects
    //each object {title: string, id: string}
    this.#onChangingCallback = onChangingCallback;
    this.#fillButtons(
      parentId,
      sections.map((s) => s.title)
    );
    this.#setSectionElements(sections.map((s) => s.id));
    this.#addListeners();
  }

  #fillButtons(parentId, titles) {
    const parentElement = document.getElementById(parentId);
    parentElement.innerHTML = titles
      .map((t) => `<button class=${MENU_BTN_CLASS}>${t}</button>`)
      .join("");
    this.#buttons = parentElement.children;
  }

  #setSectionElements(sectionIds) {
    this.#sectionElements = sectionIds.map((id) => document.getElementById(id));
  }

  #addListeners() {
    Array.from(this.#buttons).forEach((button, index) => {
      button.addEventListener("click", this.#handler.bind(this, index));
      button.addEventListener("click", this.#onChangingCallback.bind(this, index));
    });
  }

  #handler(index) {
    if (index != this.#activeIndex) {
      if (this.#activeIndex !== undefined) {
        this.#buttons[this.#activeIndex].classList.remove(ACTIVE_BTN_CLASS);
        this.#sectionElements[this.#activeIndex].hidden = true;
      }
      this.#buttons[index].classList.add(ACTIVE_BTN_CLASS);
      this.#sectionElements[index].hidden = false;
      this.#activeIndex = index;
    }
  }
}
