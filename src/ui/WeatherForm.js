import { getIsoDateStr, getEndDate } from "../util/date-functions.js";
import { range } from "../util/number-functions.js";

// Constants
const CITY_ID = "city-id";
const DATE_ID = "date-id";
const DAYS_ID = "days-id";
const HOUR_FROM_ID = "hour-from-id";
const HOUR_TO_ID = "hour-to-id";
const FORM_ID = "form-id";

const CITIES_SELECT_PLACEHOLDER = "Select city";
const DAYS_SELECT_PLACEHOLDER = "Forecast days";
const HOUR_FROM_SELECT_PLACEHOLDER = "Hour from";
const HOUR_TO_SELECT_PLACEHOLDER = "Hour to";

export default class WeatherForm {
  #formElement;
  #cityElement;
  #dateElement;
  #daysElement;
  #hourFromElement;
  #hourToElement;
  #formData;
  #maxDays;
  #cities;
  #parentId;

  constructor(parentId, cities, maxDays) {
    this.#parentId = parentId; 
    this.#cities = cities;
    this.#maxDays = maxDays;
    this.#formData = {};
    this.#buildForm();
    this.#setElements();
    this.#setSelectOptions();
    this.#setHandlers();
  }

  async submitForm() {
    return new Promise(this.#submitPromiseResolve);
  }

  #buildForm() {
    const parentElement = document.getElementById(this.#parentId);
    parentElement.innerHTML = `
      <form id="${this.#parentId}-${FORM_ID}">
        <div class="row-input">
          <select id="${this.#parentId}-${CITY_ID}" required></select>
          <select id="${this.#parentId}-${DAYS_ID}" required></select>
        </div>
        <div class="row-input">
          <select id="${this.#parentId}-${HOUR_FROM_ID}" required></select>
          <select id="${this.#parentId}-${HOUR_TO_ID}" required></select>
        </div>
        <div class="date-group">
          <label for="${this.#parentId}-${DATE_ID}" class="date-group_label">Enter start date</label>
          <input type="date" id="${this.#parentId}-${DATE_ID}" class="date-group_input" required />
        </div>
        <div class="buttons-group">
          <button type="submit" class="buttons-submit">Submit</button>
        </div>
      </form>
    `;
  }

  #cityHandler() {
    this.#formData.city = this.#cityElement.value;
  }

  #dateHandler() {
    this.#formData.startDate = this.#dateElement.value;
  }

  #daysHandler() {
    this.#formData.days = this.#daysElement.value;
  }

  #hourFromHandler() {
    this.#formData.hourFrom = this.#hourFromElement.value;
  }

  #hourToHandler() {
    this.#formData.hourTo = this.#hourToElement.value;
  }

  #setHandlers() {
    this.#cityElement.onchange = this.#cityHandler.bind(this);
    this.#dateElement.onchange = this.#dateHandler.bind(this);
    this.#daysElement.onchange = this.#daysHandler.bind(this);
    this.#hourFromElement.onchange = this.#hourFromHandler.bind(this);
    this.#hourToElement.onchange = this.#hourToHandler.bind(this);
    this.#formElement.onsubmit = (event) => {
      event.preventDefault();
      console.log(this.#formData);
      this.#submitPromiseResolve()
    };
  }

  #submitPromiseResolve() {
    return this.#formData;
  }

  #setElements() {
    this.#formElement = document.getElementById(`${this.#parentId}-${FORM_ID}`);
    this.#cityElement = document.getElementById(`${this.#parentId}-${CITY_ID}`);
    this.#dateElement = document.getElementById(`${this.#parentId}-${DATE_ID}`);
    this.#daysElement = document.getElementById(`${this.#parentId}-${DAYS_ID}`);
    this.#hourFromElement = document.getElementById(`${this.#parentId}-${HOUR_FROM_ID}`);
    this.#hourToElement = document.getElementById(`${this.#parentId}-${HOUR_TO_ID}`);
  }

  #setSelectOptions() {
    const minDate = getIsoDateStr(new Date);
    this.#dateElement.min = minDate;
    this.#dateElement.max = getEndDate(minDate, this.#maxDays);

    setOptionItems(this.#cityElement, this.#cities, CITIES_SELECT_PLACEHOLDER);
    setOptionItems(
      this.#daysElement,
      range(1, this.#maxDays + 1),
      DAYS_SELECT_PLACEHOLDER
    );
    setOptionItems(
      this.#hourFromElement,
      range(0, 24),
      HOUR_FROM_SELECT_PLACEHOLDER
    );
    setOptionItems(
      this.#hourToElement,
      range(0, 24),
      HOUR_TO_SELECT_PLACEHOLDER
    );
  }
}

function setOptionItems(element, options, placeholder) {
  element.innerHTML = `<option value="" hidden selected>--${placeholder}--</option>`;
  element.innerHTML += options
    .map((option) => `<option value="${option}">${option}</option>`)
    .join("");
}