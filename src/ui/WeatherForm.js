import {
  getISODateStr,
  getEndDate,
  daysBetween,
} from "../util/date-functions.js";
import { range } from "../util/number-functions.js";

// Constants
const CITY_ID = "city-id";
const CITIES_DROPDOWN_ID = "cities-dropdown-id";
const DATE_ID = "date-id";
const DAYS_ID = "days-id";
const HOUR_FROM_ID = "hour-from-id";
const HOUR_TO_ID = "hour-to-id";
const FORM_ID = "form-id";

const CITIES_INPUT_PLACEHOLDER = "Enter city";
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
  #citiesDropdownElement;
  #citiesDropdownOutsideElement;
  #formData;
  #maxDays;
  #parentId;
  #geoCodingService;
  #currentCitiesPool;

  constructor(parentId, maxDays, geoCodingService) {
    this.#parentId = parentId;
    this.#maxDays = maxDays;
    this.#formData = {};
    this.#geoCodingService = geoCodingService;
    this.#buildForm();
    this.#setElements();
    this.#setSelectOptions();
    this.#setHandlers();
  }

  #buildForm() {
    const parentElement = document.getElementById(this.#parentId);
    parentElement.innerHTML = `
      <form id="${this.#parentId}-${FORM_ID}">
        <div class="row-input">
          <input id="${
            this.#parentId
          }-${CITY_ID}" placeholder="${CITIES_INPUT_PLACEHOLDER}" required></input>
          <div id="${this.#parentId}-${CITIES_DROPDOWN_ID}-outside"></div>
          <div id="${this.#parentId}-${CITIES_DROPDOWN_ID}">
          </div>
          <select id="${this.#parentId}-${DAYS_ID}" required></select>
        </div>
        <div class="row-input">
          <select id="${this.#parentId}-${HOUR_FROM_ID}" required></select>
          <select id="${this.#parentId}-${HOUR_TO_ID}" required></select>
        </div>
        <div class="date-group">
          <label for="${
            this.#parentId
          }-${DATE_ID}" class="date-group_label">Enter start date</label>
          <input type="date" id="${
            this.#parentId
          }-${DATE_ID}" class="date-group_input" required />
        </div>
        <div class="buttons-group">
          <button type="reset">Reset</button>
          <button type="submit" class="buttons-submit">Submit</button>
        </div>
      </form>
    `;
  }

  async getFormData() {
    return new Promise((resolve) => {this.#formElement.onsubmit = (event) => {
      event.preventDefault();
      resolve(this.#formData);
    }});
  }

  async #cityHandler() {
    const inputedCity = this.#cityElement.value;
    this.#geoCodingService
      .getCities(inputedCity)
      .then((cities) => {
        this.#displayCitiesDropDown();
        this.#currentCitiesPool = cities;
        this.#citiesDropdownElement.innerHTML = this.#getCitiesDropdown(cities);
        this.#setDropdownHandlers();
      })
      .catch((err) => {
        this.#displayCitiesDropDown();
        this.#citiesDropdownElement.innerHTML = this.#getErrorDropdown(
          err.message
        );
        this.#currentCitiesPool = null;
      });
  }

  #getErrorDropdown(message) {
    return `
      <span>${message}</span>
    `;
  }

  #getCitiesDropdown(cities) {
    return cities
      .map(
        (city) => `
        <div data-city-id="${city.id}" class="dropdown-point">
          <img crossorigin="Anonymous" src="${this.#geoCodingService.getFlagByCountryCode(
            city["country_code"]
          )}" />
          <span>${city.name}</span>
        </div>`
      )
      .join("");
  }

  #setDropdownHandlers() {
    const dropdownElements = document.querySelectorAll(".dropdown-point");

    dropdownElements.forEach((point) =>
      point.addEventListener("click", this.#setCity.bind(this))
    );
    console.log(dropdownElements);
  }

  #setCity(event) {
    let cityId = event.target.dataset.cityId;
    while (!cityId) {
      cityId = event.target.parentElement.dataset.cityId;
    }
    const selectedCity = this.#currentCitiesPool.find(
      (city) => city.id == cityId
    );
    this.#formData = {
      ...this.#formData,
      city: selectedCity.name,
      lat: selectedCity.latitude,
      long: selectedCity.longitude,
    };
    this.#hideCitiesDropDown();
    this.#cityElement.value = selectedCity.name;
  }

  #hideCitiesDropDown() {
    this.#citiesDropdownElement.style.display = "none";
    this.#citiesDropdownOutsideElement.style.display = "none";
  }

  #displayCitiesDropDown() {
    this.#citiesDropdownElement.style.display = "flex";
    this.#citiesDropdownOutsideElement.style.display = "block";
  }

  #dateHandler() {
    this.#formData.startDate = this.#dateElement.value;

    const skippedDays = daysBetween(
      getISODateStr(new Date()),
      new Date(this.#formData.startDate)
    );
    setOptionItems(
      this.#daysElement,
      range(1, this.#maxDays + 1 - skippedDays),
      DAYS_SELECT_PLACEHOLDER,
      this.#formData.days
    );
  }

  #daysHandler() {
    this.#formData.days = +this.#daysElement.value;
    this.#dateElement.max = getEndDate(
      new Date(),
      this.#maxDays + 1 - this.#formData.days
    );
  }

  #hourFromHandler() {
    const newValue = +this.#hourFromElement.value;
    this.#formData.hourFrom = newValue;
    setOptionItems(
      this.#hourToElement,
      range(newValue, 24),
      HOUR_TO_SELECT_PLACEHOLDER,
      this.#formData.hourTo
    );
  }

  #hourToHandler() {
    const newValue = +this.#hourToElement.value;
    this.#formData.hourTo = newValue;
    setOptionItems(
      this.#hourFromElement,
      range(0, newValue + 1),
      HOUR_FROM_SELECT_PLACEHOLDER,
      this.#formData.hourFrom
    );
  }

  #citiesDropdownOutsideHandler() {
    this.#hideCitiesDropDown();
    this.#cityElement.value = this.#formData.city ? this.#formData.city : "";
  }

  #setHandlers() {
    this.#cityElement.onkeyup = this.#cityHandler.bind(this);
    this.#dateElement.onchange = this.#dateHandler.bind(this);
    this.#daysElement.onchange = this.#daysHandler.bind(this);
    this.#hourFromElement.onchange = this.#hourFromHandler.bind(this);
    this.#hourToElement.onchange = this.#hourToHandler.bind(this);
    this.#citiesDropdownOutsideElement.onclick =
      this.#citiesDropdownOutsideHandler.bind(this);
    this.#formElement.onreset = () => {
      this.#formData = {}
      this.#setSelectOptions()
    }
  }

  #setElements() {
    this.#formElement = document.getElementById(`${this.#parentId}-${FORM_ID}`);
    this.#cityElement = document.getElementById(`${this.#parentId}-${CITY_ID}`);
    this.#citiesDropdownElement = document.getElementById(
      `${this.#parentId}-${CITIES_DROPDOWN_ID}`
    );
    this.#citiesDropdownOutsideElement = document.getElementById(
      `${this.#parentId}-${CITIES_DROPDOWN_ID}-outside`
    );
    this.#dateElement = document.getElementById(`${this.#parentId}-${DATE_ID}`);
    this.#daysElement = document.getElementById(`${this.#parentId}-${DAYS_ID}`);
    this.#hourFromElement = document.getElementById(
      `${this.#parentId}-${HOUR_FROM_ID}`
    );
    this.#hourToElement = document.getElementById(
      `${this.#parentId}-${HOUR_TO_ID}`
    );
  }

  #setSelectOptions() {
    const minDate = getISODateStr(new Date());
    this.#dateElement.min = minDate;
    console.log(minDate, this.#maxDays);
    this.#dateElement.max = getEndDate(minDate, this.#maxDays);

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

function setOptionItems(element, options, placeholder, selectedValue) {
  element.innerHTML = `<option value="" hidden ${
    !selectedValue ? "selected" : ""
  }>--${placeholder}--</option>`;
  element.innerHTML += options
    .map((option) =>
      option == selectedValue
        ? `<option value="${option}" selected>${option}</option>`
        : `<option value="${option}">${option}</option>`
    )
    .join("");
}
