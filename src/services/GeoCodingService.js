export default class GeoCodingService {
  #baseUrl;

  constructor(baseUrl) {
    this.#baseUrl = baseUrl;
  }

  async #fetchCities(name) {
    const response = await fetch(this.#getUrl(name));

    if (response.ok === true) {
      return response.json();
    } else {
      throw new Error("Can't fetch data from server");
    }
  }

  #getUrl(name) {
    return `${this.#baseUrl}name=${name}`;
  }

  async getCities(name) {
    const cities = await this.#fetchCities(name);
    if (cities.results) {
      return cities.results;
    } else {
      throw new Error(`Can't find such a city: ${name}`);
    }
  }

  getFlagByCountryCode(countryCode) {
    return `https://flagcdn.com/48x36/${countryCode.toLowerCase()}.png`;
  }
}
